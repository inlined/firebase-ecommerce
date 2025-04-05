import CardOverlay from '@/components/card-overlay'
import ProductList from '@/components/sections/product-list'
import getDataConnect from '@/lib/firebase/getDataConnect'
import { getCollection } from '@firebasegen/default-connector'

export default async function ProductListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: { collection } } = await getCollection(getDataConnect(), { id })

  if (!collection) {
    return <div>Collection not found</div>
  }
  
  return (
    <>
      <ProductList
        name={collection.name}
        products={collection.products}
      />
      <CardOverlay
        title={collection?.name as string}
        description={collection?.description as string}
        cta={{ label: 'Shop Now', href: `/category/${id}` }}
        image={collection.featuredImage}
        align="center"
      />
    </>
  )
}
