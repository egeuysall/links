"use client";

import React from "react";
import Image from "next/image";

const FeaturedLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
        <Image
          width={256}
          height={512}
          src="/featured-links/ege-uysal.png"
          alt="Ege Uysal links"
          className="w-full h-auto"
        />
        <Image
          width={256}
          height={512}
          src="/featured-links/mia-parker.png"
          alt="Mia Parker links"
          className="w-full h-auto"
        />
        <Image
          width={256}
          height={512}
          src="/featured-links/ethan-davis.png"
          alt="Mia Parker links"
          className="w-full h-auto"
        />
        <Image
          width={256}
          height={512}
          src="/featured-links/lucas-mercer.png"
          alt="Mia Parker links"
          className="w-full h-auto"
        />
    </div>
  );
};

export default FeaturedLinks;