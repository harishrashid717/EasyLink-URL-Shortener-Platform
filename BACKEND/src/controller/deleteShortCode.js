import { deleteShortCodeRow } from "../models/urlModel.js";

const deleteShortCodeController = async(req, res, next)=>{
    try{
        if(!req.user){
            const error = new Error('User Unauthorized to Delete');
            error.statusCode = 401;
            return next(error);
        }
    
        const urlId = req.params.id;
        await deleteShortCodeRow(urlId);
        return res.status(200).json({success : true, message : "Short Code data deleted successfully"});
    }catch(error){
        next(error);
    }

}
export default deleteShortCodeController;