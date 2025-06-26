import { getShortCodeByFullUrl, saveShortCodeFullUrl, updateClickByShortCode } from "../dao/urlDao.js";
export const shortCodeByFullUrl = async (url) => {
  return await getShortCodeByFullUrl(url);
};

export const saveShortCode = async (shortCode, url) => {
  return await saveShortCodeFullUrl(shortCode, url);
};

export const increaseClicksCountByShortCode = async(shortCode) =>{
  return await updateClickByShortCode(shortCode);
}