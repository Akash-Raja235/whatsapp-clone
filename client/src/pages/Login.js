

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {Grid,TextField, Button,Box,Stack,Typography, Alert} from '@mui/material'
import Navigation from '../components/Navigation'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios'

const Login = () => {


  const [value, setValue] = useState()

  const [input, setInput] = useState([])
  const navigate = useNavigate()
   const [errorMessage, setErrorMessage] = useState({
    message:"",
    type:"",
    status:false
   })

console.log(value,"jiiii")
  
  const eventHandler = async(e)=>{
    e.preventDefault()
   
    if(!value){
      
     setErrorMessage({
      message:"All field are required",
      type:"error",
      status:true
     })

    }else{
      try {
         // api call 
          
         const {data} = await axios.post('http://localhost:5000/api/v1/auth/login',{phoneNo:value})
       

         console.log(data,'ppp')
         setInput(data.user)
        localStorage.setItem('data', JSON.stringify(data))
      
      
         navigate('/chat')
      } catch (error) {
        console.log(error)
      }

    }

  }
  return (

    <>
    <Navigation/>
    <Box  sx={{width:"500px",justifyContent:'center', alignItem:'center', border:"1px solid lightgray" ,ml:"500px", mt:"100px"}}>
    <Stack spacing={2} sx={{p:2}} >
     {errorMessage.status && <Alert severity={errorMessage.type}>{errorMessage.message}</Alert>} 
        <Typography variant='h5'>Login</Typography>
       
        <PhoneInput
        defaultCountry='IN'
       placeholder="Enter phone number"
       value={value}
        onChange={setValue}
        />
           
            <Button onClick={eventHandler} type="submit" variant="contained">
              Login
            </Button>
       
          
          <Button component={NavLink} to="/signup" color="secondary">
            Back To Sign up
          </Button>
    </Stack>
    </Box>
    </>
  )
}

export default Login
