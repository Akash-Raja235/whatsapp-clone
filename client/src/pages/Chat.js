
import { Avatar, Grid, Stack, Box, Typography, IconButton, Button } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import React, { useEffect, useState } from 'react'

import Serach from '../components/Serach';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import UserProfile from './UserProfile';
import Message from '../components/Message';
import axios from 'axios'
import io from 'socket.io-client'
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import Myprofile from './Myprofile'
import Videocall from '../components/Videocall';
import Voicecall from '../components/Voicecall';
const socket = io.connect('http://localhost:5000')

  const Chat = () => {

  const [showmeSate, setShowmeState] = useState(false)
  const [textMsg, setTextMsg] = useState({
    text:""
  })
  const [active, setActive] = useState(null)
  const [active1, setActive1] = useState(null)
  const [messageRecieved, setMessageRecieved] = useState()
  const [message, setMessage] = useState([])
  const [requestmsg, setRequestMsg] = useState("send request")
  const [people, setPeople] = useState(true)
  const [changeColor, setChaneColor] = useState("primary")
  const [users, setUsers] = useState('')
  const [userList, setUserList] = useState([])
  const [requestUser, setrequestUser] = useState([])
  const [requestUser1, setrequestUser1] = useState([])
  const [myfriendList, setMyfriendList] = useState([])
  const [notificationMessage, setnotificationMessage] = useState('')
  const [showColor, setShowColor] = useState("")
  const [AllUser, setAllUser] = useState([])
  const [AllFiends, setAllFriend] = useState([])
  const [filtered, setFiltered] = useState([])
  const [contactList, setContactList] = useState([])
  const [filterContact, setFilterContact] = useState([])
  const [shaveContactIds, setShaveConatctIds] = useState([])
  const [shaveContactIds2, setShaveConatctIds2] = useState([])

  const [shaveMessage, setShaveMessage] = useState([])
  const [shaveMessage2, setShaveMessage2] = useState([])

  const [refresh , SetRefresh] = useState(false)

  let old = localStorage.getItem('data')
  const userData = JSON.parse(old)

  const goToPeople = () => {

    setPeople(false)


  }

  const goToChat = () => {

    setPeople(!people)


  }


  const nagivate = useNavigate()
  let token = userData.token
  const senRequest = async () => {

    // socket.emit("send_request", { requestmsg })
    // setRequestMsg("waiting for acceptance..")
 
    const obj = {

      sender: userData.user._id,
      userId: requestUser1._id
    }
       
    try {

      let res = await axios.put('http://localhost:5000/api/v1/auth/send-friend-request', obj, {

        headers: {
          authorization: `Bearer ${token}`
        }
      }
      )

       if(res){
        socket.emit("send_notification", {msg:'waiting for request'} )
       }
     
    
    } catch (error) {
        if(error || error.message){
          socket.emit("send_notification2", {msg:'you already sent request'} )
        }
       
       
    }

  }


 // some codes 

   
    const eventHabdler = (e) => {
      setActive(e)
      setRequestMsg("send Request")
      setrequestUser(e)
    
    }
    
    const eventHabdler2 = (m) => {
      setrequestUser1(m)
      setActive1(m)
      setRequestMsg("send Request")
    }
  

    
   

  // getting all contacts
  useEffect(() => {
  
    const getAllContacts = async () => {

      try {
  
        const userId = userData.user._id
  
        let res = await axios.get(`http://localhost:5000/api/v1/contact/all-contacts/${userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
  
  
        setContactList(res.data)
  
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllContacts()

  }, [])


  




  const contactHander = (m)=>{
    setShaveConatctIds(m)
     setActive(m)
     setShaveConatctIds2(m)
     getAllChats(m._id)
  
    }
 
 
  // getting all chats
  const getAllChats = async(m)=>{
      
    try {

      let res = await axios.get(`http://localhost:5000/api/v1/message/${m}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      setShaveMessage(res.data)
    
      
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(()=>{


    if(shaveContactIds2._id){
    const callAgain  = async()=>{
      
      try {
  
        let res = await axios.get(`http://localhost:5000/api/v1/message/${shaveContactIds2._id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
  
        setShaveMessage(res.data)
        
      } catch (error) {
        console.log(error.message)
      }
    }
    callAgain()
  }

  },[messageRecieved])


  // useEffect(() => {

  //   socket.on("getRequest", (data) => {
  //     setnotificationMessage(data)



  //   })
  // }, [socket])

  useEffect(()=>{
 
    socket.on("message_recieved",(data)=>{
    console.log(data,"jiii")
    setMessageRecieved(data.msg)
    

  })
 },[socket,shaveMessage])

 useEffect(()=>{
 
  socket.on("notification_recieved",(data)=>{
  console.log(data,"notification get")
  setnotificationMessage(data.msg)
  

})
},[socket])

useEffect(()=>{
 
  socket.on("notification_recieved2",(data)=>{
  console.log(data,"alreadt")
  setnotificationMessage(data.msg)
  

})
},[])
useEffect(()=>{
 
  socket.on("reject_message2",(data)=>{
  console.log(data,"rejected")
  setnotificationMessage(data.msg)
  

})
},[])
useEffect(()=>{
 
  socket.on("accept_message2",(data)=>{
  console.log(data,"accepted")
  setnotificationMessage(data.msg)
  

})
},[])


  return (
    <>

      {people ?

        <Grid container >
          <Grid item flexGrow={0.2} sx={{ bgcolor: "#3b475c", height: "100%" }}>

            <Stack direction='row' sx={{ justifyContent: "center", bgcolor: "#508f7f", position: "static", zIndex: "999", alignItems: "center", width: "100%", border: "1px solid #5c6370" }}>
             
              <Myprofile/>
              <Typography sx={{ height: " 60px", width: "100%", pt: "20px", textAlign: "center" }} variant='h6'> {userData.user.name}</Typography>

              <Notification requestmsg={requestmsg} setRequestMsg={setRequestMsg} notificationMessage={notificationMessage} />
            </Stack>

            <Box sx={{ border: "1px solid white ", borderRadius: "20px", display: "flex", width: "70%", mt: "10px", mb: "10px", ml: "40px" }}>
              <Serach />
            </Box>

            <Stack direction='row' spacing={4} sx={{ m: 2 }} >

              <Button color={changeColor} sx={{ ml: 15 }} onClick={goToPeople} variant='contained'> People</Button>
              <Button color={changeColor} onClick={goToChat} variant='contained'>chat</Button>
            </Stack>

            <Box sx={{ position: "relative", zIndex: "888", height: "80vh", "width": "100%", "ov erflowY": "auto", "overflowX": "hidden" }}>




              {contactList.map((m) =>
                m.contactIds.map((e) => {
                  if (e._id !== userData.user._id) {
                    return (
                      <Box onClick={() => eventHabdler(e)} key={e._id} sx={{ backgroundColor: active === e && '#418c55', '&:hover': { bgcolor: "#475c5e", cursor: "pointer" } }} >

                        <Stack onClick={()=>contactHander(m)} sx={{ pl: 5 }}  >

                          <Stack direction='row' spacing={2} sx={{ p: 1 }} >
                            <Avatar sx={{ width: "50px", height: "50px" }} src={e.picture ? e.picture : ""} />
                            <Stack>

                              <Typography color='white' variant='h6'>{e.name}</Typography>
                              <Stack direction="row">
                                <DoneAllIcon color="primary" />
                                <Typography color="#d4d2d2" variant='body'>{"m.message"}</Typography>
                                <Typography sx={{ pl: "10px" }} variant='subtitle'>{"m.time"}</Typography>
                              </Stack>

                            </Stack>

                          </Stack>
                          <hr style={{ marginLeft: "60px", width: "100%", border: "1px solid #5c6370" }} />
                        </Stack>


                      </Box>
                    )

                  }

                })
              )
              }






            </Box>

          </Grid>

           

          <Grid item flexGrow={0.8} sx={{ bgcolor: "#0b1226" }}>
            <Stack direction='row' sx={{ justifyContent: "center", bgcolor: "#508f7f", border: "1px solid #5c6370", alignItems: "center", width: "100%", position: "static", zIndex: "999" }}>
              <Avatar sx={{ ml: "10px" }} src={requestUser.picture ? requestUser.picture : ""} />
              <Typography sx={{ height: " 60px", width: "100%", pt: "20px", ml: "10px" }} variant='h6'>{requestUser.name} </Typography>
              {shaveContactIds._id &&

              <Voicecall  requestUser={requestUser}  />

              }
              {shaveContactIds._id && 
              
              <Videocall userData={userData} requestUser={requestUser}  />
           
              }
              
              <IconButton onClick={() => setShowmeState(!showmeSate)}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
   

            <Stack sx={{ position: "static", mt: 4, mb: 1, zIndex: "999" }}>
              <Message textMsg={textMsg} setTextMsg={setTextMsg} setMessage={setMessage} setMessageRecieved={setMessageRecieved} shaveContactIds={shaveContactIds} shaveMessage={shaveMessage}/>
            </Stack>

          </Grid>

        </Grid> :

        <Grid container>
          <Grid item flexGrow={0.2} sx={{ bgcolor: "#3b475c", height: "100%" }}>

            <Stack direction='row' sx={{ justifyContent: "center", bgcolor: "#508f7f", position: "static", zIndex: "999", alignItems: "center", width: "100%", border: "1px solid #5c6370" }}>
              <Avatar sx={{ ml: "10px" }} src={userData.user.picture ? userData.user.picture : ""} />
              <Typography sx={{ height: " 60px", width: "100%", pt: "20px", textAlign: "center" }} variant='h6'> {userData.user.name}</Typography>

            </Stack>

            <Box sx={{ border: "1px solid white ", borderRadius: "20px", display: "flex", width: "70%", mt: "10px", mb: "10px", ml: "40px" }}>
              <Serach users={users} setUsers={setUsers} setUserList={setUserList} />
            </Box>

            <Stack direction='row' spacing={4} sx={{ m: 2 }} >

              <Button color={changeColor} sx={{ ml: 15 }} onClick={goToPeople} variant='contained'> People</Button>
              <Button color={changeColor} onClick={goToChat} variant='contained'>chat</Button>
            </Stack>

            <Box sx={{ position: "relative", zIndex: "888", height: "80vh", "width": "100%", "overflowY": "auto", "overflowX": "hidden" }}>

              {userList.data && userList.data.users.filter((u) => u._id !== userData.user._id).map((m) => {

                return (

                  <Box onClick={() => eventHabdler2(m)} key={m.id} sx={{ '&:hover': { bgcolor: "#475c5e", cursor: "pointer" } }} >
                    <Stack sx={{ pl: 5 }}  >

                      <Stack direction='row' spacing={2} sx={{ p: 1 }} >
                        <Avatar sx={{ width: "50px", height: "50px" }} src={m.picture} />
                        <Stack>

                          <Typography color='white' variant='h6'>{m.name}</Typography>





                        </Stack>

                      </Stack>

                    </Stack>
                  </Box>
                )
              })}
            </Box>

          </Grid>



          <Grid item flexGrow={0.8} sx={{ bgcolor: "#0b1226" }}>
            {requestUser1.name ?
              <>
                <Stack direction='row' sx={{ justifyContent: "center", bgcolor: "#508f7f", border: "1px solid #5c6370", alignItems: "center", width: "100%", position: "static", zIndex: "999" }}>
                  <Avatar sx={{ ml: "10px" }} src={requestUser1.picture ? requestUser1.picture : ""} />
                  <Typography sx={{ height: " 60px", width: "100%", pt: "20px", ml: "10px" }} variant='h6'>{requestUser1.name}</Typography>
                  <IconButton onClick={() => setShowmeState(!showmeSate)}>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>



                <Box sx={{ ml: "400px" }} >


                  <Button onClick={senRequest} sx={{ height: "200px", fontSize: "30px" }} variant='contained'>{notificationMessage?notificationMessage:'send request'}</Button>

                </Box>
              </> : ""

            }

          </Grid>


        </Grid>
      }
      <UserProfile showmeSate={showmeSate} setShowmeState={setShowmeState} />
    </>
  )
}

export default Chat
