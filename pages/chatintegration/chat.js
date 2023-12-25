import Head from 'next/head';

import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


const chat =() => {
    const [question, setQuestion] = useState('');
const text ="how to make idly?"
const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
const handleSubmit = async(e) => {
    e.preventDefault();

const response = await fetch(`http://localhost:3000/api/chatgpt`,{
      
      method:'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( text) ,
    });
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
        question:
        <input type="text" value={question} onChange={handleQuestionChange} />
      </label>
      <button type="submit">Ask assistance</button>
    </form>
    </div>
    </main>
    </div>
    );
}
export default chat;