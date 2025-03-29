"use client";

import React from "react";
import CodeBlock from "./CodeBlock";
import { LinkItem, UserProfile, FONT_OPTIONS } from "./LinkUtils";

// Preview component
export const Preview = ({ html }: { html: string }) => (
  <iframe
    srcDoc={html}
    title="Preview"
    className="w-full"
    style={{
      height: "700px",
      borderRadius: "8px",
    }}
  />
);

// Code block wrapper
export const CodeBlockWrapper = ({ 
  language, 
  fileName, 
  code 
}: { 
  language: string; 
  fileName: string; 
  code: string; 
}) => (
  <CodeBlock
    language={language}
    fileName={fileName}
    code={code}
  />
);

// SVG component
export const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// Color input component
export const ColorInput = ({ 
  label, 
  name, 
  value, 
  onChange 
}: { 
  label: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}) => (
  <div>
    <label className="block text-xl font-bold mb-1 mt-2">
      {label}
    </label>
    <div className="flex gap-2">
      <input
        type="color"
        name={name}
        value={value}
        onChange={onChange}
        className="h-10 w-10 rounded-sm"
      />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
    </div>
  </div>
);

// Font select component
export const FontSelect = ({ 
  label, 
  name, 
  value, 
  options, 
  onChange 
}: { 
  label: string; 
  name: string; 
  value: string; 
  options: { name: string; value: string; }[]; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
}) => (
  <div>
    <label className="block text-xl font-bold mb-1 mt-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    >
      {options.map((font) => (
        <option key={font.value} value={font.value}>
          {font.name}
        </option>
      ))}
    </select>
  </div>
);

// Individual link item
export const LinkItemDisplay = ({ 
  link, 
  onRemove 
}: { 
  link: LinkItem; 
  onRemove: (id: string) => void; 
}) => (
  <div key={link.id} className="items-center grid grid-cols-6">
    <div className="col-span-5 bg-[#E6CCB2] p-4 rounded-md">
      <p className="font-bold text-lg text-[#7F5539]">
        {link.title}
      </p>
      <div className="text-md text-[#B08968]">
        {link.url && link.url.length > 24
          ? `${link.url.slice(0, 26)}…`
          : link.url}
      </div>
    </div>
    <button
      onClick={() => onRemove(link.id)}
      className="ml-2 text-[#EDE0D4] p-1 rounded-full transition-colors col-span-1 flex flex-col items-center justify-center"
      aria-label={`Remove ${link.title}`}
    >
      <TrashIcon />
    </button>
  </div>
);

// Links list component
export const LinksList = ({ 
  links, 
  onRemoveLink 
}: { 
  links: LinkItem[]; 
  onRemoveLink: (id: string) => void; 
}) => (
  <div className="space-y-4 mb-4">
    {links.map((link) => (
      <LinkItemDisplay 
        key={link.id} 
        link={link} 
        onRemove={onRemoveLink} 
      />
    ))}
  </div>
);

// Add link form component
export const AddLinkForm = ({ 
  newLink, 
  onLinkChange, 
  onAddLink 
}: { 
  newLink: Omit<LinkItem, "id">;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLink: () => void;
}) => (
  <div className="rounded-lg">
    <h4 className="text-2xl mt-10 font-bold mb-3">
      Add new link
    </h4>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      <div>
        <label className="block text-xl font-bold mb-1 mt-2">
          URL
        </label>
        <input
          type="url"
          name="url"
          value={newLink.url}
          onChange={onLinkChange}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      <div>
        <label className="block text-xl font-bold mb-1 mt-2">
          Icon URL
        </label>
        <input
          type="url"
          name="iconUrl"
          value={newLink.iconUrl || ""}
          onChange={onLinkChange}
          placeholder="https://example.com/icon.png"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
    </div>
    <button
      onClick={onAddLink}
      disabled={!newLink.title || !newLink.url}
      className={`px-4 py-2 rounded-md transition-colors ${
        !newLink.title || !newLink.url
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      Add Link
    </button>
  </div>
);

// Profile form component
export const ProfileForm = ({ 
  profile, 
  onChange 
}: { 
  profile: UserProfile; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; 
}) => (
  <div className="text-[#EDE0D4]">
    <h4 className="text-2xl font-bold mb-3">Profile Details</h4>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      <div>
        <label className="block text-xl font-bold mb-1 mt-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xl font-bold mb-1 mt-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
    </div>
  </div>
);

// Theme form component
export const ThemeForm = ({ 
  theme, 
  onChange 
}: { 
  theme: UserProfile['theme']; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; 
}) => (
  <div className="text-[#EDE0D4]">
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
    </div>
  </div>
);