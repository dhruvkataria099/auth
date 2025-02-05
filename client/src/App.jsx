import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedFIle from "./prote/ProtectedFIle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import { UserCon } from './pages/UserContext';
import axios from 'axios';

function App() {

  const {toggle} = useContext(UserCon)
  console.log(toggle);
  
  axios.defaults.withCredentials = true

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        {
          toggle === null ? (
            <p>Loading...</p>
          ) : toggle ? (
            <Route path="/protectedPage" element={<ProtectedFIle />} />
          ): (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )
        }
        <Route path="/*" element={<p>404 page not found</p>} />
      </Routes>
    </Router>
    </>
  )
}
 

export default App;
