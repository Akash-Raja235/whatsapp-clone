

import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import bg from '../assets/chat-app-asset/bg-image.jpg'
import { Box, Button, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
  <Navigation/>

   <Stack>
   <Box>
   <img src={bg} alt="photo" style={{position:"relative" ,zIndex:"2",width:"100%" }}/>
   </Box>
   <Box>
    <Typography sx={{position:"absolute",zIndex:"5",ml:"150px", mt:"-800px",fontFamily:"cursive" }} variant="h2"> Connect All people Together </Typography>
   </Box>
   <Box>
    <Button component={NavLink} to='/signup' sx={{position:"absolute",zIndex:"5",ml:"150px", mt:"-500px" ,fontSize:"25px", textDecoration:"none"}} variant='contained'> get started</Button>
   </Box>
   </Stack>
    <Footer/>
    </>
  )
}

export default Home
