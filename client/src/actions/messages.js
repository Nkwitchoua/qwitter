import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const URL = 'http://localhost:5000/messages';
const socketUrl = "http://localhost:3001";
let socket;
let prevTimeout = null;

export const getMessages = (user) => async (dispatch) => {
    console.log('dispatch CHAT DATA -> ', chatId);
    axios.defaults.withCredentials = true
    socket = io(socketUrl);
    // dispatch({ type: "CHAT_IS_LOADING" });
    try {
        axios.get(URL + '/get_messages', chatId)
            .then(res => {
                console.log("res from GET_CHAT -> ", res);
                // dispatch({ type: "SET_CHAT", payload: res.data });
            })
            .catch(err => {
                console.log("ERROR IN GET CHAT", err);
                // dispatch({ type: "SET_CHAT_ERROR", payload: err.response.data || {} });
            });
    } catch(err) {
        console.log(err);
    }
}

export const searchUsers = (query) => async (dispatch) => {
    dispatch({ type: "SEARCHING_USERS"});
    
    if(!query) {
        return;
    }

    if(prevTimeout) {
        clearTimeout(prevTimeout);
        prevTimeout = null;
    }

    prevTimeout = setTimeout(() => {
        try {
            axios.get(URL + '/search_users', {
                params: {
                    query: query
                }
            })
            .then(res => {
                console.log("res from SEARCH_USERS -> ", res);

                dispatch({ type: "USERS_FOUND", payload: res.data });
            })
            .catch(err => {
                console.log("ERROR IN SEARCH USERS", err);
                // dispatch({ type: "SET_CHAT_ERROR", payload: err.response.data || {} });
            });
        } catch(err) {
            console.log(err);
        }
    }, 700);
}