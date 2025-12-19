"use client";

import React from "react";

interface ColorInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-xl font-bold mb-1 mt-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="h-15 w-15 rounded-lg"
        />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
        />
      </div>
    </div>
  );
};