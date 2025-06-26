import registerUserService from "../services/registerUser.js";
import loginService from "../services/loginUser.js";
export const registerUser = async (req, res, next) => {
  try {
    const { username, full_name, email, password } = req.body;

    const { newUser, token } = await registerUserService(username, full_name, email, password); 

    if (newUser) { 
      req.user = newUser;
      res.cookie('accessToken', token, { sameSite: 'strict' }); 
      res.status(201).json({ message: 'User successfully registered' });
    } else {
      const error = new Error('Failed to register, try again');
      error.statusCode = 500;
      next(error);
    }
  } catch (error) {
    next(error); 
  }
};

export const loginUser = async(req, res, next) =>{
  try{

    const {email, password} = req.body;
    const{user, token} = await loginService(email, password);

    if(user){
      req.user = user;
      res.cookie('authToken', token, { sameSite: 'strict' });
      res.status(200).json({'message' : "user successfully logined"});

    }else{
      const error = new Error('email or password incorrect ');
      error.statusCode = 404;
      next(error);
    }


  }catch(error){
    next(error);
  }


}