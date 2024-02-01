import React, { useEffect } from 'react';
import { Avatar, Box, CircularProgress, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeftNavbar = () => {

    const userIsLogged = useSelector(state => {return state.auth.userLogged});
    const userAvatar = useSelector(state => state.auth.userAvatar);
    const userName = useSelector(state => state.auth.userName);

    console.log("userIsLogged before useEffect", userIsLogged);

    const menu = [
      {
        title: "Home",
        icon: <HomeIcon/>,
        isProtected: false
      },
      {
        title: "Notifications",
        icon: <NotificationsIcon/>,
        isProtected: true
      },
      {
        title: "Messages",
        icon: <MailOutlineIcon/>,
        isProtected: true
      },
      {
        title: "Profile",
        icon: <PersonOutlineIcon/>,
        isProtected: true
      },
    ];

    return (
        <Grid container sx={{ position: 'sticky', top: 0 }}>
            <Grid item xs={4}></Grid>

            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end', px: 3 }}>
                  <List>
                    <IconButton style={{ marginLeft: "10px"  }}>
                      <Link style={{ height: '36px' }} to='/'>
                        <TwitterIcon color="primary" sx={{ fontSize: "36px !important"}}/>
                      </Link>
                    </IconButton>

                    {
                      menu.map(item => {
                        if(item.isProtected && !userIsLogged) return <></>;
                        return <>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                          </ListItemButton>
                        </ListItem>
                        </>
                      })
                    }
                    {
                      userIsLogged && userAvatar && userName ? 
                      <ListItem disablePadding>
                        <ListItemButton>
                          <Avatar alt="user avatar" src={userAvatar}/>
                          <ListItemText primary={userName} />
                        </ListItemButton>
                      </ListItem> :
                        <></>
                    }
                  </List>
            </Grid>
        </Grid>
    )
}

export default LeftNavbar;