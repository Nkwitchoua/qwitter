import axios from "axios";

const Interceptor = () => {
    console.log("before anything");

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
        function(config) {
            console.log("RESPONSE CONFIG ->", config);
            return config;
        }
    )
}

export default Interceptor;