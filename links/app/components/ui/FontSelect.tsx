"use client";

import React from "react";

interface FontSelectProps {
  label: string;
  name: string;
  value: string;
  options: { name: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FontSelect: React.FC<FontSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-xl font-bold mb-1 mt-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-4 rounded-lg caret-[#593116]"
      >
        {options.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};