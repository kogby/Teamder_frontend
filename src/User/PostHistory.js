import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 90%;
    padding: 1em;
    margin: 2em;
    border-radius: 10%;
    background-color:#BFFFFF;
    opacity: 1;
`   
const Span = styled.span`
  display:flex;
  width: 10%;
  outline:solid
  text-align: center;
  font-size:16px;
  overflow:hidden;
`
const TitleDiv = styled.span`
    display:flex;
    width: 10%;
    text-align: left;
    font-size:16px;
    overflow:hidden;
`
const ContextDiv = styled.div`
    display:flex;
    width: 60%;
    font-size:16px;
    text-align: left;
    word-wrap:break-word;
    overflow:hidden;
`
const PostHistory = ({posts , navigate}) => {
    return (
        <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Row>
                <Span >課名</Span>
                <Span >課號</Span>
                <Span >流水號</Span>
                <TitleDiv>標題</TitleDiv>
                <ContextDiv style={{outline:'none'}}>內文</ContextDiv>
            </Row>
            {posts.length ?
            posts.map((post, i) => (
            <Row  key={i} id={`pid-${i}`} onClick={() => navigate(`/request/${post._id}`)}>

                <Span >{post.className}</Span>
                <Span >{post.classCode}</Span>
                <Span >{post.classNumber}</Span>
                <TitleDiv>{post.title}</TitleDiv>
                <ContextDiv className='context'>{post.context}</ContextDiv>
            </Row>
            ))
            : <div></div>
            }
        </div>
    )
}
export default PostHistory;