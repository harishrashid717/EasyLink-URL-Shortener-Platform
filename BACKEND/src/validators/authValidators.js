import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "useranme must be alphanumeric and between 5 and 20 characters"
    ),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("full_name")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Full name must contain only letters and spaces")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email"),
   body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]
