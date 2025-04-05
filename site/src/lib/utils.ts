import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractVariantOptions = (
  products: {
    variants: {
      selectedOptions: {
        name?: string | null
        value?: string | null
      }[]
    }[]
  }[]
) => {
  if (!products) return {}

  return products.reduce(
    (acc, product) => {
      product.variants.forEach((variant) => {
        variant.selectedOptions.forEach((option) => {
          if (!option.name || !option.value) return

          const name = option.name.toLowerCase()
          if (!acc[name]) {
            acc[name] = new Set<string>()
          }
          acc[name].add(option.value.toLowerCase())
        })
      })
      return acc
    },
    {} as Record<string, Set<string>>
  )
}
