import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import axios from 'axios'
import Listimages from "./components/Listimages";
import Labelimage from "./components/Labelimage";
import CreateImage from "./components/CreateImage";
import Login from "./components/Login";

function App() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    axios
      // .get('http://localhost:8082/api/images')
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
    <div>
      <Router>
        <div>
        <span><Link to='/'>Home</Link> | </span>
          {user 
            ? <span>{user.username} <button onClick={logout}>logout</button></span>
            : <Link to="/login">login</Link>
          }
        </div>
        <div>
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path='/create-image' element={<CreateImage />} />
            <Route path='/label-image/:id' element={<Labelimage images={images} />} />
            <Route exact path="/" element={<Listimages user={user} images={images} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
