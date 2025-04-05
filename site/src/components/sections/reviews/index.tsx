'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'
import Rating from '@/components/ui/rating'
import Gemini from '@/components/icons/gemini'
import Carousel from '@/components/ui/carousel'
import ReviewCard from './review-card'
import ReviewModal from './review-modal'
import { Markdown } from '@/components/ui/markdown'
import { streamFlow } from "@genkit-ai/next/client"
import { summarizeReviews } from '@/lib/genkit/summarizeReviews'

type Props = {
  reviews: {
    id: string
    rating: number
    content: string
    date: string
    customer: {
      id: string
      firstName: string
      lastName: string
    }
  }[]
  avgRating: number
  product: {
    id: string
    title: string
    featuredImage: {
      url: string
      altText: string
    }
    variants: { price: number }[]
  }
}

export default function Reviews({ reviews, avgRating, product }: Props) {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const summaryRef = useRef<HTMLParagraphElement | null>(null)
  const [summary, setSummary] = useState('')

  useEffect(() => {
    async function fetchSummary() {
      const { stream, output } = streamFlow<typeof summarizeReviews>({
          url:"/api/reviews/summary",
          input: { productId: product.id },
      });
      let accum = "";
      for await (const chunk of stream) {
        accum += chunk;
        setSummary(accum);
      }
      setSummary(await output);
    }
    fetchSummary();
  }, [reviews, product])

  return (
    <>
      {reviews.length === 0 ? (
        <section className="text-foreground bg-background py-10 lg:py-20">
          <div className="lg:container flex flex-col items-center gap-6">
            <h2 className="text-2xl w-full">
              Reviews <span className="text-gray-400 ml-2">{reviews.length}</span>
            </h2>
            <p className="text-gray-500">There are no reviews yet.</p>
            <Button variant="primary" onClick={() => setShowReviewModal(true)}>
              Be the first to write a review
            </Button>
          </div>
        </section>
      ) : (
        <section className="text-foreground bg-background py-10 lg:py-20 space-y-10">
          <div className="lg:container space-y-10">
            <div className="flex flex-col gap-10 px-3">
              { /* TODO: Make this dynamic based on whether the user is logged in */ }
              <Button variant="link" onClick={() => setShowReviewModal(true)}>
                Write a review
              </Button>
              <h2 className="text-2xl">
                Reviews <span className="text-gray-400 ml-2">{reviews.length}</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-5 items-end px-3">
              <div className="space-y-2">
                <h3 className="text-7xl">{avgRating.toFixed(1)}</h3>
                <Rating rating={avgRating} showRating={false} />
              </div>
              <div className="flex flex-wrap items-center lg:col-span-2 max-w-2xl">
                <Gemini className="size-3" />
                <span className="text-xs font-medium ml-1 mr-2">Gemini</span>
                <p className="text-xs text-gray-500">generated from the text of customer reviews</p>
                <div
                  ref={summaryRef}
                  className={cn(
                    'mt-4 text-xl w-full transition-opacity duration-300',
                    'opacity-100'
                  )}
                >
                  <Markdown>{summary}</Markdown>
                </div>
              </div>
            </div>

            <Carousel>
              {reviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </Carousel>
          </div>
        </section>
      )}

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        product={{...product, price: Math.min(...product.variants.map((variant) => variant.price))}}
      />
    </>
  )
}
