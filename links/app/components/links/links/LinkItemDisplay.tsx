"use client";

import React from "react";
import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import { LinkItem } from "@/lib/LinkUtils";

interface LinkItemDisplayProps {
  link: LinkItem;
  onRemove: (id: string) => void;
}

export const LinkItemDisplay: React.FC<LinkItemDisplayProps> = ({ link, onRemove }) => {
  return (
    <div
      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg"
    >
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center h-full">
          {link.iconUrl && (
            //TODO: replace with Image
            <img src={link.iconUrl} alt="icon" className="w-5 h-5" />
          )}
          <span className="font-bold">{link.title}</span>
        </div>
        <div className="flex h-full items-center justify-center">
          <button
            onClick={() => onRemove(link.id)}
            className="text-[#B08968] flex items-center h-full"
          >
            <LuTrash2 className="text-xl h-full flex items-center"/>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <Link
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[#B08968] text-sm">
            {link.url.length > 32 ? link.url.substring(0, 32) + '...' : link.url}
          </p>
        </Link>
      </div>
    </div>
  );
};