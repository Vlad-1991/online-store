import axios, {AxiosInstance} from "axios";
import router from "@/router";

const requestAxios: AxiosInstance = axios.create({
    // baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, (error: Error) => {
    // if(error.response.status === 401){
    //     router.push('/auth?message=auth')
    // }

    return Promise.reject(error);
});

export default requestAxios