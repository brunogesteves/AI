import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstname: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Name is required"),

  birthDate: Yup.date().required("BirthDate is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The password must the same")
    .required("Verify the password"),
});

export const updateSchema = Yup.object().shape({
  firstname: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const createProjectSchema = Yup.object().shape({
  projectname: Yup.string().required("Name is required"),
});

export type signUpFormData = Yup.InferType<typeof signUpSchema>;
export type updateFormData = Yup.InferType<typeof updateSchema>;
export type signInFormData = Yup.InferType<typeof signInSchema>;
export type createProjectFormData = Yup.InferType<typeof createProjectSchema>;
