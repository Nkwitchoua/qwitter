import { Container, Typography } from '@mui/material'
import React from 'react'
import SearchFriends from '../components/Messages/SearchFriends'
import UsersList from '../components/Messages/UsersList'

const Messages = () => {
  return (
    <div>
        <Container sx={{borderBottom: 1, borderColor: "grey.200"}}>
            <Typography 
                variant='h5' 
                fontWeight="bold" 
                sx={{ textAlign: 'left', py: 3}}>
                Messages
            </Typography>
            <SearchFriends/>
            <UsersList/>
        </Container>
    </div>
  )
}

export default Messages