import { useRouter } from 'next/router';
import { getAllPostIds,getRecipeData } from '../recipes';

export default function  recipe({recipe}) {

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Method</h2>
      <ol>
        {recipe.method.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};
export async function getStaticPaths() {
  const paths = getAllPostIds();
  debugger
  console.log(paths)
  return {
    paths,
    fallback:false
  };
}
export async function getStaticProps({ params }) {
  const recipe = getRecipeData(params.id);
  return {
    props: {
      recipe,
    },
  };
}
