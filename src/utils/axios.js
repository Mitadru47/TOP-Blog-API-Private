import axios from "axios";

const instance = axios.create({
    
    mode: "cors",

    headers: {
    
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    },

    baseURL: "http://localhost:3000/"
});

export default instance;