import React from "react";
import ClaimLink from "../components/ClaimLink"

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center flex-col gap-4 w-full mt-36">
        <h1 className="text-5xl tracking-tighter font-bold text-center text-[#593116]">
          Start creating your links.
        </h1>
        <p className="text-center text-[#593116] tracking-tight text-xl">
        Enter your links and build your unique collection effortlessly. Customize your setup in seconds!
        </p>
        <ClaimLink />
      </section>
    </>
  );
}
