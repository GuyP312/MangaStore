import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowMangas = () => {
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <div>ShowMangas</div>
  )
}

export default ShowMangas