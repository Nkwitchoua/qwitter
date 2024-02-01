const URL = "http://localhost:5000/posts";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
    // console.log('dispatch posts -> ',dispatch)
    try {
        const { data } = await axios.get(URL, { withCredentials: true });

        dispatch({ type: "FETCH_POSTS", payload: data.posts });
        
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await axios.post(URL, post);

        dispatch({ type: "CREATE_POST", payload: data });
    } catch (error) {
        console.log(`Error in actions -> posts.js -> createPost() ${error.message}`);
    }
}