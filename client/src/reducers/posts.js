const INIT_STATE = {
    posts: [],
}

export default (posts = INIT_STATE.posts, action) => {
    switch(action.type) {
        case "FETCH_POSTS":
            return action.payload;
        case "CREATE_POST":
            return [...posts, action.payload];
        default:
            return posts;
    }
}