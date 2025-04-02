'use server'

import getDataConnect from '@/lib/firebase/getDataConnect'
import { createProductReview, CreateProductReviewVariables } from '@firebasegen/default-connector'
import getServerApp from '@/lib/firebase/getServerApp'
import { getCache } from '@/lib/cache';

export const handleCreateReview = async (variables: CreateProductReviewVariables) => {
  const app = await getServerApp();
  // N.B. we could techncially lock down access to creating product reviews so that users _must_
  // go through an API, but having an out of date cache isn't actually a big deal, and this
  // is an opportunity to show off client-server auth sync with RSC.
  await createProductReview(getDataConnect(app), variables)
  // Reset reviews cache
  getCache().invalidate(`reviews-${variables.productId}`);
}
