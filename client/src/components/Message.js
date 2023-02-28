

import { InputBase, Stack, Box, IconButton, Grid, Avatar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'
import axios from 'axios';

import { format } from 'timeago.js';
const socket = io.connect('http://localhost:5000')
var newArr = []


const Message = ({ textMsg, setTextMsg, setMessage, setMessageRecieved, shaveContactIds, shaveMessage }) => {


  let old = localStorage.getItem('data')

  const userData = JSON.parse(old)
  let token = userData.token
  const textHandler = (e) => {

    setTextMsg({ ...textMsg, [e.target.name]: e.target.value })

  }

  const SendMessagehandler = async () => {
    // sending message api

    try {
      const messageObj = {
        contactIds: shaveContactIds._id,
        sender: userData.user._id,
        text: textMsg.text
      }

      let res = await axios.post('http://localhost:5000/api/v1/message/create-message', messageObj, {

        headers: {
          authorization: `Bearer ${token}`
        }
      })

      document.getElementById("fileInputId").value = null;
      setTextMsg('')
      if (res.data) {
        let msg = res.data.textMesage.text
        socket.emit("send_message", { msg })
      }

   


    } catch (error) {
      console.log(error)
    }





  }






  return (
    <>

      <Grid item flexGrow={0.8} sx={{ bgcolor: "#0b1226" }}>

        <Box sx={{ position: "relative", zIndex: "888", height: "60vh", overflow: "auto" }}>
          <Stack>
            <Typography sx={{ textAlign: "center", color: "white" }} variant='body'>{new Date().toJSON().slice(0, 10).replace(/-/g, '/')}</Typography>
            {shaveMessage.map((msg) => {
              if (msg.sender !== userData.user._id) {


                return (
                  <>


                    <div key={msg._id} style={{ display: "flex", justifyContent: "flex-start" }}>
                      <Stack sx={{ bgcolor: "#475c5e", ml: "20px", borderRadius: "0px 5px 5px 15px", mt: 1 }}>
                        <Stack direction='row'>
                          <Typography sx={{ color: "white", p: "5px", }} variant='body'>{msg.text}</Typography>
                          <Typography sx={{ color: "white", pt: "15px", pr: "5px" }} variant='body'>{format(msg.createdAt)}</Typography>
                        </Stack>
                      </Stack>
                    </div>




                  
                  



                  </>
                )
              } else {
                return (
                  <>
                    <div key={msg._id} style={{ display: "flex", justifyContent: "end" }}>
                      <Stack direction='row' sx={{ bgcolor: "#37633c", width: "fit-content", mr: "30px", borderRadius: "1px 0px 15px 5px", mt: 1 }} >
                        <Typography sx={{ textAlign: "right", color: "white", p: "5px" }} variant='body'>{msg.text}</Typography>
                        <Typography sx={{ color: "white", pt: "15px", pr: "10px" }} variant='body'>{format(msg.createdAt)}</Typography>

                      </Stack></div>

                  </>
                )


              }

            })}



        </Stack>

        </Box>
        </Grid>

      {shaveContactIds._id && 
      <Stack direction='row' sx={{mt:15}}>
      <Box sx={{ border: "1px solid white", borderRadius: "20px", width: "100%", mr: 2, ml: 2, display: "flex" }} >
        <InputBase
          id='fileInputId'
          name="text" onChange={textHandler}
          inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
          sx={{ width: "100%", pl: "20px" }} placeholder='write your messages here................' />
        <IconButton onClick={SendMessagehandler} sx={{ color: "white" }}>
          <SendIcon />

        </IconButton>

      </Box>
    </Stack>
      }

    </>
  )

}
export default Message


export { newArr }