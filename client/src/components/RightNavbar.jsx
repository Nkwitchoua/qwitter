import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import AuthBar from './AuthBar'
import { useSelector } from 'react-redux'

const RightNavbar = () => {
  
  const userIsLogged = useSelector(state => state.auth.userLogged);

  useEffect(() => {
    console.log("CHECK USERISLOGGED IN RIGHT NAVBAR -> ", userIsLogged);
  }, [userIsLogged]);

  return (
    <Grid sx={{ px: 3, py: 2, position: "fixed"}}>
        <Grid item xs={8}>
            {
              userIsLogged ? 
              <></> :
              <AuthBar />
            }
        </Grid>
        <Grid item xs={4}>

        </Grid>
    </Grid>
  )
}

export default RightNavbar