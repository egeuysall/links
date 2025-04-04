"use client";

import React from "react";
import { UserProfile, FONT_OPTIONS } from "@/lib/LinkUtils";
import { ColorInput } from "../../ui/ColorInput";
import { FontSelect } from "../../ui/FontSelect";
import { SliderInput } from "../../ui/SliderInput";

interface ThemeFormProps {
  theme: UserProfile["theme"];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ThemeForm: React.FC<ThemeFormProps> = ({ theme, onChange }) => {
  return (
    <div className="text-[#593116]">
      <h4 className="text-2xl mt-10 font-bold mb-3">Theme</h4>
      <hr className="my-4 border border-[#EDE0D4]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorInput
          label="Background color"
          name="theme.backgroundColor"
          value={theme.backgroundColor}
          onChange={onChange}
        />
        <ColorInput
          label="Text color"
          name="theme.textColor"
          value={theme.textColor}
          onChange={onChange}
        />
        <ColorInput
          label="Button color"
          name="theme.buttonColor"
          value={theme.buttonColor}
          onChange={onChange}
        />
        <ColorInput
          label="Button text color"
          name="theme.buttonTextColor"
          value={theme.buttonTextColor}
          onChange={onChange}
        />
        <FontSelect
          label="Heading font"
          name="theme.headingFont"
          value={theme.headingFont}
          options={FONT_OPTIONS.heading}
          onChange={onChange}
        />
        <FontSelect
          label="Text font"
          name="theme.textFont"
          value={theme.textFont}
          options={FONT_OPTIONS.text}
          onChange={onChange}
        />
        
        <div className="md:col-span-2">
          <SliderInput
            label="Button Rounding"
            name="theme.buttonRounding"
            value={theme.buttonRounding || 8}
            min={0}
            max={30}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};