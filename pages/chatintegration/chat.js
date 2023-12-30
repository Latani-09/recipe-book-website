import Head from 'next/head';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {Nav,Navbar }from 'react-bootstrap';
import { Container ,Spinner,Row,Col,OverlayTrigger} from 'react-bootstrap';
let socket;
export default function chatwithgpt() {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([]);
  const [response,setResponse]  =useState('')
  const [loading, setLoading] = useState(false);
  let prevChatHistory=[]
    useEffect(() =>{
      async function socketInitializer(){
      await fetch('/api/socket');
      socket = io()
      socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
      });
      
      socket.on('update-input', async(msg) => {
        console.log("msg received from server" ,msg)
         await handleReceivedMessage(msg);
      });
      
    
      }

      socketInitializer();
    },[]);
    
    const handleReceivedMessage = (msg) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, msg]);
      console.log(chatHistory)
      console.log(typeof(chatHistory))
    };
    const onChangeHandler = (e) => {
      setInput(e.target.value)
    }
    const handleSendChat = (e) => {
      
     {
            setResponse('')
            setLoading(true)
            console.log("handle sedn chat -------", input)
            socket.emit("input-change",input);
        }
    }
  return (
    <div className={styles.container}>
    <Head>
      <title>Recipe book</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossOrigin="anonymous"
      />
      <link rel="icon" href="/pngegg.ico" />
    </Head>
    <main>
    <Navbar expand="lg" className="bg-body-tertiary  mb-4" >
      <Container>
        <Navbar.Brand 
        href="/"><h1 style={{  color:'green', fontStyle:'oblique'}}>Mom's recipe</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/addRecipe">Add Recipe</Nav.Link>
            <Nav.Link href="/chatintegration/chat">Ask ChatGPT</Nav.Link>
            <Nav.Link href="/">About app</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
          
        <div className={styles.chat}>
        <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Type something"
                value={input}
                onChange={onChangeHandler}
              />
              <button type="button" onClick={handleSendChat}>
                Send
              </button>
            </div>
          <div>
          <div className={styles.chatHistory}>
            {loading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            )}
            {chatHistory.map((msg, index) => (
              <div key={index} className={styles.chatMessage}>
                {msg}
              </div>
            ))}
          </div>
          </div>
        </div>
    </main>
    <style jsx>{`
      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .${styles.topSection} {
        padding: 20px;
        background-color: #f4f4f4;
      }

      .${styles.navBar} {
        margin-top: 10px;
      }

      .${styles.navBar} a {
        margin-right: 20px;
        text-decoration: none;
        color: #333;
        font-weight: bold;
        font-size: 16px;
      }

      .${styles.navBar} a:hover {
        color: blue;
      }


      .${styles.chat} {
        width: 25%;
        background-color: #f4f4f4;
        padding: 20px;
      }

      .${styles.chatHistory} {
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #ddd;
        padding: 10px;
      }

      .${styles.chatMessage} {
        margin-bottom: 10px;
      }

      .${styles.chatInput} {
        display: flex;
        margin-top: 20px;
      }

      .${styles.chatInput} input {
        flex: 1;
        padding: 5px;
        margin-right: 10px;
      }

      .${styles.chatInput} button {
        padding: 5px 10px;
        cursor: pointer;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          Fira Sans,
          Droid Sans,
          Helvetica Neue,
          sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
  );
}
