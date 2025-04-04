"use client";

import React, { useMemo, memo } from "react";
import CodeBlock from "./CodeBlock";
import { LinkItem, UserProfile, FONT_OPTIONS } from "./LinkUtils";
import { LuTrash2 } from "react-icons/lu";

// Preview component
export const Preview = ({ html }: { html: string }) => {
  // Memoize the iframe to prevent re-renders when html doesn't change
  const memoizedIframe = useMemo(
    () => (
      <iframe
        srcDoc={html}
        title="Preview"
        className="w-full"
        style={{
          height: "750px",
          borderRadius: "8px",
        }}
      />
    ),
    [html]
  );

  return memoizedIframe;
};

// Code block wrapper
export const CodeBlockWrapper = ({
  language,
  fileName,
  code,
}: {
  language: string;
  fileName: string;
  code: string;
}) => {
  // Memoize the CodeBlock to prevent re-renders when props don't change
  const memoizedCodeBlock = useMemo(
    () => <CodeBlock language={language} fileName={fileName} code={code} />,
    [language, fileName, code]
  );

  return memoizedCodeBlock;
};

// Color input component
export const ColorInput = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // Simple component, no need for internal memoization
  return (
    <div>
      <label className="block text-xl font-bold mb-1 mt-2">{label}</label>
      <div className="flex items-center gap-2 ">
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
          className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
        />
      </div>
    </div>
  );
};

// Font select component
export const FontSelect = ({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: { name: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  // Memoize options rendering since it's a mapping operation
  const optionElements = useMemo(
    () =>
      options.map((font) => (
        <option key={font.value} value={font.value}>
          {font.name}
        </option>
      )),
    [options]
  );

  return (
    <div>
      <label className="block text-xl font-bold mb-1 mt-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] p-4 rounded-lg caret-[#593116]"
      >
        {optionElements}
      </select>
    </div>
  );
};

// Slider input component for button rounding
export const SliderInput = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

// Individual link item
export const LinkItemDisplay = ({
  link,
  onRemove,
}: {
  link: LinkItem;
  onRemove: (id: string) => void;
}) => {
  // Memoize the URL display logic
  const displayUrl = useMemo(
    () =>
      link.url && link.url.length > 24 ? `${link.url.slice(0, 26)}…` : link.url,
    [link.url]
  );

  return (
    <div key={link.id} className="items-center grid grid-cols-6 gap-2">
  <div className="col-span-5 bg-[#E6CCB2] p-4 rounded-lg">
    <p className="font-bold text-lg text-[#7F5539]">{link.title}</p>
    <div className="text-md text-[#B08968] font-normal">{displayUrl}</div>
  </div>
  <div className="col-span-1 flex items-center justify-center">
    <button
      onClick={() => onRemove(link.id)}
      className="text-[#EDE0D4] p-1 rounded-full transition-colors"
    >
      <LuTrash2 />
    </button>
  </div>
</div>
  );
};

// Links list component
export const LinksList = ({
  links,
  onRemoveLink,
}: {
  links: LinkItem[];
  onRemoveLink: (id: string) => void;
}) => {
  // Memoize the links mapping operation
  const linkItems = useMemo(
    () =>
      links.map((link) => (
        <LinkItemDisplay key={link.id} link={link} onRemove={onRemoveLink} />
      )),
    [links, onRemoveLink]
  );

  return <div className="space-y-4 mb-4">{linkItems}</div>;
};

// Add link form component
export const AddLinkForm = ({
  newLink,
  onLinkChange,
  onAddLink,
}: {
  newLink: Omit<LinkItem, "id">;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLink: () => void;
}) => {
  // Memoize the disabled state calculation
  const isDisabled = useMemo(
    () => !newLink.title || !newLink.url,
    [newLink.title, newLink.url]
  );

  // Memoize the button class calculation
  const buttonClass = useMemo(
    () =>
      `transition duration-300 ${
        isDisabled
          ? "cursor-not-allowed opacity-75"
          : "text-[#593116]"
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
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
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
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
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
            className="flex-1 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-3 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
      </div>
      <button onClick={onAddLink} disabled={isDisabled}
      className={`outline-none bg-[#B08968] text-[#EDE0D4] py-2.5 px-3.5 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-lg font-bold transition-colors duration-300 ${buttonClass}`}>
        Add link
      </button>
    </div>
  );
};

// Profile form component
export const ProfileForm = ({
  profile,
  onChange,
}: {
  profile: UserProfile;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}) => {
  return (
    <div className="text-[#593116]">
      <h4 className="text-2xl font-bold mb-3 flex">Profile Details</h4>
      <hr className="my-4 border border-[#EDE0D4]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">
            Display name
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            placeholder="Doe"
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xl font-bold mb-1 mt-2">Bio</label>
          <textarea
            name="bio"
            placeholder="John Doe – Web Developer. More coming soon!"
            value={profile.bio}
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none min-h-[105px] text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xl font-bold mb-1 mt-2">
            Avatar URL
          </label>
          <input
            type="text"
            name="avatar"
            value={profile.avatar || ""}
            onChange={onChange}
            placeholder="https://example.com/avatar.jpg"
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none  text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
      </div>
    </div>
  );
};

// Theme form component
export const ThemeForm = ({
  theme,
  onChange,
}: {
  theme: UserProfile["theme"];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {
  // Since ColorInput and FontSelect components can be performance intensive when repeated,
  // we can memoize their renders in arrays
  const colorInputs = useMemo(
    () =>
      [
        {
          label: "Background color",
          name: "theme.backgroundColor",
          value: theme.backgroundColor,
        },
        {
          label: "Text color",
          name: "theme.textColor",
          value: theme.textColor,
        },
        {
          label: "Button color",
          name: "theme.buttonColor",
          value: theme.buttonColor,
        },
        {
          label: "Button text color",
          name: "theme.buttonTextColor",
          value: theme.buttonTextColor,
        },
      ].map((input) => (
        <ColorInput
          key={input.name}
          label={input.label}
          name={input.name}
          value={input.value}
          onChange={onChange}
        />
      )),
    [
      theme.backgroundColor,
      theme.textColor,
      theme.buttonColor,
      theme.buttonTextColor,
      onChange,
    ]
  );

  const fontSelects = useMemo(
    () =>
      [
        {
          label: "Heading font",
          name: "theme.headingFont",
          value: theme.headingFont,
          options: FONT_OPTIONS.heading,
        },
        {
          label: "Text font",
          name: "theme.textFont",
          value: theme.textFont,
          options: FONT_OPTIONS.text,
        },
      ].map((select) => (
        <FontSelect
          key={select.name}
          label={select.label}
          name={select.name}
          value={select.value}
          options={select.options}
          onChange={onChange}
        />
      )),
    [theme.headingFont, theme.textFont, onChange]
  );

  return (
    <div className="text-[#593116]">
      <h4 className="text-2xl mt-10 font-bold mb-3">Theme</h4>
      <hr className="my-4 border border-[#EDE0D4]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorInputs.slice(0, 2)}
        {colorInputs.slice(2, 4)}
        {fontSelects}
        
        {/* Button Rounding Slider Input */}
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
