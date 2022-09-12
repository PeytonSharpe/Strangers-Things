import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
      <h1>Welcome to Stranger's Things!</h1>
      <button>
        <Link to='/posts/create-post'>Add a Post</Link>
      </button>
    </div>
  )
}

export default Home;