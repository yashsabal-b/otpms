import { body, validationResult } from "express-validator";

function registerValidation() {
  return [
    body("firstname", "FirstName is Required").notEmpty().isLength({ max: 30 }),
    body("lastname", "lastName is Required").notEmpty().isLength({ max: 30 }),
    body("email", "Email Is Invalid").isEmail(),
    body(
      "password",
      "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character"
    ).isStrongPassword(),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password & Confirm Password do not match");
      } else {
        return true;
      }
    }),
  ];
}

function userLoginValidatorRules() {
  return [
    body("password", "Password is Required").notEmpty(),
    body("email", "Email is Required").isEmail(),
  ];
}
// function userOtpValidatorRules() {
//     return [
//         body("password", "Password is Required").notEmpty(),
//         body("email", "Email is Required").isEmail(),
//     ]
// }
function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export { registerValidation, userLoginValidatorRules, errorMiddleware };
