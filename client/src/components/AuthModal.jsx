import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, List, ListItem, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateSelect from './CommonComponents/DateSelect';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayDate } from '../actions/commonTools';
import { signIn, signUp } from '../actions/auth';

const AuthModal = ({authType = 'sign up', setAuth, toggleModal}) => {
    const dispatch = useDispatch();
    const todayDate = useSelector(state => state.commonTools.todayDate);
    const userIsLogging = useSelector(state => state.auth.userIsLogging);
    const userLogged = useSelector(state => {
        console.log(state);
        return state.userLogged;
    });

    const [ signUpData, setSignUpData ] = useState({
        password: '',
        password_confirmation: '',
        email: '',
        name: '',
        birth_date: '1970.01.01'
    });

    const [ showPass, setShowPass ] = useState(false);
    const [ showPassConfirm, setShowPassConfirm ] = useState(false);
    const [ passValid, setPassValid ] = useState(false);
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
        if(fieldName === "password") {
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
    
    const validateEmail = () => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return signUpData.email === '' || emailRegexp.test(signUpData.email);
    }

    const handleInputSignIn = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        const dataObj = { ...signInData };
        dataObj[fieldName] = value;
        setSignInData(dataObj);
    }

    const submitSignUp = (data) => {
        dispatch(signUp(data));
    }

    const submitSignIn = (data) => {
        console.log(data);
        dispatch(signIn(data));
    }

    const signInCheckAllFields = () => {
        return true;
    }

    const handleSignUpData = () => {
        setSignUpData({
            ...signUpData,
            birth_date: todayDate
        });
    }

    const handleAuthType = (authName) => {
        if(!authName || typeof(authName) !== "string") return;
        setAuth(authName);
    }

    useEffect(() => {
        if(authType === 'sign up') {
            dispatch(getTodayDate());
        }
    }, [dispatch]);
    
    useEffect(() => {
        if(todayDate && authType === 'sign up') {
            handleSignUpData();
        }
    }, [todayDate]);

    //useEffect(() => {
        console.log('userIsLogging Auth Modal',userIsLogging);
        if(userIsLogging) {
            return (
                <Modal
                    open={true}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={{
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
                </Modal>
            )
        }
    //}, [userIsLogging])

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
                                                error={!passValid && signUpData.password} 
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
                                                <ListItem disablePadding={true}>
                                                    <Typography
                                                    fontSize='12px'
                                                    color={signUpData.password === signUpData.password_confirmation || !signUpData.password ? 
                                                        'grey' : 'red'}>
                                                        Пароли должны совпадать
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
                                    <TextField 
                                        margin='normal' 
                                        fullWidth 
                                        label='Эл.почта' 
                                        name='email'
                                        variant='outlined'
                                        value={signInData.email}
                                        onChange={(e) => handleInputSignIn(e)} />
                                    <TextField 
                                        margin='normal' 
                                        fullWidth 
                                        name='password'
                                        type={ showPass ? 'text' : 'password'}
                                        label='Пароль'
                                        variant='outlined'
                                        value={signInData.password}
                                        onChange={(e) => handleInputSignIn(e)} 
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
                                        }}/>
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
                                signUpPassPage ? () => submitSignUp(signUpData) : () => setSignUpPassPage(true) :
                                () => submitSignIn(signInData)
                        }
                        disabled={ 
                            authType === 'sign up' 
                            ? 
                                signUpPassPage 
                                ? 
                                    !passValid || signUpData.password === '' || 
                                    signUpData.password !== signUpData.password_confirmation 
                                : 
                                    !signUpCheckAllFields() 
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