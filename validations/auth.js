import { body } from "express-validator";

export const reqisterValidator = [
  body("login", "3 chars min.").isLength({ min: 3 }),
  body("password", "4 chars min.").isLength({ min: 4 })
];
