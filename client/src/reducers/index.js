import { combineReducers } from "redux";

import posts from "./posts.js";
import commonTools from './commonTools.js';
import auth from "./auth.js";
import chat from "./chat.js";
import messages from "./messages.js";

export default combineReducers({
    posts,
    commonTools,
    auth,
    chat,
    messages
});