const INIT_STATE = {
    userLogged: false,
    userIsLogging: false,
    userName: '',
    userId: '',
    signUpError: '',
}

export default (authState = INIT_STATE, action) => {
    console.log(' authState -> -> -> ', action, authState);
    switch(action.type) {
        case "SIGN_UP":
            return {
                ...authState,
                userLogged: true,
                userIsLogging: false,
            }
        case "SIGN_IN":
            return {
                ...authState,
                userLogged: true,
                userIsLogging: false
            }
        case "SIGN_UP_ERROR":
            return {
                ...authState,
                userIsLogging: false,
                signUpError: action.payload.errorMessage
            }
        case "SIGN_IN_ERROR":
            return {
                ...authState,
                userIsLogging: false,
                signUpError: action.payload.errorMessage
            }
        case "SIGN_OUT":
            return {
                ...authState
            };
        case "USER_IS_LOGGING":
            return {
                ...authState,
                userIsLogging: true
            }
        default:
            return authState;
    }
}