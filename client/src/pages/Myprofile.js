

import { Avatar, Stack, TextField,Box, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal';

  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:600
};

const Myprofile = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    }


    let old = localStorage.getItem('data')
    const userData = JSON.parse(old)
  
  return (
    <>
     <Avatar onClick={handleOpen} sx={{ ml: "10px" }} src={userData.user.picture ? userData.user.picture : ""} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack  alignItems="center" spacing={1}>
      <Avatar src={userData.user.picture ? userData.user.picture : ""} sx={{width:"100px", height:"100px"}}/>
     <Typography variant='h6'>{userData.user.name}</Typography>
 
     <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth:200}}>
        <InputLabel id="demo-simple-select-standard-label">Choose your status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>I'm busy !!! </MenuItem>
          <MenuItem value={20}>text me only !!!</MenuItem>
          <MenuItem value={30}>argent call only !!!</MenuItem>
          <MenuItem value={40}>cool !!! </MenuItem>
          <MenuItem value={50}>keep smile !!!</MenuItem>
          <MenuItem value={60}> be strong !!!!!</MenuItem>
        </Select>
      </FormControl>
      
    </div>
      </Stack>
        </Box>
      </Modal>

    </>
  )
}

export default Myprofile
