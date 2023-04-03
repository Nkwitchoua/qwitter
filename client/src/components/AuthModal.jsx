import { Box, Button, Grid, IconButton, Link, Modal, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const AuthModal = ({authType = 'sign up', setAuth, toggleModal}) => {

    const handleAuthType = (authName) => {
        if(!authName || typeof(authName) !== "string") return;
        setAuth(authName);
    }

    return (
        <Modal
            open={true}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={{
                display: 'grid',
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '600px',
                height: '600px',
                my: 3,
                mx: 'auto',
                }}>
                <Box px={2} display='flex' alignItems='center' gap={3}>
                    <IconButton onClick={() => toggleModal()}>
                        <CloseIcon color='black.500'/>
                    </IconButton>
                </Box>

                <Box sx={{
                    px: '80px'
                }}>
                    {
                        authType === 'sign up' ? (
                            <>
                                <Typography 
                                    sx={{ 
                                        fontWeight: 800,
                                        fontSize: '24px'
                                    }}
                                    variant="h5">
                                    Создайте учетную запись
                                </Typography>

                                <Box overflow='auto'>
                                    <TextField margin='normal' fullWidth label='Имя' variant='outlined' />
                                    <TextField margin='normal' fullWidth label='Телефон' variant='outlined' />
                                    <Typography sx={{ mt: 2 }} fontWeight='bold'>
                                        Дата рождения
                                    </Typography>

                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Select 
                                                label='Месяц'
                                                fullWidth>

                                            </Select>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Select 
                                                label='День'
                                                fullWidth>

                                            </Select>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Select 
                                                label='Год'
                                                fullWidth>

                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography 
                                    sx={{ 
                                        fontWeight: 800,
                                        fontSize: '24px'
                                    }}
                                    variant="h5">
                                    Войдите в свой аккаунт
                                </Typography>
                                
                                <Box overflow='auto'>
                                    <TextField margin='normal' fullWidth label='Логин' variant='outlined' />
                                    <TextField margin='normal' fullWidth label='Пароль' variant='outlined' />
                                </Box>
                            </>
                        )
                    }
                </Box>

                <Box px='80px'>
                    <Button fullWidth variant='contained'>
                        Далее
                    </Button>
                    <Box sx={{ py: 2 }}>
                        {
                            authType === "sign up" ? <>
                                <Typography>
                                    Уже есть аккаунт?
                                </Typography>
                                <Link sx={{ cursor: 'pointer' }} onClick={() => handleAuthType("sign in")}>
                                    Войдите с помощью логина и пароля
                                </Link>
                            </> : <>
                                <Link 
                                    sx={{ cursor: 'pointer' }} 
                                    onClick={() => handleAuthType("sign up")}>
                                    Создайте новый аккаунт
                                </Link>
                            </>
                        }
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AuthModal