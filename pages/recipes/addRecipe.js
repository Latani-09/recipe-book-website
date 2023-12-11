import Head from 'next/head';

import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const addRecipe =() => {
  const router = useRouter();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']); // Initial ingredient input
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

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
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
        <link rel="icon" href="/pngegg.ico" />
      </Head>
      <main>
      <h1 className={styles.title}>
           Moms' diary
      </h1>
        <p className={styles.description}>
         Save your recipes here!
        </p>
        <div>
        <form onSubmit={handleSubmit}>
      <label>
        Recipe Title:
        <input type="text" value={recipeTitle} onChange={handleTitleChange} />
      </label>

      <label>
        Ingredients:
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </label>

      <button type="submit">Submit Recipe</button>
    </form>
    </div>
    </main>
    </div>

  );
};
export default addRecipe;
