"use client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Logic } from "./logic";
import Link from "next/link";

export default function Home() {
  const { data, methods } = Logic();

  return (
    <main
      className="flex h-screen content-between items-center
    sm:items-center"
    >
      <section className="w-1/2">logotipo</section>
      <section className="w-1/2">
        <form
          className="flex flex-col gap-y-5"
          onSubmit={methods.handleSubmit(methods.onSubmit)}
        >
          <div>
            <input
              placeholder="email"
              className=" w-96 rounded-lg pl-2 placeholder:text-black border-[1px] border-black"
              {...methods.register("email")}
            />
            <p className="text-red-500 text-md">{data.errors.email?.message}</p>
          </div>
          <div className="w-96 relative">
            <input
              type={data.isPasswordHidden ? "password" : "text"}
              placeholder="password"
              className="w-full rounded-lg pl-2 placeholder:text-black border-[1px] border-black"
              {...methods.register("password")}
            />
            <p className="text-red-500 text-md">
              {data.errors.password?.message}
            </p>

            <div className="absolute top-1 right-1 hover:cursor-pointer ">
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
          </div>
          <input type="submit" className="w-96 cursor-pointer" />
        </form>
        <div className="w-96 text-center mt-2">
          have account?
          <Link href={"/signup"}> Click Here</Link>
        </div>
      </section>
    </main>
  );
}
