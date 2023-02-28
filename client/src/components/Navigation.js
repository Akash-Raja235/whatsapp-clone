
import React from 'react'
import {AppBar, Stack, Toolbar,Typography} from '@mui/material'
import { NavLink } from 'react-router-dom'
const Navigation = () => {


  return (
    <AppBar>
        <Toolbar>
           <Stack direction='row' justifyContent="center" alignItems='center' spacing={4}>
           
         
                
               
               <Typography color="white" component={NavLink} to="/" sx={{ textDecoration:"none" ,'&:hover':{color:"pink",cursor:"pointer",  }}} variant='h5'>home</Typography>
                <Typography color="white" component={NavLink} to="/login" sx={{ textDecoration:"none" ,'&:hover':{color:"pink",cursor:"pointer"}}} variant='h5'>Login</Typography>
                <Typography color="white" component={NavLink} to="/signup" sx={{ textDecoration:"none" ,'&:hover':{color:"pink",cursor:"pointer"}}} variant='h5'>SignUp</Typography>
            

              
        
           </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navigation
