import axios from "axios";

const URL = 'http://localhost:5000/auth';

export const signUp = (data) => async (dispatch) => {
    console.log('dispatch sign up data -> ', data);
    dispatch({ type: "USER_IS_LOGGING" });
    try {
        axios.post(URL + '/signup', data)
            .then(res => {
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

                dispatch({ type: "SIGN_IN", payload: res.data });
            })
            .catch(err => {
                console.log('error -> ', err.response)
                dispatch({ type: "SIGN_IN_ERROR", payload: err.response.data || {} });
            });
    } catch(err) {
        console.log(err);
    }
}

export const checkUserToken = (token) => async (dispatch) => {
    if(!token) return;

    try {
        axios.post(URL + '/check_token', token)
            .then(res => {
                
            })
            .catch(err => {
                //console.log('')
            })
    }
}