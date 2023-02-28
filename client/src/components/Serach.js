

import { InputBase } from '@mui/material'
import React from 'react'
import axios from 'axios' 
const Serach = ({users, setUsers,setUserList}) => {


  let old = localStorage.getItem('data')

const userData = JSON.parse(old)

  const searchInput = async(e)=>{
    const token = userData.token
  setUsers(e.target.value)
   if(users){
   try {
    let res = await axios.get(`http://localhost:5000/api/v1/auth/search/?name=${users}`,{
      headers:{
        authorization: `Bearer ${token}`
      }
    })
     
    console.log(res,"yyyyyyyyy")
     setUserList(res)
   
   } catch (error) {
    console.log(error)
   }

   }

   }

 
  return (
    <>
   <InputBase
     value={users}
     onChange={searchInput} 
     inputProps={{ style: { fontFamily: 'Arial', color: 'white'}}}
   sx={{pl:"20px"}} placeholder='Search or start new chat'/>
    </>
  )
}

export default Serach
