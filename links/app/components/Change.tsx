import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChangeLog } from "@/types/changelog.types";



const Change: React.FC<ChangeLog> = ({ id, title, desc, date }) => {
  return (
    <Link href={`/docs/changelog/${id}`} className="flex">
      <section className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Image width={12} height={12} alt={`${title} icon`} src="/logos/input-logo.svg" />
          <h5 className="text-[#593116] text-xl font-bold">{title}</h5>
        </div>
        <p className="text-sm text-[#B08968] mb-2">{date}</p>
        <p className="text-[#593116]">{desc}</p>
      </section>
    </Link>
  );
};

export default Change;
