import React, { useState, useEffect } from 'react'
import Board from './Board'
import Logo from '../Image/Logo.png'
import './AllPosts.css'
import Wrapper from '../Component/Wrapper';
import User from '../Image/user.png'
import Search from './Search'
import instance from '../instance';
import CreateRequestDialog from '../User/CreateRequestDialog';
import styled from 'styled-components';
import { Button } from '@mui/material';
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5%
  margin: 5px;
`
const LogoDiv = styled.div`
  width: 6%;
  height: 10vh;
  display:flex;
  margin: 1em;
`
const UserIconDiv = styled.div`
  width: 6%;
  height: 10vh;
  display:flex;
  margin: 1em;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const imgStyle = {
  width: '80%',
  height: 'auto', 
}
function AllPosts(props) { 
    const [userData, setUserData] = useState(null);
    const [createRequestDialogOpen , setCreateRequestDialogOpen] = useState(false);
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/user/personalPage',{
          params: {
          userId: props.myId,
        },
      });
      setUserData(data);
    }, [])
    return(
        <Wrapper style={{height:'100%'}}>
            <Header>
              <LogoDiv>
                <img  src={Logo} alt="Welcome to Teamder!" onClick={() => props.navigate(`/AllPosts`)} styled={imgStyle}/>
              </LogoDiv>
              <Search setCreateRequestDialogOpen={setCreateRequestDialogOpen}/>
              {userData === null ?
                <div></div>: 
                <UserIconDiv>
                    <Button
                        size="large"
                        variant='contained' 
                        color='inherit'
                        onClick={()=>{setCreateRequestDialogOpen(true)}}    
                    >新增貼文</Button>
                    <img src={User} alt="user" onClick={() => props.navigate(`/user/${props.myId}`)} style={imgStyle}/>
                    <p>{userData.name}</p>
                </UserIconDiv>
              }
            </Header>
            <div className='page'>
                <div className='new'>
                    
                </div>
                <Board navigate={props.navigate} createRequestDialogOpen={createRequestDialogOpen}/>
                <CreateRequestDialog
                    myId = {props.myId}
                    createRequestDialogOpen = {createRequestDialogOpen}
                    setCreateRequestDialogOpen={setCreateRequestDialogOpen}
                    displayAlert={props.displayAlert}
                ></CreateRequestDialog>
            </div>
        </Wrapper>
        
    )
}

export default AllPosts