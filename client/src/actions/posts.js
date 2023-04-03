const URL = "http://localhost:5000/posts";
import axios from "axios";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(URL);
        console.log(data);
        dispatch({ type: "FETCH_POSTS", payload: data });
        
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        console.log("post -> " + post);
        const { data } = await axios.post(URL, post);

        dispatch({ type: "CREATE_POST", payload: data });
        console.log('data -> ', data);
    } catch (error) {
        console.log(`Error in actions -> posts.js -> createPost() ${error.message}`);
    }
}