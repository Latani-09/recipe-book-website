import { useRouter } from 'next/router';
import { getAllRecipeIds,getRecipeData } from '../api/recipes.js';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { Navbar,Nav,OverlayTrigger,Container,Card, CardBody, CardHeader, Button } from 'react-bootstrap';
export default function  recipe({recipe}) {
  const router = useRouter();
  const title=recipe.recipe.name;
  const steps=recipe.recipe.method;
  const ingredients=recipe.recipe.ingredients;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSteps, setEditedSteps] = useState(steps);
  const [editedIngredients,setEditedIngredients]=useState(ingredients)
  console.log('before edit',editedIngredients,editedSteps)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async() => {
    setIsEditing(false);
    const formData={
      recipe:{
      "id":recipe.recipe.id,
      "name":editedTitle,
      "ingredients":editedIngredients,
      "method":editedSteps}
  }
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
  if (!recipe.recipe) {
    return (
      <div className={styles.container}>
      <Head>
      <title>Recipe book</title>
     <link rel="icon" href="/pngegg.ico" />
      </Head>
      <h1 className={styles.title}>
          Moms' diary
      </h1>
      <p className={styles.description}>
      Save your recipes here!
      </p>
      <div>Recipe not found</div>;
      </div>);
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
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand 
        href="/"><h1 style={{  color:'mint', fontStyle:'oblique'}}>Mom's recipe</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/addRecipe">Add Recipe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </main>
  <div>
    
    <h1 contentEditable={isEditing} onBlur={handleTitleChange}>
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
          contentEditable={isEditing}
          onBlur={(e) => handleIngredientsChange(index, e.target.textContent)}
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
          contentEditable={isEditing}
          onBlur={(e) => handleStepChange(index, e.target.textContent)}
        >
          {step}
        </li>
      ))}
    </ul>
  </CardBody>
</Card>
  {isEditing ? (
      <Button onClick={handleSaveClick}>Save</Button>
       
  ) : (
    <Button onClick={handleEditClick}>Edit</Button>
  )}
  <Button style={{ marginLeft: '10px' }} onClick={handleDelete}>
    Delete Recipe
  </Button>
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
