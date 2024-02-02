import axios from "axios";

const URL = 'http://localhost:5000/auth';

export const signUp = (data) => async (dispatch) => {
    console.log('dispatch sign up data -> ', data);
    dispatch({ type: "USER_IS_LOGGING" });
    try {
        axios.post(URL + '/signup', data)
            .then(res => {
                sessionStorage.setItem('access_token', res.data.access_token);

                dispatch({ type: "SIGN_UP", payload: res.data });
            })
            .catch(err => {
                dispatch({ type: "SIGN_UP_ERROR", payload: err.response.data || {} });
            });
    } catch(err) {
        console.log(err);
    }
}

export const signIn = (data) => async (dispatch) => {
    dispatch({ type: "USER_IS_LOGGING" });
    try {
        axios.post(URL + '/signin', data)
            .then((res) => {
                sessionStorage.setItem('access_token', res.data.authData.access_token);

                console.log("auth DATA -> ", res.data);

                dispatch({ type: "SIGN_IN", payload: res.data.authData });
                dispatch({ type: "SET_CURRENT_USER", payload: res.data.currentUser });
            })
            .catch(err => {
                console.log('error -> ', err);
                dispatch({ type: "SIGN_IN_ERROR", payload: "error" });
            });
    } catch(err) {
        console.log(err);
    }
}

export const logOut = () => (dispatch) => {
    sessionStorage.removeItem("access_token");
    axios.post(URL + "/signout").then(res => {
        console.log("LOG OUT ACTION -----> ");
        dispatch({ type: "SIGN_OUT", payload: res });
    }).catch(err => {
        console.log("error in log out -> ", err);
    })
}

export const tokenIsValid = (data) => (dispatch) => {
    console.log("token is Valid -> ", data);
    dispatch({ type: "SIGN_IN", payload: data });
}

export const setCurrentUser = (data) => (dispatch) => {
    dispatch({ type: "SET_CURRENT_USER", payload: data });
}