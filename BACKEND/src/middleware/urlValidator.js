import {body, validationResult} from 'express-validator';

export const validators = [body('url').isURL().withMessage('Please enter a valid URL')]

export const urlValidatorMiddleware = (req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.status = 400;
        error.details = errors.array(); 
        return next(error);
    }

    next();
};

