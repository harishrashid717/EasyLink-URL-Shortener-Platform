import {findShortCodeId, findTopDateByClicks, findDeviceClicksCount} from '../models/urlModel.js'
const shortUrlStats= async(shortCode)=>{
    const shortCodeId = await findShortCodeId(shortCode);

    if(!shortCodeId){
        const error = new Error('URL not found');
        error.statusCode = 404;
        throw error;
    }
        
    const topVisitStats = await findTopDateByClicks(shortCodeId); // object
    const deviceStats = await findDeviceClicksCount(shortCodeId); // array of objects 

    const statsData = {
        topVisitStats, 
        deviceStats
    }
    return statsData;
};

export default shortUrlStats;