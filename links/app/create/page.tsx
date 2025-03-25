import React from "react";
import UserDetails from "../components/UserDetails"

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center flex-col gap-4 w-full mt-36">
        <h1 className="text-5xl font-bold text-center text-[#593116]">
          Start creating your links.
        </h1>
        <UserDetails />
      </section>
    </>
  );
}
