

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useEffect, useState } from 'react';
import { Avatar, IconButton, Stack } from '@mui/material';
import io from 'socket.io-client'

import axios from 'axios';

const socket = io.connect('http://localhost:5000')
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:600,
  overflow:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Notification(requestmsg,setRequestMsg,notificationMessage) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [getFriendList, setGetfriendsList] = useState([])
  const [AllUsers , setAllUsers] = useState([])
  const [filteruser, setFilteruser] = useState([])

  const [changeColor, setChangeColor] = useState('')

  const [contacts, setContacts] = useState([]) 

  const [refresh, setRefresh] = useState(false)
  let old = localStorage.getItem('data')

  const userData = JSON.parse(old)

 
  let token = userData.token
 
  
  const rejectRequest = async(m)=>{
    
    try {

      const credential = {
        isfriend:false,
       userId:userData.user._id,
        sender:m._id
      }
    
        
    let res = await axios.put('http://localhost:5000/api/v1/auth/accept-friend-request',credential,{
      headers:{
        authorization: `Bearer ${token}`
      }
    })
      console.log(res,"kkkkkk")
    setRefresh(!refresh)
    if(res.data){
     socket.emit('reject_message',{msg:"your friend request has been rejected"})
    }
   
    } catch (error) {
      console.log(error.message)
    }

  }

  const acceptRequest = async(m)=>{
    
        const credential = {
          isfriend:true,
         userId:userData.user._id,
          sender:m._id
        }
      
   
      let res = await axios.put('http://localhost:5000/api/v1/auth/accept-friend-request',credential,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
  
      setRefresh(!refresh)
     if(res){
      socket.emit('accept_message',{msg:"your friend request has been Accepted"})
     }

    try {

      const credential = {
    
        sender:m._id
      }
      

    let res = await axios.post('http://localhost:5000/api/v1/contact/create',credential,{
      headers:{
        authorization: `Bearer ${token}`
      }
    })

   
   setContacts(res.data)
 
   setRefresh(!refresh)

    } catch (error) {
      console.log(error.message)
    }

  }

 


  const filterUser = ()=>{

    const res = AllUsers.filter((users)=>{
     return getFriendList.find((a)=>{
       return users._id === a
     })
    })   
 setFilteruser(res)
 if(res.length > 0){
   setChangeColor('primary')
 }  
 }




  useEffect(()=>{
    const friendListApi = async()=>{
      const data = {
        userId:userData.user._id,
      
         }
        
      let res = await axios.get(`http://localhost:5000/api/v1/auth/get-allfriends/?name=${data.userId}`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      }
        )
        
     
       setGetfriendsList(res.data.friendsList)
    
     }
    
    
    const getAllUsers = async()=>{
    
      try {
        
         let res = await axios.get('http://localhost:5000/api/v1/auth/get-allUsers',{
          headers:{
            authorization: `Bearer ${token}`
          }
         })
         setAllUsers(res.data.users)
        
      } catch (error) {
        console.log(error)
      }
    }
    

   


    friendListApi()
   getAllUsers()
 
  },[requestmsg,notificationMessage,refresh])
  
  // requestmsg,refresh

  
 
useEffect(()=>{
  filterUser()
},[AllUsers,])

  return (
    <div>
              <IconButton onClick={handleOpen}>
              <NotificationAddIcon color={changeColor}/>
              </IconButton>
   
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        
                <Box sx={style}>
                
                   {filteruser.map((m)=>{
                    return(
                      
                      <Box key={m._id}>
                      <Stack spacing={2} direction='row' sx={{ alignItems:"center",border:"1px solid black", p:1, borderRadius:"10px" }}>
                     <Avatar sx={{ ml: "10px" }} src={m.picture? m.picture:""} />
                     <Typography sx={{width:"100px"}} variant='h6'> {m.name}</Typography>
                     <Button onClick={()=>acceptRequest(m)} variant='contained'>Accept</Button>
                     <Button onClick={()=>rejectRequest(m)} variant='contained'>Reject</Button>
                   </Stack>
                    </Box>
                    )
                   })}  
                   
                     
              
                 
                  </Box>
            
        
        </Fade>
      </Modal>
    </div>
  );
}