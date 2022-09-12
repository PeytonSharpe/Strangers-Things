import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createMessage, deletePost } from '../api';

const Posts = ( props ) => {
  const {posts, token} = props
  const [searchTerm, setSearchTerm] = useState('');

  async function removePost(token, _id) {
    await deletePost(token, _id).then(()=> {
      window.location.reload();
    })
  }


  const allPosts = () => {
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    return (
      <div id='outer div element'>
      {
        postsToDisplay.map((post) => {
          const {description, location, price, title, _id, isAuthor } = post;
          return (
            <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              {
                isAuthor ? (
                  <>
                    <button><Link to={`/posts/edit-post/${_id}`}>Edit</Link></button>
                    <button onClick={(event) => {event.preventDefault(); removePost(token, _id);
                  }}>Delete</button>


                  </>
                ) : (
                  <Link to={`/posts/${_id}`}>View</Link>
                  
                )
              }
            </div>
          )
        })
      }
    </div>
    )
    
  }




  function postMatches(post, text) {
    const {title, description} = post;
    return (title.toLowerCase().includes(text.toLowerCase()) || description.toLowerCase().includes(text.toLowerCase())) 
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));

  return (
    <div className='postMain'>
      <div className="postAndSearch">
        <h1 className='postHeader'>Posts</h1>
        <form onSubmit = {(event)=> {
          event.preventDefault();
          searchPost(searchTerm)
        }}>
        <input className='postSearchBar'
        type='text'
        placeholder='search'
        onChange = {(event) => setSearchTerm(event.target.value)}
        ></input>
        <button type ='submit' className="spacing" >Search</button><button className="createPostButton spacing">
            <Link to='/posts/create-post'>Add New Post</Link>
        </button>
        </form>
    </div>
    {allPosts()}
    </div>
  )
}

export default Posts;