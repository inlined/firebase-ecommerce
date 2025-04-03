type Props = {
  title: string
  quantity: number
  variant: {
    title: string
    price: number | string
    image: {
      url: string
      altText?: string | null
      width?: number
      height?: number
    }
  }
}

export default function ProductListItem({ title, variant, quantity }: Props) {
  return (
    <article className="w-full flex gap-4 lg:gap-10 items-center text-sm">
      <img
        src={variant.image.url}
        alt={title}
        height="100"
        width="100"
        className="w-16 h-16 object-cover shrink-0 rounded-lg"
      />
      <div>
        <h2 className="font-medium">{title}</h2>
        <p className="text-gray-400">{variant.title}</p>
      </div>
      <div className="flex gap-4 lg:gap-10 ml-auto">
        { quantity ?  <><span className="text-gray-400">QTY</span> {quantity}</> : <></> }
        <span className="font-medium">
          {typeof variant.price === "string" ? variant.price : new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(variant.price)}
        </span>
      </div>
    </article>
  )
}
