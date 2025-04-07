import ProductCard from '../ui/product-card'
import ProductGridItem from '../ui/product-grid-item'

type Props = {
  title: string
  variant?: 'character' | 'simple' | 'minimal'
  products: Array<{
    id: string
    title: string
    featuredImage?: {
      url: string
      altText?: string | null
      width: number
      height: number
    }
    variants: Array<{
      sku: string;
      price: number;
      title: string;
      selectedOptions: Array<{
        name: string
        value: string
      }>
    }>
  }>
}

export default function ProductGrid({ title, products, variant = 'character' }: Props) {
  function minPrice(product: Props['products'][number]) {
    return Math.min(
      ...product.variants.map(variant => variant.price)
    )
  }

  return (
    <section className="text-foreground bg-background py-16 md:py-24">
      <div className="container">
        {title ? (
          <h2 className="text-justify text-2xl md:text-8xl max-md:px-12 after:content-[''] after:inline-block after:w-full">
            {title}
          </h2>
        ) : null}

        {products && products.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {products.map((product, index) =>
              variant === 'minimal' ? (
                <ProductCard
                  key={product.id}
                  image={product.featuredImage}
                  name={product.title}
                  price={minPrice(product)}
                  slug={product.id}
                  title={product.title}
                  tags={
                    // TODO: This used to be something along the lines of selected options (passed in as a variants string from srx/page)
                    // but there was never any actual data. Leaving this for someone who knows what was intended to be here to either
                    // implement or clean up the code
                    ''}
                />
              ) : (
                <ProductGridItem
                  key={product.id}
                  index={index}
                  variant={variant}
                  image={product.featuredImage}
                  name={product.title}
                  price={minPrice(product)}
                  slug={product.id}
                  tags={
                    // TODO: This used to be something along the lines of selected options (passed in as a variants string from srx/page)
                    // but there was never any actual data. Leaving this for someone who knows what was intended to be here to either
                    // implement or clean up the code
                    ''}
                />
              )
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
