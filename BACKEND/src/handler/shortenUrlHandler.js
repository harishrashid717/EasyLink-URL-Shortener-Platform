import {createAnonymousShortUrl, createShortUrl} from '../controller/urlController.js'
const shortenUrlHandler = async(req, res, next)=>{
    try{
        const url = req.body.url;
        const user = req.user;
        if(user){
            const result = await createShortUrl(url, user);
            return res.status(result.status).json({shortUrl : result.shortUrl});
        }else{
            const result = await createAnonymousShortUrl(url); 
            return res.status(result.status).json({shortUrl : result.shortUrl})
        }
        
    }catch(error){
        next(error);
    }
}
export default shortenUrlHandler;