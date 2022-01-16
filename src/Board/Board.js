import React, { useState, useEffect } from 'react'
import instance from '../instance'
import "./Board.css"

function Board({navigate}) {
    const [posts , setPosts] = useState([])

    useEffect(async() => {
        const {
            data: {message , data},
        } = await instance.get('/allPosts/');
        setPosts(data) ;
    } , [])

    return (
        <div className='board-container'>
            {posts.length ?
                <div className='requests-container'>
                    <div className='nameBar'>
                        <span className='name'>課名</span>
                        <span className='code'>流水號</span>
                        <span className='number'>課程代碼</span>
                        <span className='people'>人數</span>
                    </div>
                    {posts.map((post , i) => (
                        <div className='request-post' key={i} id={`pid-${i}`} onClick={() => navigate(`/request/${post._id}`)}>
                            <span className='className'>{post.className}</span>
                            <span className='classCode'>{post.classCode}</span>
                            <span className='classNumber'>{post.className}</span>
                            <span className='cc'>{post.context}</span>
                            <span className='classPeople'>{post.nowPeople}/{post.maxPeople}</span>
                        </div>
                    ))}
                </div> : <div></div>
            }
        </div>
    )
}

export default Board