import {body} from 'express-validator';

const urlValidator = [body('url').isURL().withMessage('Please enter a valid URL')]
export default urlValidator