

import { Stack, Typography } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <>
     <Stack justifyContent='center' alignItems="center" sx={{m:50, border:"1px solid gray"}}>
        <Typography sx={{color:"red"}} variant='h2'> 404</Typography>
        <Typography sx={{color:"red"}} variant='h2'> Page not found </Typography>
        <Typography sx={{color:"gray"}} variant='h2'> Register for better experience</Typography>

     </Stack>
    </>
  )
}

export default ErrorPage
