import { ai } from '.';
import { z } from 'genkit'
import getDataConnect from '@/lib/firebase/getDataConnect';
import { getCache } from '../cache';
import { getReviewsByProductId } from '@firebasegen/default-connector';

export const summarizeReviews = ai.defineFlow({
    name: 'summarizeReviews',
    inputSchema: z.object({
        productId: z.string(),
        forceRefresh: z.boolean().optional(),
    }),
    outputSchema: z.string(),
    streamSchema: z.string(),
}, async ({ productId, forceRefresh}, { sendChunk}) => {
    const cache = getCache();
    if (!forceRefresh) {
        try {
            const cached = await ai.run("check cache", () => cache.getString(`reviews-${productId}`));
            if (cached) {
                return cached;
            }
        } catch (e) {
            console.error("Cache load failed with error", e);
        }
    }

    const { data: { productReviews: reviews } } = await getReviewsByProductId(getDataConnect(), { productId });

    if (!reviews.length) {
        return 'Nobody has left a review. Be the first!';
    }

    const prompt =
      'Generate a summary from the following structured user reviews (where the max rating is 5), ' +
      'keep it short and concise: \n\n' +
      JSON.stringify(reviews.map((r) => ({ content: r.content, rating: r.rating })))
      '\n\n' +
      '\n\n' +
      'Make sure to focus on subjects like: fit, build quality, value, looks, washability.' +
      '\n\n' +
      '***Keep the summary under 650 characters.***';
    
    const { stream, response } = ai.generateStream(prompt);
    for await (const chunk of stream) {
        sendChunk(chunk.text);
        if (process.env.DEMO_SLOW_AI_STREAMING) {
            await new Promise((resolve) => setTimeout(resolve, Number(process.env.DEMO_SLOW_AI_STREAMING) || 500));
        }
    }

    const { text } = await response;
    await ai.run("write cache", async () => {
        try {
            await cache.setString(`reviews-${productId}`, text)
        } catch (e) {
            console.error("Cache write failed with error", e);
        }
    });

    return text;
});