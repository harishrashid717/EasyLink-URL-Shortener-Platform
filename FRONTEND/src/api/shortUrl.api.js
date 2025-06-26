import axios from "axios"
import axiosInstance from "../utils/axiosInstance";
const createShortUrl = async(originalUrl)=>{
    try{
        const response = await axiosInstance.post('api/short-urls', {url : originalUrl});
        console.log(response.data.shortUrl);
        return response.data.shortUrl;
    }catch(error){
        const errorMessage = new Error(error.message)
        return errorMessage;
    }
}
export default createShortUrl;