import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductSection from '@/components/sections/product-section'
import Features from '@/components/sections/features'
import Truck from '@/components/icons/truck'
import Star from '@/components/icons/star'
import Rotate from '@/components/icons/rotate'
import ProductDetails from '@/components/sections/product-details'
import Reviews from '@/components/sections/reviews'
import getDataConnect from '@/lib/firebase/getDataConnect'
import { getProduct, getProductReviews } from '@firebasegen/default-connector'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductPage(props: Props) {
  const dc = getDataConnect();
  const params = await props.params

  const { data: { product } } = await getProduct(dc, { id: params.id })
  if (!product ) return notFound();

  const { data: { reviews }} = await getProductReviews(dc, { productId: product.id })

  const searchParams = await props.searchParams
  const selectedOptions: Array<{ name: string; value: string }> = []

  // Set selected options from the query string
  Object.entries(searchParams).forEach(([name, value]) => {
    if (typeof value === 'string') {
      selectedOptions.push({ name, value })
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        selectedOptions.push({ name, value: v })
      })
    }
  })

  if (!product) return notFound()

  const { title, description, featuredImage, variants, id } = product

  const options = variants?.reduce(
    (acc, variant) => {
      variant.selectedOptions_on_productVariant.forEach((option) => {
        const name = option.name
        const value = option.value

        if (name && value) {
          if (!acc[name]) {
            acc[name] = []
          }
          if (!acc[name].includes(value)) {
            acc[name].push(value)
          }
        }
      })

      return acc
    },
    {} as Record<string, string[]>
  )

  const currentVariant =
    variants?.find((variant) =>
      variant.selectedOptions_on_productVariant.every((option) =>
        selectedOptions.some(
          (selected) =>
            selected.name.toLowerCase() === option.name?.toLowerCase() &&
            selected.value.toLowerCase() === option.value?.toLowerCase()
        )
      )
    ) ?? variants?.[0]

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <>
      <ProductSection
        productId={id}
        title={title}
        options={options}
        description={description ?? ''}
        images={featuredImage ? [featuredImage] : []}
        currentVariant={currentVariant}
        avgRating={averageRating}
      />
      <Features
        list={[
          { name: 'Reviews', description: `(${reviews.length})` },
          { icon: <Truck />, name: 'Shipping & Returns' }
        ]}
        inline
      />
      <ProductDetails
        image={featuredImage}
        accordions={[
          {
            label: 'Description',
            children: <p>{description}</p>
          },
          {
            label: 'Specifications',
            children: (
              <ul>
                <li>Fit: Regular fit</li>
                <li>Neckline: Crew neck</li>
                <li>Sleeves: Long sleeves with ribbed cuffs</li>
                <li>Hem: Ribbed hem</li>
              </ul>
            )
          },
          {
            label: 'Design',
            children: (
              <p>
                Classic collegiate style with a modern twist, featuring chain-stitched embroidery
                for a touch of vintage charm. The sweater&apos;s simple yet refined design makes it
                versatile enough for casual or semi-casual wear.
              </p>
            )
          },
          {
            label: 'Material & Care',
            children: (
              <ul>
                <li>Material: 100% Chenille</li>
                <li>
                  Care: Machine wash cold, gentle cycle. Lay flat to dry. Avoid bleach and tumble
                  drying to maintain the soft texture of the chenille.
                </li>
              </ul>
            )
          }
        ]}
      />
      <Features
        list={[
          { icon: <Truck />, name: 'Free Shipping', description: 'On orders over $250' },
          { icon: <Rotate />, name: 'Free Returns', description: 'On full priced items only' },
          { icon: <Star />, name: '2 Year Warranty', description: 'As standard' }
        ]}
      />
      <Reviews
        reviews={reviews}
        avgRating={Number(averageRating)}
        product={product}
      />
    </>
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const {
    data: { product }
  } = await getProduct(getDataConnect(), { id: params.id })

  if (!product) return notFound()

  const { seo, title, description, featuredImage } = product

  return {
    title: seo?.title || title,
    description: seo?.description || description,
    openGraph: featuredImage
      ? {
          images: [
            {
              url: featuredImage.url,
              width: featuredImage.width,
              height: featuredImage.height,
              alt: featuredImage.altText ?? undefined
            }
          ]
        }
      : null
  }
}
