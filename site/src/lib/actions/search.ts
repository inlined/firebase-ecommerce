'use server'

import { search, SearchData } from '@firebasegen/default-connector'
import getDataConnect from '@/lib/firebase/getDataConnect'

type Error = {
  message: string
}

export type Product = {
  title: string
  id: string
  _metadata: {
    distance: number
  }
}

function dedupeProducts(results: Product[]): Product[] {
  const deduped: Record<string, Product> = {}
  for (const result of results) {
    if (!(result.id in deduped) || deduped[result.id]._metadata.distance > result._metadata.distance) {
      deduped[result.id] = result;
    }
  }
  return Object.values(deduped).sort((a, b) => a._metadata.distance - b._metadata.distance);
}

export const handleSearch = async ({ query }: { query: string }): Promise<Product[] | Error> => {
  const dc = getDataConnect();
  try {
    // Return early if no search query is provided
    if (!query) {
      return { message: 'No query provided' }
    }

    // Perform parallel searches across product descriptions, names and reviews
    const { data: searchResults } = await search(dc, { query });

    return dedupeProducts([
      ...searchResults.productsByDescription,
      ...searchResults.productsByTitle,
      ...searchResults.reviews.map(r => r.product),
    ]);
  } catch (error) {
    return { message: `Error performing search: ${error}` }
  }
}
