"use client";

import React from "react";

interface SliderInputProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-xl font-bold mb-1 mt-2">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          name={name}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className="flex-1 h-3 bg-[#E6CCB2] rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-lg font-bold min-w-[48px] text-center">
          {value}px
        </span>
      </div>
    </div>
  );
};