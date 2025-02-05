import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserCon } from "../pages/UserContext";
import { BASE_URL } from '../info';

const ProtectedFIle = () => {

  const nav = useNavigate()
  const { switchToggle } = useContext(UserCon);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        age: "",
      });
      const [arr, setarr] = useState([]);
      const [toggle, settoggle] = useState(false);
      const [gId, setGid] = useState(null);
    
      // const fetchData = async () => {
      //   try {
      //     const res = await axios.get(`${BASE_URL}/j`)
      //     console.log(res);
      //     setarr(res?.data?.data || [])
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    
      const handleChange = (e) => {
        try {
          const { id, value } = e.target
          setFormData({ ...formData, [id]: value })
    
        } catch (error) {
          console.log(error.message);
          
        }
      }
    
      const handleAdd = async () => {
        try {
          const res = await axios.post(`${BASE_URL}postdata`,formData)
          // fetchData()
          setFormData({
            username: "",
            email: "",
            age: "",
          })
        } catch (error) {
          console.error(error.message); 
        }
      }
      const handleDelete = async (index) => {
        try {
          const res = await axios.delete(`${BASE_URL}delete/${index}`,formData)
    
          // fetchData()
        } catch (error) {
          console.log(error.message);
        }
      }
    
      const handleUpdate = async () => {
        try {
          const res = await axios.put(`${BASE_URL}update/${gId}`,formData)
         
          settoggle(false)
          setFormData({
            username: "",
            email: "",
            age: "",
          })
          // fetchData()
        } catch (error) {
          console.log(error.message);
          
        }
      }
    
      const handleFormUpdate = (info) => {
        try {
          settoggle(true)
          setGid(info._id)
          setFormData(info)
        } catch (error) {
          console.log(error.message);
        }
      }
    
      const arrr = ["E","e",'-']
    
      // useEffect(()=> {
      //   fetchData()
      // },[])

      const handleLogout = async () => {
        try {
          const res = await axios.post(`${BASE_URL}logout`)
          if (res.data.success) {
            switchToggle()
            nav('/')
          }
          
        } catch (error) {
          console.log(error.message);
          
        }
      } 
    
      return (
        <>
        <div>
          <div className="flex flex-col justify-center items-center bg-blue-400 min-h-screen gap-3 ">
            <div className="flex flex-col " >
              <label htmlFor="">username:</label> 
              <input
                type="text"
                value={formData.username}
                id="username"
                onChange={(e) =>
                 handleChange(e)
                }
              />
            </div>
            <div className="flex flex-col " >
              <label htmlFor="">email:</label>
    
              <input
                type="text"
                value={formData.email}
                id="email"
                onChange={(e) => handleChange(e)
                }
              />
            </div>
            <div className="flex flex-col " >
              <label htmlFor="">age:</label>
              <input
                type="number"
                value={formData.age}
                id="age"
                onKeyDown={e =>  arrr.includes(e.key) && e.preventDefault()
                }
                onChange={(e) => 
                 handleChange(e)
                }
              />
            </div>
            {
              toggle ? (
                <button className="bg-yellow-200 py-2 px-3 rounded-md"  onClick={() => handleUpdate()} >update</button>
              ): (
                <button className="bg-yellow-200 py-2 px-3 rounded-md"  onClick={() => handleAdd()} >add</button>
              )
            }
          <button className="bg-yellow-200 py-2 px-3 rounded-md" onClick={() => handleLogout()}>logout</button>

            <div>
              {
                arr?.map(info => (
                  <div key={info._id} >
                    <p>{info.username}</p>
                    <p>{info.email}</p>
                    <p>{info.age}</p>
                    <button className="bg-yellow-200 py-2 px-3 mr-2 rounded-md" onClick={() => handleDelete(info._id)} >delete</button>
                    <button className="bg-yellow-200 py-2 px-3 rounded-md" onClick={() => handleFormUpdate(info) } >update</button>
                  </div>
                ))
              }
            </div>
              {/* <FileUploads formData={formData} /> */}
            </div>
            <div>
            </div>
          </div>
        </>
      );
    }

export default ProtectedFIle
