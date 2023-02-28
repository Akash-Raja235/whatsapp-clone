

import React, { useState } from 'react'
import {Avatar,  Drawer, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
const UserProfile = ({showmeSate,setShowmeState}) => {

  let old = localStorage.getItem('data')

  const userData = JSON.parse(old)


  const arr = ['setting', "user", "logout"]

   const nagivate = useNavigate()
  const handler=(m)=>{
    if(m ==='logout'){
   localStorage.removeItem('user_info')
   localStorage.removeItem('data')
   nagivate('/')
    }

 
  }
  return (
      
   <>
    <Drawer
        anchor="right"
        open={showmeSate}
        
        onClose={() => setShowmeState(false)}
        
      >
        <Avatar sx={{ m: 2 }} src={userData.user.picture?userData.user.picture:""} />

        {arr.map((m,i,a)=>{
          return(
            <Typography onClick={()=>handler(m)} key={i} sx={{ p: 2 ,mr:10, cursor:"pointer"}} variant="subtitle">
            {m}
          </Typography>
          )
        })}
        
        {/* <Typography sx={{ pl: 2, pr: 2 }} variant="subtitle">
         log out
        </Typography> */}
      </Drawer>
   </>
    
  )
}

export default UserProfile
