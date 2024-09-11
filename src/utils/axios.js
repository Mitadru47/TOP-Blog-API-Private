import axios from "axios";
import { BLOG_API_BASE_URL } from "../utils/urls";

const instance = axios.create({
    
    mode: "cors",

    headers: {
    
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    },

    baseURL: BLOG_API_BASE_URL
});

export default instance;