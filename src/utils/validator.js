import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string()
    .min(4, "Password can't be less than 4 characters")
    .max(32, "Password can't be more than 32 characters")
    .required("Password is required."),
});
