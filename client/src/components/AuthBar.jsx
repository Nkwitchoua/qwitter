import { Button, Container, Grid, IconButton, Modal, Select, TextField, ThemeProvider, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react';
import theme from '../styles/Theme';
import CloseIcon from '@mui/icons-material/Close';
//import GoogleIcon from '@mui/icons-material/Google';
import { SvgIcon } from '@mui/material';
import GoogleIcon from '../assets/icons8-google.svg';
import AuthModal from './AuthModal';

const AuthBar = () => {

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ auth, setAuth ] = useState('');
    const toggleModal = (authType) => {
        setModalOpen(!modalOpen);
        if(authType && typeof(authType) === "string") {
            setAuth(authType);
        }
    }

    return (
        <>
            <Container 
             maxWidth={"sm"}
             sx={{
                border: 1, 
                borderColor: 'grey.200',
                borderRadius: '20px',
                py: 2,
                m: 4,
                position: "fixed",
                display: 'flex',
                flexDirection: 'column',
                gap: '20px', 
                minWidth: '340px',
            }}>
                <Typography 
                    component='h4' 
                    sx={{ 
                        fontWeight: 800,
                        fontSize: '20px'
                    }}
                >
                    Впервые в Твиттере?
                </Typography>
                <Typography 
                    component="p" 
                    fontSize={12}
                    color='grey'>
                    Зарегистрируйтесь прямо сейчас, чтобы персонализировать свою ленту!
                </Typography>

                <Button 
                    variant="outlined"
                    fullWidth 
                    endIcon={<SvgIcon viewBox='0 0 46 46' component={GoogleIcon}/>}
                    sx={{ 
                        borderRadius: 50,
                        px: 2,
                        py: 1,
                        textOverflow: 'ellipsis'
                    }}
                    onClick={() => toggleModal()}
                >
                    <Typography 
                    textTransform='initial'
                    sx={{ 
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        letterSpacing: '0.05em'
                    }}>
                        Регистрация с помощью Google
                    </Typography> 
                </Button>

                <Button 
                    variant="outlined"
                    fullWidth 
                    sx={{ 
                        borderRadius: 50,
                        px: 2,
                        py: 1,
                        textOverflow: 'ellipsis'
                    }}
                    onClick={() => toggleModal("sign up")}
                >
                    <Typography 
                    component='p'
                    textTransform='initial'
                    sx={{ 
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '12px',
                    }}>
                        Зарегистрироваться
                    </Typography> 
                </Button>

                <Button 
                    variant="outlined"
                    fullWidth 
                    sx={{ 
                        borderRadius: 50,
                        px: 2,
                        py: 1,
                        textOverflow: 'ellipsis'
                    }}
                    onClick={() => toggleModal("sign in")}
                >
                    <Typography 
                    component='p'
                    textTransform='initial'
                    sx={{ 
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '12px',
                    }}>
                        Войти
                    </Typography> 
                </Button>
            </Container>
            {
                modalOpen ? <AuthModal authType={auth} setAuth={setAuth} toggleModal={toggleModal}/> : <></>
            }
        </>
        
    )
}

export default AuthBar