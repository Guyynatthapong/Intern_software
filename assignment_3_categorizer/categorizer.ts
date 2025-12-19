import 'dotenv/config'; 
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const VALID_CATEGORIES = ['food', 'transport', 'utilities', 'shopping', 'other', 'invalid'] as const;

export type Category = typeof VALID_CATEGORIES[number];

function isValidCategory(input: string): input is Category {
  return (VALID_CATEGORIES as readonly string[]).includes(input);
}


export async function categorizer(description: string): Promise<Category> {

    if (!description || description.trim().length === 0) {
        return 'invalid';
    }
    const prompt = `
        Classify the transaction into ONE category.
b
        Allowed categories:
        - food
        - transport
        - utilities
        - shopping
        - other
        - invalid

        Rules:
        - Respond ONLY with the category name (String).
        - No explanation
        - if Gifts or donations or expenses that don't fit above must be categorized as other
        - If the description is empty or nonsen or random words (ex. "daklsdj", "test", "hello")  must be categorize as invalid

        Format:
        food | transport | utilities | shopping | other | invalid

        Example:
        "เติมน้ำมัน ปตท" → transport

        Transaction:
        "${description}"
    `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',   
            messages: [
                { role: "system", 
                  content: `You are a transaction categorization engine. Categories: [${VALID_CATEGORIES.join(', ')}]. Return ONLY the category name.` },
                { role: "user", content: prompt },
            ],
        });

    const rawResult = response.choices[0]?.message?.content?.trim().toLowerCase() ?? '';

    if (isValidCategory(rawResult)) {
      return rawResult;
    } else {
      console.warn(`LLM hallucinated invalid category: "${rawResult}".`);
      return 'invalid';
    }

  } catch (error) {
    console.error('LLM API Error:', error instanceof Error ? error.message : error);
    return 'other';
  }
}


