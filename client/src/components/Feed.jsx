import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts';
import PostCard from './PostCard';
import PostForm from './PostForm'

const Feed = () => {

    const dispatch = useDispatch();
    const userIsLogged = useSelector(state => state.auth.userLogged);
    const posts = useSelector(state => state.posts);
    
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <div>
            {
                userIsLogged ?
                <PostForm /> :
                <></>
            }
            <div>
                {
                    posts.length == 0 ? (
                        <div style={{
                                margin: '40px 0', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center'
                            }}>
                            <CircularProgress size={40}/>
                        </div> 
                    ) : (
                        <Grid>
                            {
                                posts.map(post => {
                                    return (
                                        <PostCard post={post} key={post._id}/>
                                    )
                                })
                            }
                        </Grid>
                    )
                }
            </div>
        </div>
    )
}

export default Feed