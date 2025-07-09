import express from "express";
import { registerUser , loginUser, logoutUser} from "../controller/authController.js";
import  {registerValidator, loginValidator}  from "../validators/authValidators.js";
import validateRequest from "../middleware/validateRequest.js";
const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post('/login', loginValidator, validateRequest, loginUser)
router.post('/logout', logoutUser)
export default router;
