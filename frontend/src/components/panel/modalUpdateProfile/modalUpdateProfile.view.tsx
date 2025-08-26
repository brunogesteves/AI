import { UpdateSchema } from "@/utils/yup";
import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { ModalUpdateProfileLogic } from "./modalUpdateProfile.logic";

interface IModalUpdateProps {
  isOpen: boolean;
  closeModal: (newState: boolean) => void;
}

export default function ModalUpdateProfile({
  isOpen,
  closeModal,
}: IModalUpdateProps) {
  const { data, methods } = ModalUpdateProfileLogic(isOpen);

  return (
    <dialog ref={data.modalRefUpdate} className="w-full h-full bg-transparent ">
      <div className="bg-black opacity-60 w-full h-full relative"></div>

      <Formik
        initialValues={data?.userSettings}
        enableReinitialize
        validationSchema={UpdateSchema}
        onSubmit={(values, actions) => methods.updateUser(values, actions)}
      >
        {(props) => (
          <Form
            className="flex flex-col justify-center bg-red-500 w-fit absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2     left-1/2
p-2 rounded-md gap-y-5 text-3xl"
          >
            <div className="flex-1">
              <Field
                name="firstname"
                placeholder="firstname"
                className="w-96 text-sm rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </div>
            <div className="flex-1">
              <Field
                name="lastname"
                placeholder="lastname"
                className="w-96 text-sm rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </div>
            <div className="flex-1  relative ">
              <Field
                name="password"
                type={data.isPasswordHidden ? "password" : "text"}
                placeholder="password"
                className="w-96 text-sm rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              <div
                className="absolute top-4 right-1"
                onClick={() =>
                  methods.setIsPasswordHidden(!data.isPasswordHidden)
                }
              >
                {data.isPasswordHidden ? (
                  <AiFillEyeInvisible size={17} />
                ) : (
                  <AiFillEye size={17} />
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
              startDate={data.userSettings?.birthDate}
              className="w-96 text-sm rounded-lg pl-2 border-[1px] border-black focus:outline"
            />
            <div className="flex justify-between items-center w-full ">
              <div>
                <button
                  type="submit"
                  className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black"
                >
                  Update
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black"
                  onClick={() => closeModal(false)}
                >
                  close
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </dialog>
  );
}
