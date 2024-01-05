import { Server } from 'socket.io'
import { OpenAI } from 'openai'
import {env} from 'process'


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
        console.log(userInput)
        // Handle user input, interact with ChatGPT, and emit the response
        const chatGPTResponse = await chat(userInput);
        if (chatGPTResponse.error){

        }
        else{   
          console.log('response',chatGPTResponse)
        socket.emit('update-input', chatGPTResponse);}
     
      });
      
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    })
  
  res.end()
}
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
async function chat(message) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: message }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
 
    return completion.choices[0].message.content
  
    // Continue with the rest of your code, using the 'completion' variable if no error occurred
  } catch (error) {
    // Handle the error here
    console.error("Error during API call:", error);
    return (error)
  }


 
}
export default SocketHandler