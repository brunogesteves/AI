import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  birthDate: Yup.string().required("BirthDate is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const UpdateSchema = Yup.object().shape({
  firstname: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Name is required"),
  birthDate: Yup.string().required("BirthDate is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const SignInSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const CreateProjectSchema = Yup.object().shape({
  projectname: Yup.string().required("Name is required"),
});
