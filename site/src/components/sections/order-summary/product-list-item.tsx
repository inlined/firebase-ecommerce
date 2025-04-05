import { GetProductData } from "@firebasegen/default-connector"

type Props = {
  title: string;
  quantity: number;
  featuredImage: {
    url: string;
    altText: string; 
  };
  variant: {
    title: string;
    price: number;
  }
}

export default function ProductListItem({ title, featuredImage, variant, quantity }: Props) {
  return (
    <article className="w-full flex gap-4 lg:gap-10 items-center text-sm">
      <img
        src={featuredImage.url}
        alt={featuredImage.altText || title}
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
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(variant.price)}
        </span>
      </div>
    </article>
  )
}
