"use client";

import { useState } from "react";
import SignUp from "./signUp/signUp.view";
import SignIn from "./signIn/signIn";

export default function Sign() {
  const [isRegistered, setIsRegistered] = useState<boolean>(true);

  return (
    <div className="h-screen bg-yellow-500 flex justify-center items-center relative ">
      <SignIn
        isOpen={isRegistered}
        hasSignUp={(e: boolean) => setIsRegistered(e)}
      />
      <SignUp
        isOpen={isRegistered}
        hasSignUp={(e: boolean) => setIsRegistered(e)}
      />
    </div>
  );
}
