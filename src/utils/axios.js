import axios from "axios";

const instance = axios.create({
    baseUrl: "https://readit-backend.herouapp.com"
})

export default instance;