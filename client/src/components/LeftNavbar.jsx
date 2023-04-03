import React from 'react';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const LeftNavbar = () => {
    return (
        <Grid container sx={{ position: 'sticky', top: 0 }}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end', px: 3 }}>
                <IconButton>
                  <Link style={{ height: '36px' }} to='/'>
                    <TwitterIcon color="primary" sx={{ fontSize: "36px !important" }}/>
                  </Link>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default LeftNavbar;