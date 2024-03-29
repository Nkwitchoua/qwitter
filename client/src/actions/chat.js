import axios from "axios";
import { useDispatch } from "react-redux";
import socket from "../http/socket";

const URL = 'http://localhost:5000/messages';

// const dispatch = useDispatch();

export const receiverMessage = (message) => async (dispatch) => {

}

export const getChat = (sender, receiver) => async (dispatch) => {

    const data = {
        sender: sender,
        receiver: receiver
    };
    axios.defaults.withCredentials = true;
    
    // dispatch({ type: "CHAT_IS_LOADING" });
    try {
        axios.post(URL + '/open_chat', data)
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

socket.on("private message", (message) => {
    console.log("private MESSAGE -> ", message);
});

export const setChat = (sender, receiver, receiverData) => (dispatch) => {
    console.log("RECEIVER DATA -> ", receiverData);
    dispatch({ type: "SET_CHAT", payload: {sender: sender, receiver: receiver, name: receiverData.name, avatar: receiverData.avatar} });
}

export const sendMessage = (message, receiver) => {
    try {
        socket.emit("private message", { content: message, receiver: receiver});
    } catch(err) {
        console.log(err);
    }
}