import React, { useState, useEffect } from 'react'
import instance from '../instance'
import TextField from '@material-ui/core/TextField';
import Title from '../Component/Title';
import { Typography } from '@mui/material';
import { Button } from '@material-ui/core';
import './Search.css'
import Logo from '../Image/search.png'
import styled from 'styled-components';

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 60%;
    margin: 10px;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 10px;
`;
function Search({setCreateRequestDialogOpen}) {

    const [search , setSearch] = useState("");
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    return (
        <Column>
            <Title>
              <Typography variant="h4" style={{ color: 'white' }}>
                <h1>Welcome To Teamder</h1>
              </Typography>
            </Title>
            <Row>
                <TextField
                    inputProps={{style: {fontSize: 20 ,color:'white'}}}
                    fullWidth
                    size="small"
                    placeholder="請輸入搜索內容"
                    value={search}
                    onChange={handleChange(setSearch)}>
                </TextField>
                <select className='searchSelect'>
                    <option value="課名" className='option'>課名</option>
                    <option value="流水號" className='option'>流水號</option>
                    <option value="課程代碼" className='option'>課程代碼</option>
                </select>
                <img className='searchLogo' src={Logo} alt="search"/>
            </Row>
        </Column>
    )

}

export default Search ;