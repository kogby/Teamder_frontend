import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import instance from '../instance';
export default function FormDialog({userId,dialogOpen,setDialogOpen,displayAlert}) {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const [fbLink , setFbLink] = useState("");
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit = async() => {
    if(!email || !name || !passward || !fbLink){
      displayAlert("error" , "Please fill in all infomation!");
      return;
    }
    else{
      const {
          data: {message},
      } = await instance.post('/user/EditUser',{
          userId,
          email,
          name,
          passward,
          fbLink
      });
      displayAlert("success" , "Edit personal information success!");
      setTimeout(() => {
        handleClose();
      }, 300)
    }
  }
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Passward"
            fullWidth
            variant="standard"
            onChange={(e)=>setPassward(e.target.value)}
          />
          <TextField
            margin="dense"
            label="FbLink"
            fullWidth
            variant="standard"
            onChange={(e)=>setFbLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}