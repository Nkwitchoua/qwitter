import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, CircularProgress, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { getChat } from '../../actions/chat';

const UsersList = () => {
    const usersSearching = useSelector(state => state.messages.usersSearching);
    const usersFound = useSelector(state => state.messages.usersFound);
    const users = useSelector(state => state.messages.users);

    const dispatch = useDispatch();

    const chats = [];

    const handleChatOpening = () => {
        dispatch(getChat());
    }

    if(usersSearching && !users) {
        return <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    width: '600px',
                    height: '600px',
                    my: 3,
                    mx: 'auto',
                }}>
                    <CircularProgress />
                </Box>
    }

    return (<Box sx={{
            width: '100%'
        }}>
        <Stack>
            {
                users.map((user) => {
                    return (
                        <ListItem key={user.name} style={{ borderRadius: "20px" }}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar alt="user avatar" src={user.avatar}/>
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                                <IconButton onClick={() => handleChatOpening()}>
                                    <MessageIcon/>
                                </IconButton>
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </Stack>
    </Box>
    )
}

export default UsersList