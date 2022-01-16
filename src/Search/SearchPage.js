import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../instance'

function SearchPage({navigate}) {
    const { search , type } = useParams();

    console.log(search) ;
    console.log(type) ;

    const [request , setRequest] = useState([]);
    
    useEffect(async()=> {
        const {
            data: {message , data},
    } = await instance.get('/search/findRequest' , {
        params: {
            search: search ,
            type: type
        },
    });
    setRequest(data) ;
    }, [])

    return(
        <div className='search-container'>
            {request.length ?
                <div className='requests-container'>
                    <div className='nameBar'>
                        <span className='name'>課名</span>
                        <span className='code'>流水號</span>
                        <span className='number'>課程代碼</span>
                        <span className='people'>人數</span>
                    </div>
                    {request.map((post , i) => (
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

export default SearchPage