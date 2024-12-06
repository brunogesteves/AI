"use client";
import { Field, Form, Formik } from "formik";
import { SignUpLogic } from "./signUp.logic";
import { SignUpSchema } from "@/utils/yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { ISignProps } from "@/utils/types";

export default function SignUp({ isOpen, hasSignUp }: ISignProps) {
  const { data, methods } = SignUpLogic(hasSignUp);

  return (
    <>
      <Formik
        initialValues={data.initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values, actions) => methods.createUser(values, actions)}
      >
        {(props) => (
          <Form
            className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-auto pt-4 pb-2 px-4 rounded-xl gap-y-4 transition-all duration-1000 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isOpen ? "-left-1/2" : "left-1/2"
            } `}
          >
            <div className="flex-1">
              <Field
                name="firstname"
                placeholder="firstname"
                className="rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </div>
            <div className="flex-1">
              <Field
                name="lastname"
                placeholder="lastname"
                className="rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </div>
            <div className="flex-1">
              <Field
                name="email"
                placeholder="email"
                className="rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("email")}
            </div>
            <div className="flex-1  relative">
              <Field
                name="password"
                type={data.isPasswordHidden ? "password" : "text"}
                placeholder="password"
                className="rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              <div className="absolute top-1 right-1">
                {data.isPasswordHidden ? (
                  <AiFillEyeInvisible
                    onClick={() =>
                      methods.setIsPasswordHidden(!data.isPasswordHidden)
                    }
                  />
                ) : (
                  <AiFillEye
                    onClick={() =>
                      methods.setIsPasswordHidden(!data.isPasswordHidden)
                    }
                  />
                )}
              </div>
              {methods.ErrorInput("password")}
            </div>
            <DatePicker
              selected={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              }
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              }
              onChange={(date) => props.setFieldValue("birthDate", date)}
            />
            <div className="flex-1">
              <button
                type="submit"
                className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black"
              >
                Sign Up
              </button>
            </div>
            <div className="flex-1">
              <span className="text-sm">Already Registered? </span>
              <button
                type="button"
                className="text-sm"
                onClick={() => hasSignUp(true)}
              >
                Click here.
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
