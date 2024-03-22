const INIT_STATE = {
    chatLoading: true,
    chatLoaded: false,
    sender: "",
    receiver: "",
    receiverName: "",
    receiverAvatar: "",
    messages: []
}

export default (state = INIT_STATE, action) => {
    
    switch(action.type) {
        case "SET_CHAT":
            return {
                ...state,
                sender: action.payload.sender,
                receiver: action.payload.receiver,
                receiverName: action.payload.name,
                receiverAvatar: action.payload.avatar
            }
        case "SET_CHAT_DATA":
            return {
                ...state,
                messages: action.payload.messages
            }

        default:
            return state;
    }
}