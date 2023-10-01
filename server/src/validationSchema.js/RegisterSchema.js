import { check } from "express-validator";

export const RegisterSchema=[
   check('name').trim().isAlpha()
   .withMessage("Name should be alphabets only"),
   check('username','username is required').exists()
   .isAlphanumeric().withMessage("username should be alphanumeric character only and length between 6 and 32")
   .trim().isLength({min:6,max:32}),

   check('password','Password is requires').exists().isLength({min:6,max:100}).trim(),

   check('email','email is requires').exists().isEmail(),
]