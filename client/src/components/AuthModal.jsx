import { Box, Button, Grid, IconButton, InputAdornment, Link, List, ListItem, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateSelect from './CommonComponents/DateSelect';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AuthModal = ({authType = 'sign up', setAuth, toggleModal}) => {
    const [ signUpData, setSignUpData ] = useState({
        password: '',
        password_confirmation: '',
        email: '',
        name: '',
        birth_date: '1970.01.01'
    });
    const [ showPass, setShowPass ] = useState(false);
    const [ showPassConfirm, setShowPassConfirm ] = useState(false);
    const [ passValid, setPassValid ] = useState(true);
    const [ passCheckpoints, setPassCheckpoints ] = useState({
        isLongEnough: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumbers: true
    })
    const [ signUpPassPage, setSignUpPassPage ] = useState(false);
    const [ signInData, setSignInData ] = useState({
        email: '',
        password: '',
    });

    const handleInputSignUp = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const dataObj = { ...signUpData };
        dataObj[fieldName] = value;
        setSignUpData(dataObj);
        if(fieldName === "password" || fieldName === "password_confirmation") {
            setTimeout(() => {
                validatePass(value)
            }, 500);
        }
    }

    const validatePass = (value) => {
        if(!value) {
            setPassCheckpoints({
                isLongEnough: true,
                hasLowerCase: true,
                hasUpperCase: true,
                hasNumbers: true,
            });
            setPassValid(false);
            return;
        }
        const lowerCaseLetters = /[a-z]+/g;
        const upperCaseLetters = /[A-Z]+/g;
        const numbers = /[0-9]/g;

        const hasLowerCase = lowerCaseLetters.test(value);
        const hasUpperCase = upperCaseLetters.test(value);
        const hasNumbers = numbers.test(value);
        const isLongEnough = value.length > 8;
        
        setPassCheckpoints({
            isLongEnough: isLongEnough,
            hasLowerCase: hasLowerCase,
            hasUpperCase: hasUpperCase,
            hasNumbers: hasNumbers,
        });
        setPassValid(hasLowerCase && hasUpperCase && hasNumbers && isLongEnough);
    }

    const signUpCheckAllFields = () => {
        if(!validateEmail()) return false;
        const { email, name, birth_date } = signUpData;
        if(!email || !name || !birth_date) return false;
        return true;
    }

    const signUp = () => {
        console.log('sign up')
    }

    const signIn = () => {
        console.log('sign in')
    }

    const signInCheckAllFields = () => {
        return true;
    }

    const validateEmail = () => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return signUpData.email === '' || emailRegexp.test(signUpData.email);
    }

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
                    {
                        signUpPassPage ?

                        <IconButton onClick={() => setSignUpPassPage(false)}>
                            <ArrowBackIcon color='black.500'/>
                        </IconButton> :

                        <IconButton onClick={() => toggleModal()}>
                            <CloseIcon color='black.500'/>
                        </IconButton>
                    }
                </Box>

                <Box sx={{
                    px: '80px'
                }}>
                    {
                        authType === 'sign up' ? (
                            <>
                                {
                                    signUpPassPage === true ? (<>
                                        <Box overflow='auto'>
                                            <TextField 
                                                onChange={(e) => handleInputSignUp(e)}
                                                name='password'
                                                error={!passValid} 
                                                margin='normal' 
                                                type={showPass ? 'text' : 'password'}
                                                value={signUpData.password}
                                                fullWidth 
                                                label='Пароль' 
                                                variant='outlined'
                                                InputProps={{
                                                    endAdornment: 
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPass(!showPass)}
                                                            //onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            >
                                                            {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                }}
                                            />

                                            <TextField 
                                                onChange={(e) => handleInputSignUp(e)}
                                                name='password_confirmation'
                                                error={
                                                    signUpData.password_confirmation != signUpData.password
                                                } 
                                                margin='normal' 
                                                type={showPassConfirm ? 'text' : 'password'}
                                                value={signUpData.password_confirmation}
                                                fullWidth 
                                                label='Подтвердите пароль' 
                                                variant='outlined'
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassConfirm(!showPassConfirm)}
                                                            edge="end"
                                                            >
                                                            {showPassConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                }}
                                            />
                                            <List dense={true}>
                                                <ListItem disablePadding={true}>
                                                    <Typography
                                                        fontSize='12px'
                                                        color={passCheckpoints.isLongEnough ? 
                                                        'grey' : 'red'}>
                                                        Пароль должен содержать не менее 8 символов
                                                    </Typography>
                                                </ListItem>
                                                <ListItem disablePadding={true}>
                                                    <Typography
                                                        fontSize='12px'
                                                        color={passCheckpoints.hasUpperCase ? 
                                                            'grey' : 'red'}>
                                                        Заглавные буквы
                                                    </Typography>
                                                </ListItem>
                                                <ListItem disablePadding={true}>
                                                    <Typography
                                                        fontSize='12px'
                                                        color={passCheckpoints.hasLowerCase ? 
                                                        'grey' : 'red'}>
                                                        Строчные буквы
                                                    </Typography>
                                                </ListItem>
                                                <ListItem disablePadding={true}>
                                                    <Typography
                                                    fontSize='12px'
                                                    color={passCheckpoints.hasNumbers ? 
                                                        'grey' : 'red'}>
                                                        Цифры
                                                    </Typography>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </>) : (<>
                                        <Typography 
                                            sx={{ 
                                                fontWeight: 800,
                                                fontSize: '24px'
                                            }}
                                            variant="h5">
                                            Создайте учетную запись
                                        </Typography>

                                        <Box overflow='auto'>
                                            <TextField 
                                                onChange={(e) => handleInputSignUp(e)}
                                                name='name'
                                                margin='normal' 
                                                value={signUpData.name}
                                                fullWidth 
                                                label='Имя' 
                                                variant='outlined' 
                                            />

                                            <TextField 
                                                onChange={(e) => handleInputSignUp(e)}
                                                name='email'
                                                error={!validateEmail()} 
                                                margin='normal' 
                                                value={signUpData.email}
                                                fullWidth 
                                                label='Эл.почта' 
                                                variant='outlined' 
                                            />

                                            <Typography sx={{ mt: 2 }} fontWeight='bold'>
                                                Дата рождения
                                            </Typography>
                                            
                                            <DateSelect 
                                                date={signUpData} 
                                                setDate={setSignUpData}
                                                dateName='birth_date'
                                                pickTime={false}
                                            />
                                        </Box>
                                    </>)
                                }
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
                    <Button 
                        fullWidth 
                        variant='contained'
                        onClick={
                            authType === "sign up" ? 
                                signUpPassPage ? () => signUp() : () => setSignUpPassPage(true) :
                                () => signIn()
                        }
                        disabled={ 
                            authType === 'sign up' 
                            ? 
                                signUpPassPage ? !passValid && signUpData.password === '' : !signUpCheckAllFields() 
                            : 
                                !signInCheckAllFields() 
                        }>
                        Далее
                    </Button>

                    <Box sx={{ py: 2 }}>
                        {
                            authType === "sign up" ? <>
                                <Typography>
                                    Уже есть аккаунт?
                                </Typography>
                                <Link 
                                    sx={{ cursor: 'pointer' }} 
                                    onClick={() => handleAuthType("sign in")}
                                >
                                    Войдите с помощью логина и пароля
                                </Link>
                            </> : <>
                                <Link 
                                    sx={{ cursor: 'pointer' }} 
                                    onClick={() => handleAuthType("sign up")}
                                >
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