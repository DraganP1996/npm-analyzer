const models = [
  // "deepseek/deepseek-chat-v3-0324:free",
  "google/gemini-2.0-flash-001",
  "anthropic/claude-sonnet-4",
];
const OPENROUTER_API = "https://openrouter.ai/api/v1/completions";

export const sendPropmpt = async (prompt: string): Promise<string> => {
  for (const model of models) {
    console.log(`⏳ Trying model: ${model}`);

    const response = await fetch(OPENROUTER_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const message = data.choices?.[0]?.text?.trim();
      return message;
    }

    const errorText = await response.text();
    console.warn(`⚠️ Model failed: ${model}`, response.status, errorText);

    // Only fall back if it's a 503 or 500–599 server error
    if (response.status < 500 || response.status >= 600) {
      break; // Stop retrying if it's a client-side or unrelated error
    }
  }

  console.error("❌ All model attempts failed.");
  return "";
};
