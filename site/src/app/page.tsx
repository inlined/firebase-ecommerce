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
  const { data: { collections } } = await getCollectionsByPage(getDataConnect(), { page: 'home' });

  if (!collections?.length) return notFound()
  const [mainCollection, secondaryCollection, tertiaryCollection] = collections
  .sort((a, b) => {
    // TODO: Do not hardcode this
    const order: Record<string, number> = {
      'o25-collection': 1,
      'mist-collection': 2,
      'winter-collection': 3
    }
    return (order[a.id] || 99) - (order[b.id] || 99)
  })


  return (
    <>
      <Hero
        title={mainCollection?.name as string}
        description={mainCollection?.description as string}
        image={mainCollection?.featuredImage?.url as string}
        primaryCta={{ label: 'Shop Now', href: `/category/${mainCollection?.id}` }}
        secondaryCta={{ label: 'Learn More', href: `/category/${mainCollection?.id}#about` }}
      />
      <Details title="About" body={mainCollection?.description as string} />
      <CardCarousel title="Explore" cta={{ label: 'Shop All', href: '/products' }}>
        {collections
          .filter((collection) => Boolean(collection.featuredImage.url))
          .map((collection) => (
            <CategoryCard
              key={collection.id}
              id={collection.id}
              name={collection.name}
              image={collection.featuredImage?.url || ''}
            />
          ))}
      </CardCarousel>
      <CardOverlay
        title={secondaryCollection?.name}
        description={secondaryCollection?.description || ''}
        cta={{ label: 'Shop Now', href: `/category/${secondaryCollection?.id}` }}
        image={secondaryCollection?.featuredImage}
      />
      <ProductGrid
        title={tertiaryCollection?.name as string}
        variant="character"
        products={tertiaryCollection?.products}
      />
    </>
  )
}
