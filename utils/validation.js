import { body } from "express-validator";

import { getUserByEmail } from "../db/queries.js";

const alphaErr = "must only contain letters";
const emailErr = "Email must be formatted properly";
const passwordErr = "Passwords do not match";
const lengthErr = (max, min = 1) => {
  return `must be between ${min} and ${max} characters`;
};

export const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`First name ${lengthErr(15)}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`Last name ${lengthErr(15)}`),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage(emailErr)
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) throw new Error("E-mail already in use");
    }),
  body("password")
    .trim()
    .isLength({ min: 6, max: 25 })
    .withMessage(`Password ${lengthErr(25, 6)}`),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(passwordErr),
];

export const validatePost = [
  body("title")
    .trim()
    .isAlpha("en-US", { ignore: /\s/ })
    .withMessage(`Title ${alphaErr}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`Title ${lengthErr(20, 3)}`),
  body("message")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage(`Message ${lengthErr(200, 10)}`),
];
