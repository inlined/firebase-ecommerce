import { CardOverlayCenter } from './card-overlay-center'
import { CardOverlayRight } from './card-overlay-right'

type CardOverlayProps = {
  title: string
  description?: string
  cta?: {
    label: string
    href: string
  }
  image: {
    url: string
    altText?: string | null
    width: number
    height: number
  }
  align?: 'center' | 'right'
}

export default function CardOverlay(props: CardOverlayProps) {
  const { align = 'right' } = props
  return align === 'right' ? <CardOverlayRight {...props} /> : <CardOverlayCenter {...props} />
}
