import { body } from "express-validator";

export const taskValidator = [
    body("user", "Please choose the user to asssign this task").isLength({
        min: 1,
    }),
    body("task", "This field must not be empty").isLength({ min: 1 }),
    body("title", "This field must not be empty").isLength({ min: 1 })
];
