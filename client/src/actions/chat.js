import axios from "axios";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

const URL = 'http://localhost:5000/messages';
const socketUrl = "http://localhost:5001"
var socket = io(socketUrl, { autoConnect: false });

// const dispatch = useDispatch();

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
            
            socket.connect();
        
            socket.onAny((event, ...args) => {
                console.log(event, args);
            });

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

export const setChat = (sender, receiver, receiverData) => (dispatch) => {
    console.log("RECEIVER DATA -> ", receiverData);
    dispatch({ type: "SET_CHAT", payload: {sender: sender, receiver: receiver, name: receiverData.name, avatar: receiverData.avatar} });
}

export const sendMessage = (message) => {
    try {
        socket.emit("private message", message);
    } catch(err) {
        console.log(err);
    }
}