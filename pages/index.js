import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { getAllRecipes } from './api/recipes';

export default function Home({recipes}) {
  const [searchItem, setSearchItem] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)


  const handleInputChange = (e) => { 
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
  crossorigin="anonymous"
/>
        <link rel="icon" href="/pngegg.ico" />
      </Head>
<main>
      <h1 className={styles.title}>
           Moms' diary
      </h1>
        <p className={styles.description}>
         Save your recipes here!
        </p>
        <button ><Link href={"./recipes/addRecipe/"}>Add Recipe</Link>
</button>
        
        <div>      
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
    </div>
<div className="page-padding">
  <div className="page-content">
    <div className="container">
      <div className="row">
        {filteredRecipes.map((name, index) => (
          <div key={name[1]} class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
            <div className="product-layout product-grid">
              <div class="product-thumb" 
              style={{height:"250px",
                      backgroundImage: `url(${name[2]})`,
                      backgroundSize:  'cover',
                     }}>
                   
                <div id={`product${index}`} class="carousel slide" data-ride="carousel" data-interval="false">
                  <div class="carousel-inner">
                    <div class="item active" style={{
                      minHeight:"100px",
      
                    }}>
                      <Link href={"/recipes/" + name[1]}>
                      <img
                        className="img-fluid"
                        src={name[2]?? './pics/food.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = './pics/briyani.jpg'; }}
                          style={{
                          hover:{opacity:0.7},
                          alignSelf:{overflowPosition:0.2
                        },
                        backgroundColor: 'transparent'
                          }}
                        alt={name[0]}
                      />
                      </Link>
                    </div>
                    <div class="button-group"></div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="caption" style={{position: "absolute", bottom: 0, marginBottom: '3px' ,backgroundColor:"white"}}>
                <h2 id={`product-caption-${index}`}>{name[0]}</h2>
            </div>
          </div>
        ))}
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
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
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