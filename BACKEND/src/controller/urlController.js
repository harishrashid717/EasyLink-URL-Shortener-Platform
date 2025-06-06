import generateShortUrl from "../services/generateShortUrl.js";

const createShortUrl = async(req,res, next)=>{
    const {url} = req.body;

    try{
        const {shortUrl, status} = await generateShortUrl(url);

        return (status === 200) ?  res.status(200).json({shortUrl}) : res.status(201).json({shortUrl});
        
    }catch(error){
        next(error);
    }
    
}
export default createShortUrl;