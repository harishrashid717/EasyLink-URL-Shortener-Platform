import { getFullUrlByShortUrl } from "../dao/userDao.js";
import dotenv from 'dotenv'
dotenv.config();
const redirectToFullUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const shortUrl = `${process.env.BASE_URL}${id}`;
    const fullUrl = await getFullUrlByShortUrl(shortUrl);
    if (!fullUrl) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.redirect(302, fullUrl);
  } catch (error) {
    next(error);
  }
};
export default redirectToFullUrl;
