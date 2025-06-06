import { getShortUrlByFullUrl, saveShortUrlFullUrl, updateClickByShortUrl } from "../dao/userDao.js";
export const findUrlByOriginal = async (url) => {
  return await getShortUrlByFullUrl(url);
};

export const saveShortUrl = async (shortUrl, url) => {
  return await saveShortUrlFullUrl(shortUrl, url);
};

export const increaseClicksCountByShortUrl = async(shortUrl) =>{
  return await updateClickByShortUrl(shortUrl);
}