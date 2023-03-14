import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Listimages from "./components/Listimages";
import Labelimage from "./components/Labelimage";
import CreateImage from "./components/CreateImage";
import { useEffect, useState } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null)

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
            <Route path='/label-image/:id' element={<Labelimage />} />
            <Route exact path="/" element={<Listimages user={user} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
