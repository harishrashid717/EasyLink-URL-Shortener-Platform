import axiosInstance from "../utils/axiosInstance";
const createShortUrl = async(originalUrl)=>{
    try{
        const response = await axiosInstance.post('api/short-urls', {url : originalUrl});
        console.log(response.data.shortUrl);
        return response.data.shortUrl;
    }catch(error){
           throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong while shortening the URL"
    );
    }
}
export default createShortUrl;