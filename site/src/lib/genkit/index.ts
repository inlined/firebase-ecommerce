import { genkit } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { enableFirebaseTelemetry } from "@genkit-ai/firebase"

enableFirebaseTelemetry();

// Auto initialized with env var
export const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});
