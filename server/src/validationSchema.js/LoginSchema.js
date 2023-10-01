import { check } from "express-validator";

export const LoginSchema=[

   check('username','username is required').exists()
   .isAlphanumeric().withMessage("username should be alphanumeric character only and length between 6 and 32")
   .trim().isLength({min:6,max:32}),


   check('password','Password is requires').exists().isLength({min:6,max:100}).trim(),
]