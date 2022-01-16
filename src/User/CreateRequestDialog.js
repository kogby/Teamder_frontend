import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import instance from '../instance';
export default function CreateRequestDialog({myId,createRequestDialogOpen,setCreateRequestDialogOpen,displayAlert}) {
  const [title,setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classNumber , setClassNumber] = useState("");
  const [maxPeople,setMaxPeople] = useState("");
  const [nowPeople,setNowPeople] = useState("");
  const [context,setContext] = useState("");
  const handleClose = () => {
    setCreateRequestDialogOpen(false);
  };
  const handleSubmit = async() => {
    if(!title || !className || !classCode || !classNumber || !maxPeople || !nowPeople || !context){
      displayAlert("error" , "Please fill in all infomation!");
      return;
    }
    else{
      const {
          data: {message},
      } = await instance.post('/request/createRequest',{
          myId,
          title,
          className,
          classCode,
          classNumber,
          maxPeople,
          nowPeople,
          context
      });
      displayAlert("success" , "Edit personal information success!");
      setTimeout(() => {
        handleClose();
      }, 300)
    }
  }
  return (
    <div>
      <Dialog open={createRequestDialogOpen} onClose={handleClose}>
        <DialogTitle>Create New Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ClassName"
            fullWidth
            variant="standard"
            onChange={(e)=>setClassName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ClassCode"
            fullWidth
            variant="standard"
            onChange={(e)=>setClassCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="ClassNumber"
            fullWidth
            variant="standard"
            onChange={(e)=>setClassNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="MaxPeople"
            fullWidth
            variant="standard"
            onChange={(e)=>setMaxPeople(e.target.value)}
          />
          <TextField
            margin="dense"
            label="NowPeople"
            fullWidth
            variant="standard"
            onChange={(e)=>setNowPeople(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Context"
            fullWidth
            variant="standard"
            onChange={(e)=>setContext(e.target.value)}
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