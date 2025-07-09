import { 
  getShortCodeByFullUrl, 
  saveShortCodeFullUrl, 
  updateClickByShortCode,
  getFullUrlByShortCode,
  getShortCodeId,
  insert_UrlShortCodeUserId,
  findUserById,
  getTopDateByClicks,
  getDeviceClicksCount ,
  addUrlVisitLog,
  getUserIdByShortCode
} from "../dao/urlDao.js";


// SHORT CODE RELATED
export const shortCodeByFullUrl = async (url) => {
  return await getShortCodeByFullUrl(url);
};

export const saveAnonymousShortCode = async (shortCode, url) => {
  return await saveShortCodeFullUrl(shortCode, url);
};

export const findShortCodeId = async (shortCode) => {
  return await getShortCodeId(shortCode);
};

export const findFullUrlByShortCode = async (shortCode) => {
  return await getFullUrlByShortCode(shortCode);
};

export const increaseClicksCountByShortCode = async (shortCode) => {
  return await updateClickByShortCode(shortCode);
};


// USER RELATED
export const getUserById = async (id) => {
  return await findUserById(id);
};

export const saveUserShortCode = async (url, shortCode, id) => {
  return await insert_UrlShortCodeUserId(url, shortCode, id);
};

export const findUserIdByShortCode = async(shortCode)=>{
  return await getUserIdByShortCode(shortCode);
}

// ANALYTICS RELATED
export const findTopDateByClicks = async (urlId) => {
  return await getTopDateByClicks(urlId);
};

export const findDeviceClicksCount = async (urlId) => {
  return await getDeviceClicksCount(urlId);
};

export const updateUrlVisitLog = async(urlId, device) =>{
  return await addUrlVisitLog(urlId, device);
}