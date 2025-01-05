import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowMangas = () => {
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/mangas/${id}`)
    .then((res)=>{
      setManga(res.data.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  },[]);
  return (
    <div className = 'p-4'>
      <BackButton />
      <h1 className = 'text-3xl my-4'>Show manga</h1>
      {loading ? (<Spinner />) : (
          <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Id</span>
              <span>{manga._id}</span>
            </div>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Title</span>
              <span>{manga.title}</span>
            </div>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Author</span>
              <span>{manga.author}</span>
            </div>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{manga.publishYear}</span>
            </div>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(manga.createdAt).toString()}</span>
            </div>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Update Time</span>
              <span>{new Date(manga.updatedAt).toString()}</span>
            </div>
          </div>
      )}
    </div>
  )
}

export default ShowMangas