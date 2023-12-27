import { promises as fs } from 'fs';
import path from 'path';
import { Assistant } from 'openai/resources/beta/assistants/assistants';
import OpenAI from 'openai';
/*

const openai = new OpenAI({apiKey:'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'});

async function chat(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}


/*
// Configure the OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// This function handles POST requests to the /api/speechToText route
export async function POST(request) {
  // Check if the OpenAI API key is configured
  if (!configuration.apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured, please follow instructions in README.md" }, {status:500});
  }

    const assistant = await Assistant.create({
        name: "Math Tutor",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview"
      });
      const thread = await openai.beta.threads.create();
      const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
        }
      );
      const run = await openai.beta.threads.runs.create(
        thread.id,
        { 
          assistant_id: assistant.id,
          instructions: "Please address the user as Jane Doe. The user has a premium account."
        }
      );
      const messages = await openai.beta.threads.messages.list(
        thread.id
      );
      console.log(messages)

  return {
    recipe,
  };
}
*/
/*
export default async function handler(req, res) {
    console.log('method isss',req.method)
    if (req.method === 'POST') {
      console.log('body',req.body, typeof(req.body));
    try {
        const {message: questionData } =req.body;
        debugger
        console.log('Question',questionData)
        chat()
        res.status(200).json({ success: true });
        
        
    } catch (error) {
      
        console.error('Error processing POST request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    } 
}
*/