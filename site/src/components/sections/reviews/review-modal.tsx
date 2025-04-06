import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState, FormEvent } from 'react'
import ProductListItem from '../order-summary/product-list-item'
import Rating from '@/components/ui/rating'
import Button from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { handleCreateReview } from '@/app/product/[id]/actions'

type Props = {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    price: number
    featuredImage: {
      url: string
      altText: string
    }
  }
}

export default function ReviewModal({ isOpen, onClose, product }: Props) {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const { user: customer } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await handleCreateReview({
      productId: product.id,
      rating,
      content: review
    })

    // Clear form and close modal
    setRating(5)
    setReview('')
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-6xl flex flex-col gap-8 md:gap-10 transform overflow-hidden rounded-lg md:rounded-2xl bg-white px-4 py-6 md:p-10 text-left align-middle shadow-xl transition-all">
                <h2 className="text-4xl">Write a review</h2>

                <ProductListItem
                  title={product.title}
                  quantity={0}
                  featuredImage={product.featuredImage}
                  variant={({
                    title: product.title,
                    price: product.price, 
                  })}
                />

                <div className="space-y-2">
                  <h3 className="text-xs">Rating</h3>
                  <Rating rating={rating} interactive onChange={setRating} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <h3 className="text-xs">Review</h3>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="What did you think?"
                    className="w-full border border-gray-200 rounded-lg md:rounded-2xl p-4 resize-none h-[151px] placeholder-gray-400 font-medium focus:outline-none focus:border-foreground transition-colors"
                  />
                  <div className="flex pt-6 md:pt-8 md:flex-col md:gap-2">
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="secondary"
                      className="px-5 min-w-fit md:w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
