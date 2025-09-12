"use client";

import DatePicker from "react-datepicker";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { SignUpLogic } from "./logic";
import { orbitron } from "@/utils/fonts";

export default function SignUp() {
  const { data, methods } = SignUpLogic();

  return (
    <>
      <span
        className={`
            ${orbitron.className} 
            neon-text mb-5 text-2xl            
            text-center
          `}
      >
        Register
      </span>
      <form
        className="flex items-center justify-center-safe flex-col gap-y-5"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        {methods.inputModel("email")}
        {methods.inputModel("firstname")}
        {methods.inputModel("lastname")}
        {methods.inputPasswordModel("password")}
        {methods.inputPasswordModel("confirmPassword")}
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

      <div className="text-center mt-5 neon-text text-xl">
        Already Registered?
        <Link href={"/"}> Click Here</Link>
      </div>
    </>
  );
}
