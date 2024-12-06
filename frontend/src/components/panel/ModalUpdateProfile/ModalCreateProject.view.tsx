import { CreateProkectSchema } from "@/utils/yup";
import { Field, Form, Formik } from "formik";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { IModalCreateUpdateProps } from "@/utils/types";
import { ModalCreateProjectLogic } from "./modalCreateProject.logic";

export default function ModalCreateProject({
  isOpen,
  closeModal,
}: IModalCreateUpdateProps) {
  const { data, methods } = ModalCreateProjectLogic({ isOpen, closeModal });

  return (
    <dialog
      ref={data.modalRefProject}
      className="w-full h-full bg-transparent "
    >
      <div className="bg-black opacity-60 w-full h-full relative"></div>

      <Formik
        initialValues={data?.initialValues}
        validationSchema={CreateProkectSchema}
        onSubmit={(values, actions) => methods.createProject(values, actions)}
      >
        {() => (
          <Form
            className="flex flex-col justify-center bg-red-500 w-fit absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2              left-1/2
p-2 rounded-md gap-10 text-3xl"
          >
            <div className="flex-1">
              <Field
                name="projectname"
                placeholder="Create a new Project"
                className="rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("projectName")}
            </div>

            <div className="flex justify-between items-center w-full ">
              <div>
                <button
                  type="submit"
                  className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black"
                >
                  Create
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
