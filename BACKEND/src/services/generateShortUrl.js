import {nanoid} from "nanoid";
import { shortCodeByFullUrl, saveShortCode, increaseClicksCountByShortCode } from "../models/urlModel.js";
const generateShortUrl = async (url) => {
  const dbShortCode = await shortCodeByFullUrl(url);
  if (dbShortCode) {
    const shortUrl = `${process.env.BASE_URL}${dbShortCode}`
    await increaseClicksCountByShortCode(dbShortCode);
    return { shortUrl, status: 200 };
  }

  const shortCode = nanoid(7);
  const shortUrl = `${process.env.BASE_URL}${shortCode}`;

  await saveShortCode(shortCode, url);
  await increaseClicksCountByShortCode(shortCode);
  return { shortUrl, status: 201 };
};
export default generateShortUrl;