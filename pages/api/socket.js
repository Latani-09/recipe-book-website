import { Server } from 'socket.io'
import { OpenAI } from 'openai'
let io;
const SocketHandler = async(req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    io=res.socket.server.io;
  } else {
    console.log('Socket is initializing')
    io = new Server(res.socket.server)
    res.socket.server.io = io
  }
    io.on('connect', socket => {
        console.log('connected')
      socket.on('input-change', async (userInput) => {
        console.log("reaching chatgpt")
        // Handle user input, interact with ChatGPT, and emit the response
        const chatGPTResponse = await chat(userInput);
        console.log('response',chatGPTResponse)
        socket.emit('update-input', chatGPTResponse);
      });
      
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    })
  
  res.end()
}
//const openai = new OpenAI({apiKey:'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'});
const openai = new OpenAI({apiKey:'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'});
async function chat(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content
}
export default SocketHandler