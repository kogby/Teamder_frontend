import React, { useState, useEffect } from 'react';
import instance from '../instance';
import { useParams } from 'react-router-dom'
import Wrapper from '../Component/Wrapper';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Logo from '../Image/Logo.png'
import User from '../Image/user.png'
import './RequestPage.css'
import { textAlign } from '@mui/system';
import { TextField } from '@material-ui/core';
import Send from './send.png'
const Title =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width:70%
`;
const ContentBox = styled.div`
    display:flex;
    flex-direction: column;
    width: 80%;
    height: 100vh;
    justify-content: flex-start;
    align-items: center;
    padding: 1em;
    border-radius: 10% 10% 0% 0%;
    background-color: white;
    opacity: 0.8;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 70%;
    height: 10%
    margin: 10px;
    outline: solid;
`;
const ItemDiv = styled.div`
    width: 20%;
    display:flex;
    margin: 1em;
`;
const ContextDiv = styled.div`
    width: 80%;
    display:flex;
    margin: 1em;
`;
const ContextBox = styled(Box)`
  width:70%;
  height:50%;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  outline:solid;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 70%;
  height: 5%
  margin: 10px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  color:white
`
const imgStyle = {
    width: '80%',
    height: 'auto', 
}
const RequestPage = ({navigate , myId , displayAlert}) => {
    const { requestId } = useParams();
    const [requestData, setRequestData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [requestCommentData , setRequestCommentData] = useState(null);
    const [content , setContent] = useState("") ;
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/request/requestPage',{
          params: {
          requestId: requestId,
        },
      });
      setRequestData(data);
      console.log(message);
    }, [])
    const handleApply = ()=>{

    }
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/user/personalPage',{
          params: {
          userId: myId,
        },
      });
      setUserData(data);
    }, []) 

    /////////////////////////////////////////////////////////////////////////
    useEffect(async() => {
      const {
        data: {message , data},
      } = await instance.get(`/comment/request/${requestId}/comment`, {
        params: {
          requestId: requestId,
        },
      });
      setRequestCommentData(data);
      console.log(message) ;
    }, [])

    const handleComment = async() => {
      if(!content){
        displayAlert("error" , "Please fill in comment!");
        return;
      }
      else{
        const {
            data: {message},
        } = await instance.post('/comment/createComment',{
          requestId,
          myId,
          content
      });
      displayAlert("success" , "Create comment success!");
      setContent("");
    }
  }
  

  /////////////////////////////////////////////////////////////////////////


    return(
      <Wrapper style={{height:'100%'}}>
          {requestData === null ?
          <div></div>:
          <>
            <Header>
              <LogoDiv>
                <img  src={Logo} alt="Welcome to Teamder!" onClick={() => navigate(`/AllPosts`)} styled={imgStyle} />
              </LogoDiv>
              <Title>
                <Typography variant="h4" style={{ color: 'white',width:'80%',justifyContent:'center',display:'flex'}}>
                    <h1>Teamder Is Your Best Friend</h1>
                </Typography>
              </Title>
                <Typography  style={{ color: 'white',width:'7%' ,outline:'solid',justifyContent:'center',display:'flex'}}>
                  <p>{requestData.nowPeople}/{requestData.maxPeople}<br></br>現有組員/需要組員</p>
                </Typography>
              {userData === null ?
                <div></div>: 
                <UserIconDiv>
                    <img src={User} alt="user" onClick={() => navigate(`/user/${myId}`)} style={imgStyle}/>
                    <p>{userData.name}</p>
                </UserIconDiv>
              }
            </Header>
            <ContentBox>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' }}>標題:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' }}>{requestData.title}</Typography>
                </ContextDiv>
              </Row>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' }}>Class Name:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' }}>{requestData.className}</Typography>
                </ContextDiv>
              </Row>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' }}>課號:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' }}>{requestData.classCode}</Typography>
                </ContextDiv>
              </Row>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' }}>流水號:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' }}>{requestData.classNumber}</Typography>
                </ContextDiv>
              </Row>
              <ContextBox>
                <Typography  style={{ color: '#212121' }}>
                  <p>內文:  {requestData.context}</p>
                </Typography>
              </ContextBox>
              <Footer>
                <Button variant='contained' color='primary' onClick={()=>{handleApply()}}>apply</Button>
                <Typography  style={{ color: 'black',width:'30%',justifyContent:'flex-end',display:'flex'}}>
                  <p>{`0 people have applied`}</p>
                </Typography>
              </Footer>


              <TextField
                style={{marginTop:'2%' ,  width:'60%'}}
                margin="dense"
                label="sendComment"
                fullWidth
                variant="standard"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
              />
              <img src={Send} onClick={handleComment} className='send'/>
              {/* <div className='comment-container'>
                {requestComment.length ?
                  <div className='requestComment-container'>
                      {requestComment.map((post , i) => (
                        <div className='requestComment-post' key={i} id={`pid-${i}`}>
                            <span className='className'>{post.requestId}</span>
                            <span className='classCode'>{post.userId}</span>
                            <span className='classNumber'>{post.content}</span>
                        </div>
                      ))}
                  </div> : <div></div>
                }
              </div> */}
              
              
            </ContentBox>
          </>
          }
        </Wrapper>
    )
}

export default RequestPage;
