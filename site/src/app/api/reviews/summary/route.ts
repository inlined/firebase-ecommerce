import { appRoute } from "@genkit-ai/next";
import { summarizeReviews } from "@/lib/genkit/summarizeReviews";

export const POST = appRoute(summarizeReviews);
