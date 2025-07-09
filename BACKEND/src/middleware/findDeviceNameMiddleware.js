import {UAParser} from "ua-parser-js";

const findDeviceName = async (req, res, next) => {
  try {
    const parser = new UAParser(req.headers["user-agent"]);
    const deviceType = parser.getDevice().type || "desktop";

    let device;
    switch (deviceType?.toLowerCase()) {
      case "mobile":
        device = "Mobile";
        break;
      case "tablet":
        device = "Tablet";
        break;
      case "e-reader":
        device = "E-Reader";
        break;
      case "desktop":
      case "smarttv":
      case "console":
      case "wearable":
        device = "Desktop";
        break;
      default:
        device = "Unknown";
        break;
    }

    req.device = device;
    next();
  } catch (error) {
    error.stausCode = 500;
    next(error);
  }
};

export default findDeviceName;
