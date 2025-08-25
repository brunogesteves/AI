"use client";

import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { SignUpLogic } from "./logic";

export default function SignUp() {
  const { methods } = SignUpLogic();

  return (
    <>
      <form
        className="flex items-center justify-center-safe flex-col gap-y-5"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        {methods.inputModel("email")}
        {methods.inputModel("firstname")}
        {methods.inputModel("lastname")}
        {methods.inputPasswordModel()}
        <DatePicker
          selected={
            new Date(new Date().setFullYear(new Date().getFullYear() - 0))
          }
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          onChange={(date: Date | null) =>
            methods.setValue("birthDate", date ? date : new Date())
          }
          className="w-96"
        />

        <input type="submit" className="w-96 cursor-pointer" />
      </form>

      <div className=" w-full text-center py-3 h-auto">
        <span className="text-xl text-black">Already Registered? </span>
        <Link href={"/"} type="button" className="text-xl">
          Click here.
        </Link>
      </div>

      <ToastContainer />
    </>
  );
}
