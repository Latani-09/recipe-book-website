import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getAllRecipes } from './api/recipes'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import chat from './chatintegration/chat';
import { Messages } from 'openai/resources/beta/threads/messages/messages';
let socket;
export default function Home({recipes}) {
  const [searchItem, setSearchItem] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
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
      console.log(typeof(chatHistory.text))
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
    
  

  const handleInputChange = (e) => { 
    debugger
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  console.log('recipes' , recipes)}
  const handleSearch = (e) => { 
    debugger
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  console.log('recipes' , recipes)
  const filteredItems = recipes.filter((recipe) =>
    recipe[0].toLowerCase().includes(searchTerm.toLowerCase())
    );
      setFilteredRecipes(filteredItems);
      console.log('filtered',filteredRecipes)
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Mom's recipe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/addRecipe">Add Recipe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div className="page-padding">
        <div className="page-content">
          <div className="container">
            <div className="row">
              {filteredRecipes.map((name, index) => (
                <div key={name[1]} className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div className="product-layout product-grid">
                    <div
                        className="product-thumb"
                        style={{
                          height: '250px',
                          backgroundImage: `url(${name[2]})`,
                          backgroundSize: 'cover',
                        }}>
                    
                        <div
                            id={`product${index}`}
                            className="carousel slide"
                            data-ride="carousel"
                            data-interval="false">
                          <div className="carousel-inner">
                            <div
                              className="item active"
                              style={{
                                minHeight: '100px',
                              }}>
                              <Link href={`/recipes/${name[1]}`}>
                                <img
                                  className="img-fluid"
                                  src={name[2] ?? './pics/food.png'}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = './pics/briyani.jpg';
                                  }}
                                  style={{
                                    hover: { opacity: 0.7 },
                                    alignSelf: { overflowPosition: 0.2 },
                                    backgroundColor: 'transparent',
                                  }}
                                  alt={name[0]}
                                />
                              </Link>
                            </div>
                          <div className="button-group"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="caption"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        marginBottom: '3px',
                        backgroundColor: 'white',
                      }}
                    >
                      <h2 id={`product-caption-${index}`}>{name[0]}</h2>
                    </div>
                  </div>
                </div>

              ))}
                </div>
              </div>
        </div>
        <div className={styles.chat}>
          <div>
            <h2>Chat with Assistant</h2>
            <div className={styles.chatHistory}>
  
              {chatHistory}
            </div>
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

export async function getStaticProps() {
  const recipes = await getAllRecipes();
  return {
    props: {
      recipes,
    },
  };
}
