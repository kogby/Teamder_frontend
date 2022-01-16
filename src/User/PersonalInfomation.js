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
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>Name:</p>
                        </Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>{userData.name}</p>
                        </Typography>
                    </ContextDiv>
                </Row>
                <Row>
                    <ItemDiv>
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>Email:</p>
                        </Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>{userData.email}</p>
                        </Typography>
                    </ContextDiv>
                </Row>
                <Row>
                    <ItemDiv>
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>FB Link:</p>
                        </Typography>
                    </ItemDiv>
                    <ContextDiv>
                        <Typography variant="h4" style={{ color: '#212121' }}>
                            <p>{userData.fbLink}</p>
                        </Typography>
                    </ContextDiv>
                </Row>
            </div>
            }
        </div>
    )
}
export default PersonalInformation;