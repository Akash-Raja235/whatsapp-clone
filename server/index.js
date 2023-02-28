

import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express()
import connectDB from './database/db.js'

import { createServer }  from 'http';
import { Server }  from 'socket.io'

import userRouter  from './routers/UserRouter.js'
import  MessageRouter from './routers/MessageRouter.js'
import ContactRouter from './routers/ContactRouter.js'
import sendNotification from './routers/NotificationRouter.js'
// some middleware

// app.use(express.urlencoded({extended:true}))/
app.use(express.json())
app.use(cors())




 // All router

 app.use('/api/v1/auth',userRouter)
 app.use('/api/v1/contact',ContactRouter)
 app.use('/api/v1/message',MessageRouter)
//  app.use('/api/v1/request',sendNotification)
// creating a port

const port = process.env.PORT || 5000

 const httpServer = createServer(app)
 const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
 })

 io.on('connection',(socket)=>{

    console.log(`user connected : ${socket.id}`)
    
      socket.on('disconnect',()=>{
        console.log('A user disconnected')
      }) 
    socket.on('send_message',(data)=>{
         
        socket.broadcast.emit("message_recieved",data)
    })
    
    socket.on('send_notification',(data)=>{
      socket.emit("notification_recieved",data)
    })
    socket.on('send_notification2',(data)=>{
     
      socket.emit("notification_recieved2",data)
    })

    socket.on('reject_message',(data)=>{
    
      socket.broadcast.emit("reject_message2",data)
    })

    socket.on('accept_message',(data)=>{
     
      socket.broadcast.emit("accept_message2",data)
    })
    
  socket.on('send_request',(data)=>{
    console.log(data)
    socket.broadcast.emit('getRequest',data)
  })

 })



const start = async()=>{
    try {
        // connecting db with server
        await connectDB(process.env.MONGO_URL)
        httpServer.listen(port, ()=>console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error.message)
    }
}

start()