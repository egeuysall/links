"use client";

import React, { useMemo } from "react";
import { LinkItem } from "@/lib/LinkUtils";

interface AddLinkFormProps {
  newLink: Omit<LinkItem, "id">;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLink: () => void;
}

export const AddLinkForm: React.FC<AddLinkFormProps> = ({
  newLink,
  onLinkChange,
  onAddLink,
}) => {
  const isDisabled = useMemo(
    () => !newLink.title || !newLink.url,
    [newLink.title, newLink.url]
  );

  const buttonClass = useMemo(
    () =>
      `transition duration-300 ${
        isDisabled ? "cursor-not-allowed opacity-75" : "text-[#593116]"
      }`,
    [isDisabled]
  );

  return (
    <div className="rounded-lg">
      <h4 className="text-2xl mt-10 font-bold mb-3">Add new link</h4>
      <hr className="my-4 border border-[#EDE0D4]" />
      <div className="grid grid-cols-1 gap-3 mb-3">
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">
            Link title
          </label>
          <input
            type="text"
            name="title"
            value={newLink.title}
            onChange={onLinkChange}
            placeholder="My Website"
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">URL</label>
          <input
            type="url"
            name="url"
            value={newLink.url}
            onChange={onLinkChange}
            placeholder="https://example.com"
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">Icon URL</label>
          <input
            type="url"
            name="iconUrl"
            value={newLink.iconUrl || ""}
            onChange={onLinkChange}
            placeholder="https://example.com/icon.png"
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
      </div>
      <button 
        onClick={onAddLink} 
        disabled={isDisabled}
        className={`outline-none bg-[#B08968] text-[#EDE0D4] py-2.5 px-3.5 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-lg font-bold transition-colors duration-300 ${buttonClass}`}
      >
        Add link
      </button>
    </div>
  );
};