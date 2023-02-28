

import React, { useRef, useState } from 'react'
import { NavLink, parsePath } from 'react-router-dom'
import {Grid,TextField, Button,Box,Stack,Typography, Avatar} from '@mui/material'
import Navigation from '../components/Navigation'


const OtpVerify = () => {
  return (
    <>
   <Navigation/>

   <Box  sx={{width:"500px",justifyContent:'center', alignItems:"center", border:"1px solid lightgray" ,ml:"500px", mt:"100px"}}>
    <Stack spacing={2} sx={{p:2}} >
        <Typography variant='h5'>OTP verify</Typography>
       

        
        <TextField
           
              name="phoneNo"
              variant="outlined"
              label="Enter your Otp"
              type="number"
              />
           
            <Button type="submit" variant="contained">
              send
            </Button>
       
            
    </Stack>
    </Box>
    
   </>
  )
}

export default OtpVerify
