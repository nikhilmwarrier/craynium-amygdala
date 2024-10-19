import { jsonFixer } from "./helpers/jsonFixer.js";

/**
 * Generates a card using CF's AI api.
 * @param {string} text
 * @returns {Promise<{
 *   front: string;
 *   back: string;
 * }[]>}
 */
export default async function generateCardWithAI(text) {
  const cfApiUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_AI_ID}/ai/run/@cf/meta/llama-3.2-3b-instruct`;

  console.log(cfApiUrl);

  const cfResponse = await fetch(cfApiUrl, {
    method: "POST",
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who can only output JSON. Only output JSON in the given schema. DO NOT OUTPUT anything other than JSON.",
        },
        {
          role: "user",
          content: `Use this JSON schema:

Card = {'front': str (question or fill-in-the-blank), 'back': str (answer) }
Return: list[Card] (max_length: 3)

Identify useful information from the following text and use it to generate succinct spaced-repetition JSON Cards, following the given schema:

"${text}"`,
        },
      ],
    }),
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_AI_TOKEN}`,
    },
  });

  const cfData = await cfResponse.json();

  if (!cfData.success) throw new Error("YOU MESSED UP");

  let cardsStr = jsonFixer(cfData.result.response);

  try {
    return JSON.parse(cardsStr);
  } catch (error) {
    console.error(error);
  }
}
