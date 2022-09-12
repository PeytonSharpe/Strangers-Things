import React from 'react';
import { createPost } from '../api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreatePost = ({ token, fetchPosts, navigate }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newWillDeliver, setNewWillDeliver] = useState(false);
  const { postID } = useParams();
  
  async function addPost() {
  const newPost = {
    
      token: token,
      title: newTitle,
      description: newDescription,
      price: newPrice,
      location: newLocation,
      willDeliver: newWillDeliver,
      _id: postID
    }
    const results = await createPost(token, newPost)
    fetchPosts();
    navigate(`/posts`)
  }
  
  return (
    <form onSubmit={ (ev) => {
      ev.preventDefault();
      addPost();
      
    }}>
      <input 
        type='text'
        placeholder='title'
        onChange={(ev) => setNewTitle(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='description'
        onChange={(ev) => setNewDesc(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='location'
        onChange={(ev) => setNewLocation(ev.target.value)}
      />
      <input 
        type='text'
        placeholder='price'
        onChange={(ev) => setNewPrice(ev.target.value)}
      />
      <input 
        type='checkbox'
        checked={newWillDeliver}
        onChange={(ev) => setNewWillDeliver(ev.target.checked)}
      />
      <p>Will Deliver?</p>
      <button type='submit'>Submit Post</button>
    </form>
  )
}

export default CreatePost;