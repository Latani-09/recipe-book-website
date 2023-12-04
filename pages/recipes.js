import fs from 'fs/promises';
import path from 'path';

export async function getRecipeData(id) {

  const recipe = recipesData.recipes.find(recipe => recipe.id === id);

  return {
    recipe,
  };
}

export async function getAllPostIds() {
  // Read the JSON file using fs
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const recipesData = JSON.parse(jsonData);

  // Now, `recipesData` is the parsed JavaScript object
  const recipeIds = recipesData.recipes.map(recipe => String(recipe.id));


  return   recipeIds.map((id) => {
    return {
      params: {
        id: id,
      },
    };
  });
}
