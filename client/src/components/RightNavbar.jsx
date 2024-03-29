import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import AuthBar from './AuthBar'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Chat from './Messages/Chat'

const RightNavbar = () => {  
  const userIsLogged = useSelector(state => state.auth.userLogged);

  const location = useLocation();
  const navigate = useNavigate();

  const renderComponent = () => {
    switch(location.pathname) {
      case "/messages":
        return <Chat/>;
      case "/":
        return <div></div>;
      default:
        return <div></div>;
    }
  }

  return (
    <>
            {
              userIsLogged ? 
              <>
                {renderComponent()}
              </> :
              <AuthBar />
            }
    </>
  )
}

export default RightNavbar