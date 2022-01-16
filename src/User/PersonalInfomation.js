import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    margin: 10px;
    padding:1px;
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
const PersonalInformation = ({userData}) => {
    return (
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
            {userData === null ?
            <div></div>:
            <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Row>
                    <ItemDiv>
                        <Typography  style={{ color: '#212121' }}>User-id:</Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography  style={{ color: '#212121' }}>{userData.userId}</Typography>
                    </ContextDiv>
                </Row>
                <Row>
                    <ItemDiv>
                        <Typography  style={{ color: '#212121' }}>Name:</Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography  style={{ color: '#212121' }}>{userData.name}</Typography>
                    </ContextDiv>
                </Row>
                <Row>
                    <ItemDiv>
                        <Typography  style={{ color: '#212121' }}>Email:</Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography  style={{ color: '#212121' }}>{userData.email}</Typography>
                    </ContextDiv>
                </Row>
                <Row>
                    <ItemDiv>
                        <Typography  style={{ color: '#212121' }}>FB Link:</Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography  style={{ color: '#212121' }}>{userData.fbLink}</Typography>
                    </ContextDiv>
                </Row>
            </div>
            }
        </div>
    )
}
export default PersonalInformation;