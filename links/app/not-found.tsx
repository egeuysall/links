import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="w-full min-h-[calc(100vh-9rem)] flex justify-center items-center flex-col">
      <div className="text-center">
        <Link href="/">
          <Image
            width={48}
            height={48}
            alt="Page not found icon"
            src="/logos/input-logo.svg"
            className="mx-auto"
          />
        </Link>
        <h1 className="font-bold text-[#593116] text-4xl mt-8">
          Sorry, we couldn&apos;t find that page.
        </h1>
        <p className="text-xl mt-4 text-[#593116]">
          Like this username?{" "}
          <Link
            href="/create"
            className="underline hover:text-[#7a4420] transition-colors"
          >
            Create your link now.
          </Link>
        </p>
      </div>
    </main>
  );
}