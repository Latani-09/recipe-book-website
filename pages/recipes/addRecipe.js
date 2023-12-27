import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Navbar,Nav,Container,Form, Button } from 'react-bootstrap';
const addRecipe =() => {
  const router = useRouter();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']); // Initial ingredient input
  const [steps, setSteps] = useState(['']);
  const handleTitleChange = (e) => {
    setRecipeTitle(e.target.value);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  const handleAddSteps = () => {
    setSteps([...steps, '']);
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  
  const handleRemoveSteps= (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Process the form data (e.g., send it to the server)
    console.log('Recipe Title:', recipeTitle);
    console.log('Ingredients:', ingredients);
    const formData={
      recipe:{
      "id":20,
      "name":recipeTitle,
      "img":"",
      "ingredients":ingredients,
      "method":['']}
  }
    const response = await fetch(`http://localhost:3000/api/recipes`,{
      method:'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( formData) ,
    });
    console.log(response.data);
    if(response.ok){
      router.push('/')
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
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail" >
        <Form.Label>Recipe Title:</Form.Label>
        <Form.Control type="text" placeholder="Enter recipe name"  onChange={handleTitleChange} value={recipeTitle}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label> Ingredients:</Form.Label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
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
        {steps.map((step, index) => (
          <div key={index} className="d-flex mb-2" >
            <Form.Control
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="mr-2"
            />
            {index > 0 && (
              <Button type="button" onClick={() => handleRemoveStep(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
         <Button type="button" onClick={handleAddSteps}>
          Add steps
        </Button>
      </Form.Group>
      <Button type="submit" onClick={handleSubmit}
       style={{
        position:'right'
      }}>Submit Recipe</Button>
    </Form>

    </main>
    </div>
    );};
    
    

 

export default addRecipe;
