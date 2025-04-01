'use server'

import { revalidateTag } from 'next/cache'
import getDataConnect from '@/lib/firebase/getDataConnect'
import { createProductReview, CreateProductReviewVariables } from '@firebasegen/default-connector'

export const handleCreateReview = async (variables: CreateProductReviewVariables) => {
  await createProductReview(getDataConnect(), variables)
  // Reset reviews cache
  revalidateTag('reviews')
}
