import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'; 
import Login from './Pages/login'
import Signup from './Pages/signup'
import ActiveUser from './Pages/activeUser';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/activeUser' element={<ActiveUser />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
