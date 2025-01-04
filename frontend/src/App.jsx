import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateMangas from './pages/CreateMangas';
import ShowMangas from './pages/ShowMangas';
import DeleteMangas from './pages/DeleteMangas';
import EditMangas from './pages/EditMangas';

export default function App(){
  return (
    <>
      <Routes>
        <Route path = '/' element={< Home /> } />
        <Route path = '/mangas/create' element={< CreateMangas />} />
        <Route path = '/mangas/details/:id' element={< ShowMangas />} />
        <Route path = '/mangas/edit/:id' element={< EditMangas />} />
        <Route path = '/mangas/delete/:id' element={< DeleteMangas />} />
      </Routes>
    </>
  )
}



