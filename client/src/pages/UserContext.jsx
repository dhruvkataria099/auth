import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react'

export const UserCon = createContext()

const UserContext = ({children}) => {

  const [toggle, settoggle] = useState(null);

  const switchToggle = async () => {
    const res = await axios.get('http://localhost:8080/current')
    
    settoggle(res.data.status)
  }

  const obj = {toggle,switchToggle}

  useEffect(() => {
    
    switchToggle()
    
  }, []);

  return (
    <UserCon.Provider value={obj} >
      {children}
    </UserCon.Provider>
  )
}

export default UserContext
