"use client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Logic } from "./logic";
import Link from "next/link";
import Image from "next/image";

import logo from "./../../public/logotype.png";
import { orbitron } from "@/utils/fonts";

export default function Home() {
  const { data, methods } = Logic();

  return (
    <main
      className="flex h-screen content-between items-center
    sm:items-center"
    >
      <section className="w-1/2 flex flex-col items-center ">
        <Image src={logo} alt="user" width={600} height={600} />
        <h1
          className={`
        ${orbitron.className} 
        neon-text
      `}
        >
          NEUROSPARK
        </h1>
      </section>
      <section className="w-1/2 flex flex-col items-center">
        <span
          className={`
        ${orbitron.className} 
        neon-text mb-5 text-2xl
      `}
        >
          Login
        </span>
        <form
          className="flex flex-col gap-y-5 text-center"
          onSubmit={methods.handleSubmit(methods.onSubmit)}
        >
          <div>
            <input
              placeholder="email"
              className="inputField"
              {...methods.register("email")}
            />
            <p
              className={`
        ${orbitron.className} 
             messageError neon-text

                `}
            >
              {data.errors.email?.message}
            </p>
          </div>
          <div className="relative">
            <input
              type={data.isPasswordHidden ? "password" : "text"}
              placeholder="password"
              className="w-full inputField"
              {...methods.register("password")}
            />
            <p
              className={`
        ${orbitron.className} 
             messageError neon-text

                `}
            >
              {data.errors.password?.message}
            </p>

            <div className="absolute top-3 right-1 hover:cursor-pointer ">
              {data.isPasswordHidden ? (
                <AiFillEyeInvisible
                  size={20}
                  color="white"
                  onClick={() =>
                    methods.setIsPasswordHidden(!data.isPasswordHidden)
                  }
                />
              ) : (
                <AiFillEye
                  color="white"
                  onClick={() =>
                    methods.setIsPasswordHidden(!data.isPasswordHidden)
                  }
                />
              )}
            </div>
          </div>
          <p
            className={`
        ${orbitron.className} 
        messageError neon-text
                `}
          >
            {data.incorrectMessage ? "Email and/or password incorrect" : null}
          </p>
          <input
            type="submit"
            value={data.isLoading ? "LOADING..." : "Sign In"}
            className={`
        ${orbitron.className} 
        mt-1
        buttonSubmit
            `}
          />
        </form>
        <div className="w-96 text-center mt-7 neon-text text-xl">
          have account?
          <Link href={"/signup"}> Click Here</Link>
        </div>
      </section>
    </main>
  );
}
