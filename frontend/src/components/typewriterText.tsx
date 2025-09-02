"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  index: number;
  loading: boolean;
}

export default function TypewriterText({
  text,
  speed = 30,
  index,
  loading,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      <Image src="/globe.svg" alt="user" width={30} height={30} />
      {loading ? (
        <div className=" ml-3 animate-spin">
          <IoReloadOutline size={30} />
        </div>
      ) : (
        <span>
          {index}-{displayedText}
        </span>
      )}
    </>
  );
}
