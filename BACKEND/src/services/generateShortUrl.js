import {nanoid} from "nanoid";
import { shortCodeByFullUrl, saveAnonymousShortCode , getUserById, saveUserShortCode} from "../models/urlModel.js";

export const generateAnonymousShortUrl = async (url) => {
  const dbShortCode = await shortCodeByFullUrl(url);
  if (dbShortCode) {
    const shortUrl = `${process.env.BASE_URL}${dbShortCode}`
    return { shortUrl, status: 200 };
  }

  const shortCode = nanoid(7);
  const shortUrl = `${process.env.BASE_URL}${shortCode}`;

  await saveAnonymousShortCode(shortCode, url);
  return { shortUrl, status: 201 };
};

export const geterateShortUrl = async (url, user)=>{
    const getUser = await getUserById(user.id);
    if(!getUser) {
      const error = new Error('Unauthorized user');
      error.statusCode = 401;
      throw error;
    }

    const dbShortCode = await shortCodeByFullUrl(url);

    if (dbShortCode) {
    const shortUrl = `${process.env.BASE_URL}${dbShortCode}`
    return { shortUrl, status: 200 };
    }

     const shortCode = nanoid(7);
     const shortUrl = `${process.env.BASE_URL}${shortCode}`;

     await saveUserShortCode(url, shortCode, user.id);
     return { shortUrl, status: 201 }
}