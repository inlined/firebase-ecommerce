import { genkit } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";

if (process.env.NODE_ENV === "production") {
  (async () => {
    const { enableFirebaseTelemetry } = await import("@genkit-ai/firebase");
    await enableFirebaseTelemetry();
    console.log("Firebase telemetry loaded");
  })();
}

// Auto initialized with env var
export const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});
