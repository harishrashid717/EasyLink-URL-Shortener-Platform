import {nanoid} from "nanoid";
import { findUrlByOriginal, saveShortUrl, increaseClicksCountByShortUrl } from "../models/urlModel.js";
const generateShortUrl = async (url) => {
  const existing = await findUrlByOriginal(url);
  if (existing) {
    const shortUrl = existing;
    await increaseClicksCountByShortUrl(shortUrl);
    return { shortUrl, status: 200 };
  }

  const shortCode = nanoid(7);
  const shortUrl = `${process.env.BASE_URL}${shortCode}`;

  await saveShortUrl(shortUrl, url);
  await increaseClicksCountByShortUrl(shortUrl);
  return { shortUrl, status: 201 };
};
export default generateShortUrl;