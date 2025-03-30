import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ChangeTypes {
  id: string;
  title: string;
  desc: string;
  date: string;
}

const Change: React.FC<ChangeTypes> = ({ id, title, desc, date }) => {
  return (
    <Link href={`/docs/changelog/${id}`} className="block">
      <section className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Image width={12} height={12} alt={`${title} icon`} src="/logos/input-logo.svg" />
          <h1>{title}</h1>
        </div>
        <p className="text-sm text-[#7F5539]/80 mb-2">{date}</p>
        <p>{desc}</p>
      </section>
    </Link>
  );
};

export default Change;
