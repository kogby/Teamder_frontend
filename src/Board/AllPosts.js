import React, { useState, useEffect } from 'react'
import Board from './Board'
import Logo from './Logo.png'
import './AllPosts.css'
import Wrapper from '../Component/Wrapper2';
import User from './user.png'
import Search from './Search'
import instance from '../instance';
function AllPosts(props) { 
    const [userData, setUserData] = useState(null);
    useEffect(async() => {
      const {
        data: {message,data},
      } = await instance.get('/user/personalPage',{
          params: {
          userId: props.myId,
        },
      });
      console.log(data.name)
      setUserData(data);
      console.log(userData.name)
      console.log(message);
    }, [])
    return(
        <Wrapper>
            <div className='page'>
                <div className='logoDiv'>
                    <img className='logo' src={Logo} alt="Welcome to Teamder!" onClick={() => props.navigate(`/AllPosts`)} />
                </div>
                {userData ?
                <div className='userId' onClick={() => props.navigate(`/user/${props.myId}`)}>
                    <img className='user' src={User} alt="user" />
                    {userData.name}
                </div> :
                <div>
                </div> 
                }
                <Search/>
                <div className='new'>
                    <button className='newBtn'>
                        新增貼文
                    </button>
                </div>
                <Board navigate={props.navigate}/>
            </div>
        </Wrapper>
        
    )
}

export default AllPosts