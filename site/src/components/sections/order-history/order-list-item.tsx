import Button from '@/components/ui/button'
import Link from 'next/link'
import { GetCurrentUserOrdersData } from '@firebasegen/default-connector'

type Props = {
  order: GetCurrentUserOrdersData['orders'][number]
}

export default function OrderListItem({ order }: Props) {
  const { totalPrice, processedAt, items, id } = order
  const totalPriceInDollars = totalPrice / 100

  return (
    <article className="flex gap-10 items-center py-5">
      {items[0].product.featuredImage.url ? (
        <img
          src={items[0].product.featuredImage.url as string}
          alt={items[0].product.title}
          width="100"
          height="100"
          className="size-16 md:size-10 rounded-full object-cover shrink-0 bg-gray-200"
        />
      ) : (
        <div className="size-16 md:size-10 bg-gray-200 rounded-full shrink-0" />
      )}
      <div className="w-full flex max-md:flex-col md:gap-10 items-center [&_div]:w-full">
        <div className="max-md:text-xs">
          {items.map((item, index) => (
            <span key={item.product.id}>
              {item.product.title}
              {index < items.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        <div className="max-md:text-xs">
          <span className="md:hidden text-gray-400 mr-2">Date</span>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium'
          }).format(new Date(processedAt))}
        </div>
        <div className="max-md:text-xs md:text-right">
          <span className="md:hidden text-gray-400 mr-2">Items</span>
          {items[0].quantity}
        </div>
        <div className="max-md:text-xs md:text-right">
          <span className="md:hidden text-gray-400 mr-2">Total</span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(totalPriceInDollars)}
        </div>
      </div>
      <div className="w-32 flex gap-2 items-center justify-end shrink-0">
        <Link href={`/orders/${id}`}>
          <Button variant="tertiary" size="sm">
            View
          </Button>
        </Link>
        <Button size="sm">Track</Button>
      </div>
    </article>
  )
}
