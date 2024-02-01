import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser, tokenIsValid } from "../actions/auth";

const Interceptor = () => {
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true
    
    const api = axios.create({
        baseURL: 'http://localhost:5000'
    });
    
    axios.interceptors.request.use(
        function(config) {
            console.log("config -> ", config);
            const access_token = sessionStorage.getItem('access_token');
            try {
                if(access_token) {
                    config.headers.Authorization = `Bearer ${access_token}`;
                }
            } catch(err) {

            }
            return config;
        }
    )

    axios.interceptors.response.use(
        function(response) {
            console.log("RESPONSE CONFIG ->", response);
            if(response.data.authData && response.data.authData.authorized) {
                dispatch(tokenIsValid(response.data.authData));
                dispatch(setCurrentUser(response.data.currentUser));
            }
            return Promise.resolve(response);
        },
        function(err) {
            console.log("ERROR IN RESPONSE INTERCEPTOR", err);
            return Promise.reject(err);
        }
    )
}

export default Interceptor;