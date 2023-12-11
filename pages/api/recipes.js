import { promises as fs } from 'fs';
import path from 'path';

export async function getRecipeData(id) {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData =  await fs.readFile(filePath, 'utf-8');
  const recipesData = JSON.parse(jsonData);
  const recipe = await recipesData.recipes.find(recipe => recipe.id === parseInt(id,10));

  return {
    recipe,
  };
}
/*
export async function deleteRecipe(id) {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData =  await fs.readFile(filePath, 'utf-8');
  const recipesData = JSON.parse(jsonData);
  // Use filter to create a new array without the recipe to delete
  recipesData.recipes = await recipesData.recipes.filter(recipe => recipe.id !== id);

  const updatedJsonData = JSON.stringify(recipesData, null, 2);
  await fs.writeFile(filePath, updatedJsonData, 'utf-8');
  return true;
}
*/
export async function getAllRecipeIds() {
  // Read the JSON file using fs
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData =  await fs.readFile(filePath, 'utf-8');
  const recipesData = JSON.parse(jsonData);

  // Now, `recipesData` is the parsed JavaScript object
  const recipeIds =  recipesData.recipes.map(recipe => String(recipe.id));
  const resolvedrecipeids=await Promise.all(recipeIds);
  return   resolvedrecipeids.map((id) => {
    return {
      params: {
        id: id,
      },
    };
  });
}

export async function getAllRecipes() {
  // Read the JSON file using fs
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData =  await fs.readFile(filePath, 'utf-8');
  const recipesData = JSON.parse(jsonData);

  // Now, `recipesData` is the parsed JavaScript object
  const recipes =  recipesData.recipes.map(recipe =>[String(recipe.name),String(recipe.id),(recipe.img)]);
  const resolvedrecipe=await Promise.all(recipes);
  return   resolvedrecipe ;
}

export default async function handler(req, res) {
  console.log('method isss',req.method)
  if (req.method === 'POST') {
    console.log('body',req.body, typeof(req.body));
  try {
      const {recipe: recipeEditData } =req.body;
      debugger
      console.log('recipe to edit',recipeEditData)
      const filePath = path.join(process.cwd(), 'data', 'recipes.json');
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const recipesData = JSON.parse(jsonData);
      const recipe_duplicate = recipesData.recipes.find((recipe) => recipe.name === recipeEditData.name);
      if (!recipe_duplicate){
      const no_recipes=recipesData.recipes.length
      recipeEditData.id=no_recipes+1   
      console.log(no_recipes)
      // Update the recipe
      recipesData.recipes[no_recipes] = recipeEditData;

      await fs.writeFile(filePath, JSON.stringify(recipesData, null, 2), 'utf-8');

      res.status(200).json({ success: true });}
      else {res.status(500).json({ error:"recipe  already found with submitted name." });}
      
  } catch (error) {
    
      console.error('Error processing POST request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
  } 
  else if (req.method=='DELETE'){
    const { id } = req.body;
    console.log('recipe id sent to api',req.body);
      const filePath = path.join(process.cwd(), 'data', 'recipes.json');
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const recipesData = JSON.parse(jsonData);
      const idToDelete = id; // Assuming id is a string, convert it to an integer
      const recipeToDelete = recipesData.recipes.find((recipe) => recipe.id === id);
      console.log('recipe to delete',recipeToDelete);
      if (!recipeToDelete) {
        // Recipe not found, handle accordingly (e.g., return an error response)
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }
      
      const updatedRecipes = recipesData.recipes.filter((recipe) => recipe.id !== idToDelete);
      
      recipesData.recipes = updatedRecipes;
      
      await fs.writeFile(filePath, JSON.stringify(recipesData, null, 2), 'utf-8');
      
      res.status(200).json({ success: true });

    
  }
  else if (req.method === 'PUT') {
    console.log('body',req.body, typeof(req.body));
    try {
        const {recipe: recipeEditData } =req.body;
        debugger
        console.log('recipe to edit',recipeEditData)
        const filePath = path.join(process.cwd(), 'data', 'recipes.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const recipesData = JSON.parse(jsonData);

        // Find the index of the recipe to update
        const indexToUpdate = recipesData.recipes.findIndex((recipe) => recipe.id === recipeEditData.id);

        if (indexToUpdate === -1) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }

        // Update the recipe
        recipesData.recipes[indexToUpdate] = recipeEditData;

        await fs.writeFile(filePath, JSON.stringify(recipesData, null, 2), 'utf-8');
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
