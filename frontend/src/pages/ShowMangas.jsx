import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import zerostar from '../assets/star0of5.png';
import onestar from '../assets/star1of5.png';
import twostar from '../assets/star2of5.png';
import threestar from '../assets/star3of5.png';
import fourstar from '../assets/star4of5.png';
import fivestar from '../assets/star5of5.png';

const ShowMangas = () => {
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  function showstar(num){
    if(num===0){
      return <img className = 'w-50 h-5' src={zerostar} alt='star' />
    }
    else if(num===1){
      return <img className = 'w-50 h-5' src={onestar} alt='star' />
    }
    else if(num===2){
      return <img className = 'w-50 h-5' src={twostar} alt='star' />
    }
    else if(num===3){
      return <img className = 'w-50 h-5' src={threestar} alt='star' />
    }
    else if(num===4){
      return <img className = 'w-50 h-5' src={fourstar} alt='star' />
    }
    else if(num===5){
      return <img className = 'w-50 h-5' src={fivestar} alt='star' />
    }
  }

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
      <h1 className = 'text-3xl my-4'>Detail of {manga.title}</h1>
      {loading ? (<Spinner />) : (
          <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Id</span>
              <span>{manga._id}</span>
            </div>
            <div className = 'my-4 flex items-center'>
              <span className = 'text-xl mr-4 text-gray-500'>Rating</span>
              {/*<span>{manga.rating}</span>*/}
              {showstar(manga.rating)}
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
            <div className = 'my-4'>
              <span className = 'text-xl mr-4 text-gray-500'>Description</span>
              <span>{manga.description}</span>
            </div>
          </div>
      )}
    </div>
  )
}

export default ShowMangas