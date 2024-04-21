import * as yup from "yup";

const regexPass =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const useSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(regexPass, {
      message:
        "At least 1 upper case character, 1 numerical number, 1 special character  ",
    })
    .required("Required"),
});
