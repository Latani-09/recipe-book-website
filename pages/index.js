import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getAllRecipes } from './api/recipes'
import {  useState } from 'react'
import {Nav,Navbar,Container } from 'react-bootstrap';

export default function Home({recipes}) {
  
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
 
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
  <Navbar expand="lg" className="bg-body-tertiary mb-4  justify-content-between" >
  <Container className="d-flex flex-row align-items-start">
  <Navbar.Brand href="/" >
  <h1 style={{ color: 'green', fontStyle: 'oblique', fontSize: '3rem', marginBottom: '3' }}>
    Mom's recipe
  </h1>
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{  marginLeft: '100px',fontSize: '1.2rem' }}>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/addRecipe">Add Recipe</Nav.Link>
            <Nav.Link href="/chatintegration/chat">Ask ChatGPT</Nav.Link>
            <Nav.Link href="/">About app</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="page-padding">
  <div className="page-content">
    <div className="container">
      <div className="row">
        {filteredRecipes.map((recipe, index) => (
          <div key={recipe[1]} className="col-lg-2 col-md-6 col-sm-12 mb-4">
            <div className="product-layout product-grid">
            <Link href={`/recipes/${recipe[1]}`}>
              <div
                className="product-thumb"
                style={{
                  
                  height: '200px',
                  backgroundImage: `url(${recipe[2]  || './pics/food.png'})`,
                  backgroundSize: 'cover',
                }}
              >
              </div>
              </Link>
              <div className="button-group">
              </div>
              <div className="caption">
                <h5>{recipe[0]}</h5>
              </div>
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
/* const [input, setInput] = useState('')
 const [searchItem, setSearchItem] = useState('')
    const onChangeHandler = (e) => {
      setInput(e.target.value)
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
*/