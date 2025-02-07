import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const EditMangas = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [picture, setPicture] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/mangas/${id}`)
    .then((res)=>{ //set old value so user can see the value when they are about to edit
      setTitle(res.data.data.title);
      setAuthor(res.data.data.author);
      setPublishYear(res.data.data.publishYear);
      setDescription(res.data.data.description);
      setRating(res.data.data.rating);
      setPicture(res.data.data.picture); 
      setLoading(false);
    })
   .catch((err)=>{
     setLoading(false);
     console.log(err);
    })},[]);
  const handleEditManga = () =>{
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    formData.append('description', description);
    formData.append('rating', rating);
    formData.append('picture', picture);
    setLoading(true);
    axios.put(`http://localhost:5555/mangas/${id}`, formData) //sent post request to backend therefore update to mongoDB
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Manga editted successfully', { variant:'success' });
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
      <h1 className = 'text-3xl my-4'>Edit Manga</h1>
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
        <div className = 'my-4'>
          <label className = 'text-xl mr-4 text-gray-500'>Want to Change the Picture?</label>
          <input type ='file' accept='.png, .jpg, .jpeg' name = "picture" onChange={(e)=>setPicture(e.target.files[0])} className = 'border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className = 'p-2 bg-sky-300 m-8' onClick = {handleEditManga}>Save</button>
      </div>
    </div>
  )
}

export default EditMangas