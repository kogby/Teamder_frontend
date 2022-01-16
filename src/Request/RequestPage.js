import React, { useState, useEffect } from 'react';
import instance from '../instance';
import { useParams } from 'react-router-dom'
import Wrapper from '../Component/Wrapper2';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import styled from 'styled-components';
import Logo from '../Board/Logo.png'
import User from '../Board/user.png'
import './RequestPage.css'
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
    overflow-y: auto;
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
  justify-content: flex-start;
  width: 70%;
  height: 5%
  margin: 10px;
  outline: solid;
`
const RequestPage = ({navigate , myId , displayAlert}) => {
    const { requestId } = useParams();
    const [requestData, setRequestData] = useState(null);
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
    // console.log(requestData.applicants)
    const handleApply = ()=>{

    }

    const [userData, setUserData] = useState(null);
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/user/personalPage',{
          params: {
          userId: myId,
        },
      });
      console.log(data.name)
      setUserData(data);
      console.log(userData.name)
      console.log(message);
    }, [])


    return(
        <Wrapper>
          {requestData === null ?
          <div></div>:
          <div className='page'>
            <div className='logoDiv'>
                  <img className='logo' src={Logo} alt="Welcome to Teamder!" onClick={() => navigate(`/AllPosts`)} />
            </div>
            {userData ?
                <div className='userId' onClick={() => navigate(`/user/${myId}`)}>
                    <img className='user' src={User} alt="user" />
                    {userData.name}
                </div> :
                <div>
                </div> 
                }
            <Title>
              <Typography  style={{ color: 'white',width:'20%' ,outline:'solid',justifyContent:'center',display:'flex'}}>
                <p>{requestData.nowPeople}/{requestData.maxPeople}<br></br>現有組員/需要組員</p>
              </Typography>
              <Typography variant="h4" style={{ color: 'white',width:'80%',justifyContent:'center',display:'flex'}}>
                  <h1>{requestData.title}</h1>
              </Typography>
            </Title>
            <ContentBox>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' , fontSize: '30px' }}>Class Name:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' , fontSize: '30px'}}>{requestData.className}</Typography>
                </ContextDiv>
              </Row>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121'  , fontSize: '30px'}}>課號:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121' , fontSize: '30px' }}>{requestData.classCode}</Typography>
                </ContextDiv>
              </Row>
              <Row>
                <ItemDiv>
                    <Typography  style={{ color: '#212121' , fontSize: '30px' }}>流水號:</Typography>
                </ItemDiv>
                <ContextDiv>
                    <Typography  style={{ color: '#212121'  , fontSize: '30px'}}>{requestData.classNumber}</Typography>
                </ContextDiv>
              </Row>
              <ContextBox>
                <Typography  style={{ color: '#212121' }} className='cccc'>
                  <p className='ccc'>{requestData.context}</p>
                </Typography>
              </ContextBox>
              <Footer>
                <Button variant='contained' color='primary' onClick={()=>{handleApply()}}>apply</Button>
                <Typography  style={{ color: 'black',width:'80%',justifyContent:'flex-end',display:'flex'}}>
                  <p>{`people have applied`}</p>
                </Typography>
              </Footer>
            </ContentBox>
          </div>
          }
        </Wrapper>
    )
}

export default RequestPage;
