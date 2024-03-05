import { Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getChat } from '../../actions/chat';

const Chat = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getChat());
    console.log("USE EFFECT GET CHAT CALLED")
  }, []);

  return (
    <div>
        <Container sx={{ padding: "0px" }}>
            <Typography 
                variant='h5' 
                fontWeight="bold" 
                sx={{ textAlign: 'left', py: 3}}>
                Chat
            </Typography>
        </Container>
    </div>
  )
}

export default Chat