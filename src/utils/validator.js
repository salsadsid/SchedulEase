import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .max(32, "Password can't be more than 32 characters")
    .required("Password is required."),
});

export const signUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 6 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .max(32, "Password can't be more than 32 characters")
    .required("Password is required."),
});

export const appointmentSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
});
