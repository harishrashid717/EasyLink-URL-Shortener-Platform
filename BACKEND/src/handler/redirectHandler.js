import { findShortCodeId , findUserIdByShortCode } from "../models/urlModel.js";
import { anonymousRedirectController, userRedirectController } from "../controller/reDirectController.js";

const redirectHandler = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;
    const device = req.device;
    const userId = await findUserIdByShortCode(shortCode)
    const urlId = await findShortCodeId(shortCode);

    let fullUrl;
    if (userId) {
      fullUrl = await userRedirectController(shortCode, urlId, device);
    } else {
      fullUrl = await anonymousRedirectController(shortCode);
    }

    return res.redirect(301, fullUrl); 
  } catch (error) {
    next(error);
  }
};

export default redirectHandler;
