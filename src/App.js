import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Box } from '@mui/material'
import axios from 'axios'
import Listimages from "./components/Listimages";
import Labelimage from "./components/Labelimage";
import CreateImage from "./components/CreateImage";
import Login from "./components/Login";

import "./global.css"

function App() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    axios
      .get('/api/images')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log('Error from Listimages');
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedLabeller')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedLabeller')
    setUser(null)
  }

  return (
    <Box sx={{border: '5px solid green'}}>
      <Router>
        <div>
        <span><Link to='/'>Alkuun</Link> | </span>
          {user 
            ? <span>{user.username} <button onClick={logout}>Kirjaudu ulos</button></span>
            : <Link to="/login">Kirjaudu</Link>
          }
        </div>
        <div>
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path='/create-image' element={<CreateImage />} />
            <Route path='/label-image/:id' element={<Labelimage images={images} />} />
            <Route path="/" element={<Listimages user={user} images={images} />} />
          </Routes>
        </div>
      </Router>
    </Box>
  );
}

export default App;
