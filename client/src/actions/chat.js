import axios from "axios";
import io from "socket.io-client";

const URL = 'http://localhost:5000/messages';
const socketUrl = "http://localhost:3001"
var socket;

export const getChat = (chatId = "") => async (dispatch) => {
    console.log('dispatch CHAT DATA -> ', chatId);
    axios.defaults.withCredentials = true
    socket = io(socketUrl);
    // dispatch({ type: "CHAT_IS_LOADING" });
    try {
        axios.get(URL + '/get_chat', chatId)
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

export const sendMessage = (message) => {
    try {
        socket.emit("chat message", message);
    } catch(err) {
        console.log(err);
    }
}