

import React, { useRef, useState } from 'react'
import { NavLink, parsePath, useNavigate } from 'react-router-dom'
import {Grid,TextField, Button,Box,Stack,Typography, Avatar, Alert} from '@mui/material'
import Navigation from '../components/Navigation'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import axios from 'axios'

const SignUp = () => {



     const [imagePath , setImagePath] = useState('')
     const [value, setValue] = useState()

     const [input, setinput] = useState('')
     const[msg, setMsg] = useState(false)

     const imageHandler =(e)=>{
      const file = e.target.files[0];
      if(file.size >= 1048576){
        return alert("Max file size is 1mb")
      }else{
        setImagePath(file)
      }
        
    }

   const inputHandler = (e)=>{
  
    setinput(e.target.value)
   }
    
   const uploadImage = async(image)=>{

     const data = new FormData()
     data.append('file',image)
     data.append('upload_preset','ajewrc3z')
     try {
      
      let res = await axios.post('https://api.cloudinary.com/v1_1/dx1gkgnlb/image/upload', data)
       
        const url = res.data.secure_url
      return url
     } catch (error) {
      console.log(error)
     }
    
    
    
    }
  
   const nagivate = useNavigate()
   const sendHandler = async(e)=>{

    e.preventDefault()
    if(!imagePath){
      return alert("please upload valid profile picture")
    }
 

     try {
      const url =  await uploadImage(imagePath)
      console.log(url)
      // calling api

       const response = await axios.post('http://localhost:5000/api/v1/auth/signup',{
        name:input,
        picture:url,
        phoneNo:value
       })
         
        if(response.status ===201){
          nagivate('/login')
        } 

     } catch (error) {
      console.log(error)
     }

   }
   console.log(value)
  return (
   <>
   <Navigation/>

   <Box component='form' encType="multipart/form-data" sx={{width:"500px",justifyContent:'center', alignItems:"center", border:"1px solid lightgray" ,ml:"500px", mt:"100px"}}>
    <Stack spacing={2} sx={{p:2}} >
        <Typography variant='h5'>SignUp</Typography>
        
        {value && isValidPhoneNumber(value) & value && formatPhoneNumber(value)  ? "": 
        <Alert severity='error'>please enter valid number</Alert>
      } 
        
          <Avatar src={imagePath? URL.createObjectURL(imagePath):""} sx={{ width: "100px", height: "100px"}}/>
           <input  onChange={imageHandler} type="file" accept='image/*' />  
          
        <TextField
           
           value={input}
           onChange={inputHandler}
           variant="outlined"
           label="name"
           type="text"
         />
       
           <PhoneInput
            defaultCountry='IN'
            
            placeholder="Enter phone number"
            value={value}
             onChange={setValue}
             />
           
            <Button onClick={sendHandler} type="submit" variant="contained">
              send
            </Button>
       
            <Button component={NavLink} to="/login" color="secondary">
            Back To Login
          </Button>
    </Stack>
    </Box>
    
   </>
  )
}

export default SignUp
