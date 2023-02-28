

import { Grid, Typography,Stack, IconButton } from '@mui/material'
import React from 'react'
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const Videochat = () => {
  return (
   <>
   <Grid container direction='column' >
    <Grid item flexGrow = {0.9} sx={{border:"1px solid red", bgcolor:"#343835"}} direction='column' >
        <Stack direction ='row' justifyContent='space-evenly'>
            <Typography  sx={{width:"500px" , height:"800px"}} variant='body2'>video 1</Typography>
            <Typography  sx={{width:"500px" , height:"800px"}}  variant='body2'>video 1</Typography>
        </Stack>
       
    </Grid>
    <Grid item flexGrow={0.1} direction='column'sx={{bgcolor:"#878787",height:"112fpx"}} >
        <Stack justifyContent='center' alignItems='center' direction='row' spacing={5} >
            <IconButton>
             <MicRoundedIcon sx={{width:"50px", height:"50px"}}/>
              
            </IconButton>
            <IconButton>
            <VideocamRoundedIcon  sx={{width:"50px", height:"50px"}}/>
            </IconButton>
            <IconButton>
            <CancelRoundedIcon  sx={{width:"50px", height:"50px"}} />
            </IconButton>
        </Stack>
       
        
    </Grid>
   </Grid>
   </>
  )
}

export default Videochat
