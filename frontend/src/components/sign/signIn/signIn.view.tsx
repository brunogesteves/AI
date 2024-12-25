import { ISignProps } from "@/utils/types";
// import { SignInSchema } from "@/utils/yup";
import { Field, Form, Formik } from "formik";
import { SignInLogic } from "./signIn.logic";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SignIn({ isOpen, hasSignUp }: ISignProps) {
  const { data, methods } = SignInLogic();
  return (
    <div
      className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-auto pt-4 pb-2 px-4 rounded-xl gap-y-4 transition-all duration-1000 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        isOpen ? "left-1/2" : "-left-1/2 "
      } `}
    >
      <div className="flex-1">
        <Formik
          initialValues={data.initialValues}
          // validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            methods.loginUser(values, actions);
          }}
        >
          {() => (
            <Form
              className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-auto pt-4 pb-2 px-4 rounded-xl gap-y-4 transition-all duration-1000 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                isOpen ? "left-1/2" : "-left-1/2"
              } `}
            >
              <div className="flex-1">
                <Field
                  name="email"
                  placeholder="email"
                  className=" w-96 rounded-lg pl-2 placeholder:text-black border-[1px] border-black"
                />
                {methods.ErrorInput("email")}
              </div>
              <div className="flex-1 relative">
                <Field
                  name="password"
                  type={data.isPasswordHidden ? "password" : "text"}
                  placeholder="password"
                  className="w-96 rounded-lg pl-2 placeholder:text-black border-[1px] border-black"
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
              <div>
                <span
                  className={`text-xs text-red-500 ${
                    data.errorWarning ? "" : "hidden"
                  }`}
                >
                  email and/or password wrong
                </span>
              </div>
              <div className="flex-1">
                <button className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black">
                  Log In
                </button>
              </div>
              <div className="flex-1">
                <span className="text-sm">Not Registered Yet? </span>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => hasSignUp(false)}
                >
                  Click here.
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
