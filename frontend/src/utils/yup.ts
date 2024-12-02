import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
