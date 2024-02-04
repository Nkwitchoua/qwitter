import { Container, Typography } from '@mui/material'
import React from 'react'

const Chat = () => {
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