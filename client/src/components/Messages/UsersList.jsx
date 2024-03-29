import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, CircularProgress, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { setChat } from '../../actions/chat';

const UsersList = () => {
    const usersSearching = useSelector(state => state.messages.usersSearching);
    const usersFound = useSelector(state => state.messages.usersFound);
    const users = useSelector(state => state.messages.users);
    const sender = useSelector(state => state.auth.userToken);

    const dispatch = useDispatch();

    const chats = [];

    const handleChatOpening = (receiver) => {
        const receiverData = users.find(user => user.token === receiver);
        
        dispatch(setChat(sender, receiver, receiverData));

        // dispatch()
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
                                    <Avatar src={user.avatar}/>
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                                <IconButton onClick={() => handleChatOpening(user.token)}>
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