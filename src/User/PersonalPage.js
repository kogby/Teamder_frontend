import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react'
import PersonalInformation from './PersonalInfomation';
import PostHistory from './PostHistory';
import { useParams } from 'react-router-dom'
import Wrapper from '../Component/Wrapper';
import Title from '../Component/Title';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import EditUserDialog from './EditUserDialog'
import CreateRequestDialog from './CreateRequestDialog';
import instance from '../instance';
const TabWrapper = styled.div`
    display:flex;
    flex-direction: row;
    margin: 1em;
    justify-content: flex-start;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 45%;
    margin: 10px;
`;
const Div = styled.div`
    width: 30%;
    display:flex;
    margin: 1em;
`;
const ContentBox = styled.div`
    display:flex;
    flex-direction: column;
    width: 30%;
    height: 60%;
    justify-content: center;
    align-items: center;
    padding: 1em;
    border-radius: 10%;
    background-color: white;
    opacity: 0.8;
    overflow-y:auto;
`;

const TabListStyle = {
  backgroundColor: "white",
  opacity: "0.8"
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const PersonalPage = (props)=>{
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [value, setValue] = useState(0);
    const [editUserDialogOpen , setEditUserDialogOpen] = useState(false);
    const [createRequestDialogOpen , setCreateRequestDialogOpen] = useState(false);
    const [posts, setPosts] = useState([])
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };
    let myPersonalPage = false;
    if(props.myId === userId){
      myPersonalPage = true;
    }
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/user/personalPage',{
          params: {
          userId: userId,
        },
      });
      setUserData(data);
      console.log(message);
    }, [editUserDialogOpen])


    useEffect(async() => {
      const {
          data: {message , data},
      } = await instance.get('/request/personalRequest',{
          params: {
          userId: userId,
        },
      });
      console.log(data);
      setPosts(data) ;
    } , [])
    return (
        <Wrapper>
          <Title>
            <Typography variant="h4" style={{ color: 'white' }}>
              <h1>Personal Page</h1>
            </Typography>
          </Title>
          <TabWrapper>
            <Tabs variant="fullWidth" style={TabListStyle} value={value} onChange={handleTabsChange}>
              <Tab label="Personal Information" {...a11yProps(0)} />
              <Tab label="History Request" {...a11yProps(1)} />
            </Tabs>
          </TabWrapper>
          <ContentBox>
            <TabPanel style={{width:'100%',display:'flex',flexDirection:'column'}} value={value} index={0}>
              <PersonalInformation
                userData = {userData}
              >
              </PersonalInformation>
            </TabPanel>
            <TabPanel style={{width:'100%',display:'flex',flexDirection:'column'}} value={value} index={1}>
              <PostHistory
                posts={posts}
                navigate={props.navigate}
              ></PostHistory>
            </TabPanel>
          </ContentBox>
          <Row>
            <Div>
              <Button  
                fullWidth="true"
                variant="contained" 
                onClick={()=>setEditUserDialogOpen(true)} 
                style={myPersonalPage ? {display:'flex'} : {display:'none'}}
              >Edit Personal Information</Button>
            </Div>
            <Div>
              <Button  
                fullWidth="true"
                variant="contained" 
                onClick={()=>setCreateRequestDialogOpen(true)} 
                style={myPersonalPage ? {display:'flex'} : {display:'none'}}
              >Create new request</Button>
            </Div>
          </Row>
          <EditUserDialog
            userId ={userId}
            dialogOpen={editUserDialogOpen}
            setDialogOpen = {setEditUserDialogOpen}
            displayAlert={props.displayAlert}
          ></EditUserDialog>
          <CreateRequestDialog
            myId={props.myId}
            createRequestDialogOpen={createRequestDialogOpen}
            setCreateRequestDialogOpen={setCreateRequestDialogOpen}
            displayAlert={props.displayAlert}
          ></CreateRequestDialog>
        </Wrapper>
    )
}

export default PersonalPage;
