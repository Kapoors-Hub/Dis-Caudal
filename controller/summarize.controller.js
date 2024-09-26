import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeContent = async (req, res, next) => {
  try {
    const { content } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4",  // Changed from "gpt-3.5-turbo" to "gpt-4"
      messages: [
        { role: "system", content: "You are a highly capable assistant that provides concise and accurate summaries amd summarises the text in points, without missing key information. Also, dont summarise the content in third person." },
        { role: "user", content: `Please provide a concise summary of the following text, capturing the main points and key details:\n\n${content}` }
      ],
      max_tokens: 150,
      temperature: 0.3,  // Lowered temperature for more focused output
    });

    const summary = response.choices[0].message.content.trim();
    res.status(200).json({ success: true, summary });
  } catch (error) {
    console.error('Error in summarization:', error);
    next(error);
  }
};