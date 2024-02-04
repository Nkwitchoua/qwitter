import React, { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/auth';

const LeftNavbar = () => {
    const userIsLogged = useSelector(state => state.auth.userLogged);
    const userAvatar = useSelector(state => state.auth.userAvatar);
    const userName = useSelector(state => state.auth.userName);
    const dispatch = useDispatch();

    const menu = [
      {
        title: "Home",
        icon: <HomeIcon/>,
        isProtected: false,
        link: "/"
      },
      {
        title: "Notifications",
        icon: <NotificationsIcon/>,
        isProtected: true,
        link: "/notifications"
      },
      {
        title: "Messages",
        icon: <MailOutlineIcon/>,
        isProtected: true,
        link: "messages"
      },
      {
        title: "Profile",
        icon: <PersonOutlineIcon/>,
        isProtected: true,
        profile: ""
      },
    ];

    const userMenuBtn = document.getElementById("user-menu-button");
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = () => {
      setOpenMenu(true);
    };
    const handleClose = () => {
      setOpenMenu(false);
    };

    const handleLogOut = () => {
      console.log("HANDLE LOG OUT -> ")
      dispatch(logOut());
    }

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
                      menu.map((item, key) => {
                        if(item.isProtected && !userIsLogged) return <></>;
                        return <>
                        <ListItem  key={key} disablePadding>
                          <Link to={item.link} style={{ textDecoration: 'none', color: "black"}}>
                            <ListItemButton style={{ borderRadius: "20px" }}>
                              <ListItemIcon>
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText primary={item.title} />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                        </>
                      })
                    }
                    {
                      userIsLogged && userName ? 

                      <ListItem disablePadding>
                        <ListItemButton style={{ borderRadius: "20px" }}>
                          <Avatar style={{ marginLeft: "-5px", marginRight: "20px" }} alt="user avatar" src={userAvatar}/>
                          <ListItemText primary={userName} />
                          <MoreHorizIcon 
                            aria-controls={openMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                            onClick={handleClick}
                            id="user-menu-button"
                          />
                          <Menu
                            id="basic-menu"
                            anchorEl={userMenuBtn}
                            open={openMenu}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                          </Menu>
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