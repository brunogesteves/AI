"use client";

import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { UpdateProfileLogic } from "./logic";

export default function SignUp() {
  const { data, methods } = UpdateProfileLogic();

  return (
    <>
      <h1 className="mb-5 text-center">Update Profile</h1>
      <form
        className="flex items-center justify-center-safe flex-col gap-y-5"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        {methods.inputModel("firstname")}
        {methods.inputModel("lastname")}
        {methods.inputPasswordModel("oldPassword")}
        {methods.inputPasswordModel("newPassword")}
        {methods.inputPasswordModel("confirmNewPassword")}
        <DatePicker
          selected={data.dateSelected}
          minDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          onChange={(date: Date | null) => {
            methods.setValue("birthDate", date ? date : new Date());
            methods.setDateSelected(date);
          }}
          className="w-96 text-black"
        />

        <input type="submit" className="w-96 cursor-pointer" />
      </form>

      <div className=" w-full text-center py-3 h-auto">
        <Link href={"/panel"} type="button" className="text-xl">
          go Back
        </Link>
      </div>

      <ToastContainer />
    </>
  );
}
