import { Avatar, Box, Container, Divider, IconButton, InputAdornment, InputBase, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getChat, sendMessage } from '../../actions/chat';
import SendIcon from '@mui/icons-material/Send';
import socket from '../../http/socket';

const Chat = () => {

  const sender = useSelector(state => state.auth.userToken);
  const receiverName = useSelector(state => state.chat.receiverName);
  const receiverAvatar = useSelector(state => state.chat.receiverName);
  const receiverToken = useSelector(state => state.chat.receiver);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleInput = (event) => {
    const val = event.target.value;
    
    if(val) {
      setMessage(val);
    }
  }

  const handleClickSend = () => {
    console.log("MESSAGE SENT -> ", message);
    sendMessage(message, receiver);
    setMessage("");
  }

  socket.on("private message", (message) => {
    console.log("private MESSAGE -> ", message);
  });

  useEffect(() => {

    if(sender && receiverToken) {
      socket.auth = { sender };
      socket.connect();

      dispatch(getChat(sender, receiverToken));
    }

    // return socket.disconnect();
  }, [receiverToken]);

  return (
    <Container sx={{ 
      padding: "0px !important", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: 'space-between',
      height: "100%"
    }}>
      <Typography 
          variant='h5' 
          fontWeight="bold" 
          sx={{ textAlign: 'left', p: 3}}>
          {
            receiverName || "Chat"
          }
      </Typography>
      
      {
        receiverName && receiverToken ? <>
          <Container sx={{ p: 3, display: 'flex', justifyContent: 'center'}}>
            <Avatar sx={{ width: "56px", height: "56px" }} src={receiverAvatar} />
          </Container>
          <Divider/>

          <Box sx={{ flexGrow: 5 }}>

          </Box>

          <Divider/>
          <Box sx={{ p: 2 }}>
              <TextField
                id="filled-multiline-static"
                multiline
                onInput={(event) => handleInput(event)}
                placeholder='Start a new message'
                variant="filled"
                fullWidth
                sx={{ borderRadius: "30px", display: 'flex', alignItems: "center", my: 2}}
                InputProps={{
                  style: { p: "12px !important" },
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="send message"
                        onClick={handleClickSend}
                        edge="end"
                      >
                        <SendIcon/>
                      </IconButton>
                    </InputAdornment>
                }}
              />
          </Box>
        </> : <></>
      }
    </Container>
  )
}

export default Chat
// export Chat.socket;