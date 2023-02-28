
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import OtpVerify from './components/OtpVerify';
import Myprofile from './pages/Myprofile';
import ErrorPage from './pages/ErrorPage';
import { useEffect, useState } from 'react';
import Videochat from './pages/Videochat';



function App() {
  const [auth, setAuth] = useState(false)
  let old = localStorage.getItem('data')
  const userData = JSON.parse(old)
 

  useEffect(()=>{
    const checkAuth =()=>{
      if(userData){
        setAuth(true)
      }
    }
    checkAuth()
  },[])
  
  return (
    <>
    <BrowserRouter>
    
     <Routes>
    
  <Route path='/' element ={<Home/>}/>
  <Route path='/login' element ={<Login/>}/>
  <Route path='/signup' element ={<SignUp/>}/>
  <Route path='/*' element ={<ErrorPage/>}/>
  {auth&&
  <>
  <Route path='/chat' element ={<Chat/>}/>
  <Route path='/otp-verify' element ={<OtpVerify/>}/>
  <Route path='/my-profile' element ={<Myprofile/>}/>
  <Route path='/video-chat' element ={<Videochat/>}/>
  </>

  }
  


  

 
</Routes>

    </BrowserRouter>

    </>
  );
}

export default App;
