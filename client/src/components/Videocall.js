


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {Avatar, Button,IconButton, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#262423',
    border: ' thick double white',
    boxShadow: 24,
    p: 4,
    height:600,
   
};

const Videocall = ({requestUser, userData}) => {

    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
       
        <IconButton onClick={handleOpen}>
              <VideoCallIcon />
              </IconButton>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            // timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
                <Stack direction='row' justifyContent='space-around'>
                    <Stack spacing={2} alignItems="center">
                        <Avatar src={userData.user? userData.user.picture : ""} sx={{width:"100px", height:"100px"}}/>
                        <Typography variant='body2'>{userData.user.name}</Typography>
                    </Stack>
                    
            <Stack justifyContent='center' alignItems='center'spacing={2}>
                 <Typography variant='h6'>contacting ........... </Typography>
                <Typography variant='h6'>Ringing ....... </Typography>
             </Stack>

                     <Stack spacing={2} alignItems="center">
                        <Avatar src={requestUser.picture? requestUser.picture : ""} sx={{width:"100px", height:"100px"}}/>
                        <Typography variant='body2'>{requestUser.name}</Typography>
                    </Stack>
         </Stack>
             
            </Box>
          </Fade>
        </Modal>
      </div>
    );
}

export default Videocall
