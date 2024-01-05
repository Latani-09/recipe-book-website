import { useRouter } from 'next/router';
import { getAllRecipeIds,getRecipeData } from '../api/recipes.js';
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { Form,Navbar,Nav,Container,Card, CardBody, CardHeader, Button,Spinner } from 'react-bootstrap';
let socket;
export default function  recipe({recipe}) {

  const recipenotfound=(!recipe.recipe)
  const router = useRouter();
  const title=recipe.recipe.name;
  const recipe_steps=recipe.recipe.method;
  const recipe_ingredients=recipe.recipe.ingredients;
  /*

  const = useState(title);
  const [editedSteps, setEditedSteps] = useState(steps);
  const [editedIngredients,setEditedIngredients]=useState(ingredients)*/
  const [input, setInput] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle]  = useState(title);
  const [editedIngredients, setEditedIngredients] = useState(recipe_ingredients); // Initial ingredient input
  const [editedSteps, setEditedSteps] = useState(recipe_steps);
  const [chatHistory, setChatHistory] = useState([]);
  const [question,setquestion]=useState('')
  const [response,setResponse]  =useState('')
  const [loading, setLoading] = useState(false);
  console.log('before edit',editedIngredients,editedSteps)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddIngredient = () => {
    setEditedIngredients([...editedIngredients, '']);
  };
  const handleAddSteps = () => {
    setEditedSteps([...editedSteps, '']);
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...editedIngredients];
    newIngredients.splice(index, 1);
    setEditedIngredients(newIngredients);
  };
  const handleSaveClick = async() => {
    setIsEditing(false);
    const formData={
      recipe:{
      "id":recipe.recipe.id,
      "name":editedTitle,
      "img":recipe.recipe.img,
      "ingredients":editedIngredients,
      "method":editedSteps}
  }
  console.log('data sent from client',formData)
    const response = await fetch(`http://localhost:3000/api/recipes`,{
      method:'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( formData) ,
    });
    console.log(response.data);

    // You can handle saving the changes here, e.g., by sending them to the server
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.textContent);
  };

  const handleStepChange = (index, newValue) => {
    const updatedSteps = [...editedSteps];
    updatedSteps[index] = newValue;
    setEditedSteps(updatedSteps);
  };
  const handleIngredientsChange = (index, newValue) => {
    const updatedIngredients = [...editedIngredients];
    updatedIngredients[index] = newValue;
    setEditedIngredients(updatedIngredients);
  };
  const handleRemoveSteps= (index) => {
    const newSteps = [...editedSteps];
    newSteps.splice(index, 1);
    setEditedSteps(newSteps);
  };
  
  const handleDelete = async () => {
    try {
      console.log('recipe id ',recipe.recipe.id)
      const response = await fetch(`http://localhost:3000/api/recipes`, {
        method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: recipe.recipe.id }), // Send the recipe ID in the request body
        });
    

      if (response.ok) {
        // Optionally, you can redirect or perform other actions after successful deletion
        router.push('/');
      } else {
        console.error('Error deleting recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  console.log(recipe);
  console.log(recipe.recipe.ingredients)


////chat integration
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
      
      setResponse(msg) 
      console.log(msg)
      console.log(chatHistory)
      console.log(typeof(chatHistory))
      console.log('Received message:', msg);
      setLoading(false)

    };  
    const onChangeHandler = (e) => {
      setInput(e.target.value)
    }
     const handleSendChat = (e) => {
      
      {
        debugger
        
        if (response!=''){setChatHistory((prevChatHistory) => [...prevChatHistory, [question,response]]);
          
        }
        let questiontosend="";
        setquestion(input)
          questiontosend=JSON.stringify({instruction:"give the answers to the following question by refering to the recipe and other resources. answer FORMAT: html, if any question is  not related to recipe give answer as '<p>Question seems to be not related </p>'",recipe:recipe.recipe,question:input})
          

         
        console.log('chat history----------------------------------', chatHistory)
        const chatHistory_str=prevChatHistory.join(",");
        //const question=JSON.stringify(recipe.recipe)+" give one tip on one step to make the recipe better.do'nt exceed 10 words"+"other than "+chatHistory_str
             setResponse('')
             setLoading(true)
             console.log("handle send chat -------", questiontosend)
             if (questiontosend!=''){
             socket.emit("input-change",questiontosend);}
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
  </main>
  <div>
  {recipenotfound ? (<div>Recipe not found</div>):(
  <div>
  {!isEditing ?(
    <div className='row'>
     <div className="col-md-6">
    <h1 >
      {editedTitle}
    </h1>
    <Card style={{ border: '2px solid #ccc', borderRadius: '10px', marginBottom:'10px'}}>
  <CardHeader>
    <h2>Ingredients</h2>
  </CardHeader>
  <CardBody>
    <ul>
      {editedIngredients.map((ingredient, index) => (
        <li
          key={index}
        >
          {ingredient}
        </li>
      ))}
    </ul>
  </CardBody>
</Card>

<Card style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
  <CardHeader>
    <h2>Method</h2>
  </CardHeader>
  <CardBody>
    <ul>
      {editedSteps.map((step, index) => (
        <li
          key={index}
        >
          {step}
        </li>
      ))}
    </ul>
  </CardBody>
</Card>
</div>
<div className="col-md-6">
      <Card style={{ height: 'auto', backgroundColor:'ButtonShadow' }}>
          <div className={styles.chatHistory}>
            <div>
              {((chatHistory.length !== 0)) ? (<div>{chatHistory.map((msg, index) => (
              <div key={index} className={styles.chatMessage} style={{height:'auto'}}>
                <div style={{border:'2px solid #ccc',borderRadius: '10px', height: 'auto',marginRight:'20px'}} > {msg[0]}</div>
                <p>response:</p>
                <div dangerouslySetInnerHTML={{ __html: msg[1] }}  style={{border:'2px solid #ccc',borderRadius: '20px', height: 'auto', marginLeft:'10px'}} />
              </div>))
            }
            </div>)
            :(<div></div>)
            }
            </div>
            {loading ?(
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            ):(<div  className={styles.chatMessage} style={{height:'auto'}}>
                  <div  style={{border:'2px solid #ccc',borderRadius: '10px', height: 'auto', marginRight:'20px'}}>
                      <h6 style={{marginTop:'10px'}}> Question: {question}</h6>
                  </div>
                  <div style={{border:'2px solid #ccc',borderRadius: '20px', height: 'auto', marginLeft:'10px'}}>
                      <div dangerouslySetInnerHTML={{ __html: response }}  style={{marginTop:'10px'}} />
                  </div>
               </div>)
            }

          </div>
        </Card>
        <Card style={{ border: '2px solid #ccc', borderRadius: '10px' ,marginTop:'10px'}}>
        <div className={styles.chatInput}>
              <input 
                type="text"
                placeholder="Ask questions about the recipe"
                value={input}
                onChange={onChangeHandler}
                style={{height:'auto',width:'90%'}}
              />
              <button type="button" onClick={handleSendChat} style={{height:'auto',width:'10%',}}>
                Ask
              </button>
            </div>
      
      </Card>
    </div>
  </div>
  ):(
  <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail" >
        <Form.Label>Recipe Title:</Form.Label>
        <Form.Control type="text" placeholder="Enter recipe name"  onChange={handleTitleChange} value={editedTitle}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label> Ingredients:</Form.Label>
        {editedIngredients.map((ingredient, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientsChange(index, e.target.value)}
              className="mr-2"
            />
            {index > 0 && (
              <Button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
          <Button type="button" onClick={handleAddIngredient}>
          Add ingredients
        </Button>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label> Steps:</Form.Label>
        {editedSteps.map((step, index) => (
          <div key={index} className="d-flex mb-2" >
            <Form.Control
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="mr-2"
            />
            {index > 0 && (
              <Button type="button" onClick={() => handleRemoveSteps(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
         <Button type="button" onClick={handleAddSteps}>
          Add steps
        </Button>
      </Form.Group>
    </Form>
  )}
{isEditing ? (
      <Button onClick={handleSaveClick}>Save</Button>
       
  ) : (
    <Button onClick={handleEditClick}>Edit</Button>
  )}
  <Button style={{ marginLeft: '10px' }} onClick={handleDelete}>
    Delete Recipe
  </Button>
</div>
  )};
  </div>
  </div>
  );
  };
export async function getStaticPaths() {
  const paths = await getAllRecipeIds();
  debugger
  console.log('paths ' ,paths,typeof(paths))
  return {
    paths,
    fallback:false
  };
}
export async function getStaticProps({ params }) {
  const recipe = await getRecipeData(params.id);

  return {
    props: {
      recipe,
    },
  };
}
