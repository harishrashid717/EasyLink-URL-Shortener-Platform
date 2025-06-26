import { getFullUrlByShortCode, updateClickByShortCode } from "../dao/urlDao.js";
import dotenv from 'dotenv'
dotenv.config();
const redirectToFullUrl = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;
    const fullUrl = await getFullUrlByShortCode(shortCode);
    if (!fullUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    
    await updateClickByShortCode(shortCode);
    res.redirect(302, fullUrl);
  } catch (error) {
    next(error);
  }
};
export default redirectToFullUrl;
