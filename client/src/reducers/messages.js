const INIT_STATE = {
    chatsLoading: true,
    chatsLoaded: false,
    chats: [],
    usersSearching: false,
    usersFound: false,
    users: []
}

export default (messagesState = INIT_STATE, action) => {
    switch(action.type) {

        case "SEARCHING_USERS":
            return {
                ...messagesState,
                usersSearching: true,
                usersFound: false,
                users: []
            }

        case "USERS_FOUND":
            console.log("USERS PAYLOAD -> ", action.payload)
            return {
                ...messagesState,
                usersFound: true,
                usersSearching: false,
                users: action.payload
            }

        default:
            return messagesState;
    }
}