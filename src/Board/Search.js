import React, { useState, useEffect } from 'react'
import instance from '../instance'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import './Search.css'
import Logo from './search.png'

function Search() {

    const [search , setSearch] = useState("");
    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    return (
        <div className='search'>
            <input
                size="300"
                className="searchText"
                placeholder="請輸入搜索內容"
                value={search}
                onChange={handleChange(setSearch)}>
            </input>
            <select className='searchSelect'>
                <option value="課名" className='option'>課名</option>
                <option value="流水號" className='option'>流水號</option>
                <option value="課程代碼" className='option'>課程代碼</option>
            </select>
            <img className='searchLogo' src={Logo} alt="search"/>
        </div>
    )

}

export default Search ;