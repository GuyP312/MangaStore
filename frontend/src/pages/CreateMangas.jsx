import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const createMangas = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveManga = () =>{
    const data = {
      title,
      author,
      publishYear,
      description,
      rating
    }
    setLoading(true);
    axios.post('http://localhost:5555/mangas', data) //sent post request to backend therefore update mongoDB
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Manga created successfully', { variant:'success' });
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      //alert('Failed to create manga, please check console');
      enqueueSnackbar('Error', { variant:'error' });
      console.log(err);
    })
  };
  return (

    <div className='p-4'>
      <BackButton />
      <h1 className = 'text-3xl my-4'>Create Manga</h1>
      {loading ? <Spinner /> : ''}
      <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Title</label>
          <input type ='text' value = {title} onChange={(e)=>setTitle(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Author</label>
          <input type ='text' value = {author} onChange={(e)=>setAuthor(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type ='text' value = {publishYear} onChange={(e)=>setPublishYear(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Description</label>
          <textarea value = {description} onChange={(e)=>setDescription(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Rating</label>
          <input type ='number' min="0" max="5" step="1" value = {rating} onChange={(e)=>setRating(e.target.value)} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className = 'p-2 bg-sky-300 m-8' onClick = {handleSaveManga}>Save</button>
      </div>
    </div>
  )
}

export default createMangas