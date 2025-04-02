import { genkit } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";

// Auto initialized with env var
export const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});
