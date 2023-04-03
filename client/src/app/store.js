import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

const initialState = {
    links: [
        { text: "Home", path: '/' },
    ]
}

const linksReducer = (state = initialState, action) => state;

export const getLinks = ({ links }) => links;

export default configureStore({
    reducer: reducers,
    linksReducer
})