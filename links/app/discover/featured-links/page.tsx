import React from "react";
import FeaturedLinks from "../../components/FeaturedLinks"

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center flex-col gap-4 w-full">
        <h1 className="text-5xl tracking-tighter font-bold text-center text-[#593116]">
        Check out people's top links.
        </h1>
        <p className="text-center text-[#593116] tracking-tight text-xl">
        Discover and explore the best links people share. Stay connected, find inspiration, and browse curated content in one place!
        </p>
        <section className="mt-8 mb-24 w-full">
            <FeaturedLinks />
        </section>
      </section>
    </>
  );
}