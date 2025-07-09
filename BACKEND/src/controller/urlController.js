import {generateAnonymousShortUrl, geterateShortUrl} from "../services/generateShortUrl.js";

export const createAnonymousShortUrl = async(url)=>{
        const result = await generateAnonymousShortUrl(url);
        return result;
}

export const createShortUrl = async(url, user) =>{
        const result = await geterateShortUrl(url , user);
        return result;
}