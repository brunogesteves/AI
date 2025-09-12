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
      <h1 className="mb-10 text-center text-2xl neon-text">Update Profile</h1>
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
          className="inputField"
        />

        <input type="submit" className="buttonSubmit" />
      </form>

      <div className="neon-text text-center">
        <Link href={"/dashboard"} type="button" className="text-xl">
          go Back
        </Link>
      </div>

      <ToastContainer />
    </>
  );
}
