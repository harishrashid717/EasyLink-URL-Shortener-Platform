import express from "express";
import { registerUser , loginUser} from "../controller/authController.js";
import  registerValidator  from "../validators/authValidators.js";
import validateRequest from "../middleware/validateRequest.js";
const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post('/login', loginUser)

export default router;
