import CardCarousel from '@/components/sections/card-carousel'

import Details from '@/components/sections/details'
import Hero from '@/components/sections/hero'
import ProductGrid from '@/components/sections/product-grid'
import CategoryCard from '@/components/ui/category-card'
import { notFound } from 'next/navigation'
import getDataConnect from '@/lib/firebase/getDataConnect'
import { getCollectionsByPage } from '@firebasegen/default-connector'
import CardOverlay from '@/components/card-overlay'

// This file is loaded with a dynamic query so it should not be part of SSG.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: collectionsData } = await getCollectionsByPage(getDataConnect(), { page: 'home' });
  const [mainCollection, secondaryCollection, tertiaryCollection] = [
    ...(collectionsData?.collections || [])
  ].sort((a, b) => {
    const order: Record<string, number> = {
      'o25-collection': 1,
      'mist-collection': 2,
      'winter-collection': 3
    }
    return (order[a.handle] || 99) - (order[b.handle] || 99)
  })

  if (!collectionsData?.collections?.length) return notFound()

  return (
    <>
      <Hero
        title={mainCollection?.name as string}
        description={mainCollection?.description as string}
        image={mainCollection?.featuredImage?.url as string}
        primaryCta={{ label: 'Shop Now', href: `/category/${mainCollection?.handle}` }}
        secondaryCta={{ label: 'Learn More', href: `/category/${mainCollection?.handle}#about` }}
      />
      <Details title="About" body={mainCollection?.description as string} />
      <CardCarousel title="Explore" cta={{ label: 'Shop All', href: '/products' }}>
        {collectionsData?.collections
          .filter((collection) => Boolean(collection?.featuredImage?.url))
          .map((collection) => (
            <CategoryCard
              key={collection.id}
              handle={collection.handle}
              name={collection.name}
              image={collection.featuredImage?.url || ''}
            />
          ))}
      </CardCarousel>
      <CardOverlay
        title={secondaryCollection?.name as string}
        description={secondaryCollection?.description as string}
        cta={{ label: 'Shop Now', href: `/category/${secondaryCollection?.handle}` }}
        image={secondaryCollection?.featuredImage?.url as string}
      />
      <ProductGrid
        title={tertiaryCollection?.name as string}
        variant="character"
        products={tertiaryCollection?.products.map((product) => ({
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: product.variants.at(0)?.price?.toString() || '',
          image: product.images.at(0),
          variants: product.variants
            .at(0)
            ?.selectedOptions_on_productVariant.map((option) => (option.value || ''))
        }))}
      />
    </>
  )
}
