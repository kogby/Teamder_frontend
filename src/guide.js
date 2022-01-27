import React, {useState , useEffect} from 'react'
import PersonalPage from './User/PersonalPage'
import RequestPage from './Request/RequestPage'
import SignUp from './SignUp/signUp'
import Login from './Login/login'
import AllPosts from './Board/AllPosts'
import { Routes, Route, useNavigate} from 'react-router-dom'
import { Alert } from '@mui/material'
import SearchPage from './Search/SearchPage'
const LOCALSTORAGE_KEY = "save-me";
function Guide(props) {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [hasSignIn,setHasSignIn] = useState(false);
    const [myId, setMyId] = useState(savedMe||"");
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity , setAlertSeverity] = useState("success");
    const [alertMessage , setAlertMessage] = useState("")
    const navigate = useNavigate();
    const handleOnClose = (event) => {
      setShowAlert(false);
    }
    useEffect(() => {
      if (hasSignIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, myId);
      }
    }, [hasSignIn, myId]);
    const displayAlert = (severity , message)=>{
      setShowAlert(true);
      setAlertSeverity(severity);
      setAlertMessage(message);
    }
    const requireAuth = () => {
      console.log("good");
      if(!hasSignIn){
        navigate('/');
      }
    }
    return (
      <div className="wrapper">
        <Alert severity = {alertSeverity} onClose={handleOnClose} style={showAlert ? {display:'flex'} : {display:'none'}}>{alertMessage}</Alert>
        <Routes>
            <Route exact path="/" element={<Login navigate={navigate} setMyId={setMyId} setHasSignIn={setHasSignIn} displayAlert={displayAlert}/>}></Route>
            <Route path="/signUp" element={<SignUp navigate={navigate} displayAlert={displayAlert}/>} />
            <Route path="/user/:userId" element={<PersonalPage navigate={navigate} myId={myId} displayAlert={displayAlert}/>} />
            <Route path="/AllPosts" element={<AllPosts navigate={navigate} myId={myId} displayAlert={displayAlert}/>} />
            <Route path="/request/:requestId" element={<RequestPage navigate={navigate} myId={myId} displayAlert={displayAlert}/>} />
            <Route path="/Search" element={<SearchPage navigate={navigate}/>}/>
        </Routes>
      </div>
    )
  }
export default Guide;