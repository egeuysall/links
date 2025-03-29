"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import ContactForm from "./ContactForm";
import CodeBlock from "./CodeBlock";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";

// Types and Interfaces
interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
}

interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  links: LinkItem[];
  theme: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    headingFont: string;
    textFont: string;
  };
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// Constants - moved outside component to prevent recreation
const FONT_OPTIONS = {
  heading: [
    { name: "Space Grotesk", value: "space-grotesk" },
    { name: "Arial", value: "arial" },
    { name: "Inter", value: "inter" },
    { name: "Montserrat", value: "montserrat" },
    { name: "JetBrains Mono", value: "jetbrains-mono" },
  ],
  text: [
    { name: "Lato", value: "lato" },
    { name: "Arial", value: "arial" },
    { name: "Inter", value: "inter" },
    { name: "Montserrat", value: "montserrat" },
    { name: "JetBrains Mono", value: "jetbrains-mono" },
  ],
};

const INITIAL_PROFILE: UserProfile = {
  username: "",
  displayName: "",
  bio: "",
  avatar: "",
  links: [],
  theme: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#0000ff",
    buttonTextColor: "#ffffff",
    headingFont: "space-grotesk",
    textFont: "lato",
  },
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

// Font utility functions - moved outside component
const getFontFamily = (fontName: string): string => {
  switch (fontName) {
    case "space-grotesk":
      return "'Space Grotesk', system-ui, sans-serif";
    case "jetbrains-mono":
      return "'JetBrains Mono', monospace";
    case "inter":
      return "'Inter', sans-serif";
    case "montserrat":
      return "'Montserrat', sans-serif";
    case "arial":
      return "Arial, sans-serif";
    case "lato":
      return "'Lato', sans-serif";
    default:
      return "system-ui, sans-serif";
  }
};

// SVG component - extracted to prevent re-renders
const TrashIcon = memo(() => (
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
));

TrashIcon.displayName = "TrashIcon";

// Memoized components
const ErrorFallback = memo(({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className="text-center p-4" role="alert">
    <h2 className="text-xl font-bold text-red-600 mb-4">
      Something went wrong
    </h2>
    <pre className="text-sm text-red-500 mb-4">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Try again
    </button>
  </div>
));

ErrorFallback.displayName = "ErrorFallback";

const Preview = memo(({ html }: { html: string }) => (
  <iframe
    srcDoc={html}
    title="Preview"
    className="w-full"
    style={{
      height: "700px",
      borderRadius: "8px",
    }}
  />
));

Preview.displayName = "Preview";

// Color input component to reduce repetition
const ColorInput = memo(({ 
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
));

ColorInput.displayName = "ColorInput";

// Font select component to reduce repetition
const FontSelect = memo(({ 
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
));

FontSelect.displayName = "FontSelect";

// LinkItem component - extracted to memoize
const LinkItemDisplay = memo(({ 
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
));

LinkItemDisplay.displayName = "LinkItemDisplay";

// AddLinkForm component - extracted to memoize
const AddLinkForm = memo(({ 
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
));

AddLinkForm.displayName = "AddLinkForm";

// ProfileForm component - extracted to memoize
const ProfileForm = memo(({ 
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
));

ProfileForm.displayName = "ProfileForm";

// ThemeForm component - extracted to memoize
const ThemeForm = memo(({ 
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
));

ThemeForm.displayName = "ThemeForm";

// Main Component
const Links = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  
  const [newLink, setNewLink] = useState<Omit<LinkItem, "id">>({
    title: "",
    url: "",
    iconUrl: "",
  });

  const [showExport, setShowExport] = useState(false);

  // Event Handlers - Memoized to prevent unnecessary recreations
  const handleProfileChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      if (name.startsWith("theme.")) {
        const themeProperty = name.split(".")[1];
        return {
          ...prevProfile,
          theme: {
            ...prevProfile.theme,
            [themeProperty]: value,
          },
        };
      }
      return {
        ...prevProfile,
        [name]: value,
      };
    });
  }, []);

  const handleAddLink = useCallback(() => {
    if (newLink.title && newLink.url) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        links: [...prevProfile.links, {
          ...newLink,
          id: Date.now().toString(),
        }],
      }));

      setNewLink({ title: "", url: "", iconUrl: "" });
    }
  }, [newLink]);

  const handleRemoveLink = useCallback((id: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      links: prevProfile.links.filter((link) => link.id !== id),
    }));
  }, []);

  const handleNewLinkChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const toggleExport = useCallback(() => {
    setShowExport((prev) => !prev);
  }, []);

  // Generate HTML - Optimized with proper dependency array
  const generateHTML = useMemo(() => {
    const { 
      displayName, 
      username, 
      bio, 
      avatar, 
      links, 
      theme: { 
        backgroundColor, 
        textColor, 
        buttonColor, 
        buttonTextColor, 
        headingFont, 
        textFont 
      } 
    } = profile;

    const linkElements = links.map(
      (link) => `
      <a 
        href="${link.url}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="flex button-font w-full items-center justify-center gap-2 rounded-lg py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[${buttonColor}] text-[${buttonTextColor}]"
        aria-label="Visit ${link.title}"
      >
        ${
          link.iconUrl
            ? `
          <span class="flex items-center justify-center h-6 w-6">
            <img 
              src="${link.iconUrl}" 
              alt="" 
              class="max-h-full max-w-full" 
              loading="lazy" 
              aria-hidden="true" 
            />
          </span>`
            : ""
        }
        <span class="button-font">${link.title}</span>
      </a>
      `
    ).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${displayName} | Connect with me | Links Platform</title>
    <!-- Meta tags and other head content -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Lato:wght@400;700&family=Inter:wght@400;700&family=Montserrat:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
        /* Font definitions */
        @font-face {
            font-family: 'Space Grotesk';
            font-display: swap;
            src: local('Space Grotesk');
        }
        /* Other font faces */
        
        /* Base styles */
        .heading-font {
            font-family: ${getFontFamily(headingFont)};
            font-weight: 700;
        }
        .text-font {
            font-family: ${getFontFamily(textFont)};
            font-weight: 400;
        }
        .button-font {
          font-family: ${getFontFamily(textFont)};
          font-weight: 700;
        }
    </style>
</head>
<body
    class="flex h-screen w-screen items-center justify-center bg-[${backgroundColor}] text-[${textColor}]">
    <main class="flex h-screen w-screen flex-col items-center justify-center">
        <section class="flex w-[70vw] flex-col items-center justify-center">
            ${avatar
              ? `<img src="${avatar}" alt="${displayName}'s profile picture"
                class="mb-4 h-31 w-31 rounded-full transition-all duration-200 hover:grayscale" loading="eager"
                width="128" height="128" fetchpriority="high" />`
              : `<div
                class="heading-font mb-4 h-31 w-31 rounded-full flex items-center justify-center text-4xl heading-font font-bold transition-all duration-200 hover:grayscale bg-[${backgroundColor}] invert-4"
                aria-label="${displayName}'s profile initial">
                ${displayName.charAt(0).toUpperCase()}
            </div>`}
            <article class="flex flex-col items-center">
                <h1 class="mb-1 text-3xl font-bold tracking-tight heading-font">
                    ${displayName}</h1>
                <h2 class="mb-4 text-base tracking-tight opacity-50 text-font">
                    @${username.toLowerCase()}</h2>
                <p aria-label="bio" class="text-center text-lg tracking-tight text-font">
                    ${bio}
                </p>
            </article>
            <section class="flex items-center justify-center w-full">
            <nav aria-label="Social Links" class="mt-6 flex w-full flex-col gap-4 items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-items-center">
                ${linkElements}
            </nav>
            </section
        </section>
        <section class="flex w-[75vw] flex-col items-center justify-center">
            <p aria-label="Made by" class="text-font mt-8 text-center text-base opacity-50">
                Created with ❤️ by Links
            </p>
        </section>
        <!-- Schema.org JSON-LD data -->
    </main>
</body>
</html>`;
  }, [profile]);

  // Memoize links list to prevent re-renders
  const linksList = useMemo(() => (
    <div className="space-y-4 mb-4">
      {profile.links.map((link) => (
        <LinkItemDisplay 
          key={link.id} 
          link={link} 
          onRemove={handleRemoveLink} 
        />
      ))}
    </div>
  ), [profile.links, handleRemoveLink]);

  // Export panel - memoized
  const exportPanel = useMemo(() => (
    <div className="export-panel px-2">
      <div
        className={`rounded-lg overflow-auto max-h-[1525px] ${jetBrainsMono.className}`}
      >
        <CodeBlock
          language="html"
          fileName={`${profile.displayName}'s Website`}
          code={generateHTML}
        />
      </div>
    </div>
  ), [generateHTML, profile.displayName, jetBrainsMono.className]);

  // Editor panel - memoized
  const editorPanel = useMemo(() => (
    <div className="editor-panel space-y-6">
      {/* Profile Section */}
      <ProfileForm profile={profile} onChange={handleProfileChange} />

      {/* Theme Section */}
      <ThemeForm theme={profile.theme} onChange={handleProfileChange} />

      {/* Links Section */}
      <div className="text-[#EDE0D4]">
        <h4 className="text-2xl mt-10 font-bold mb-3">Links</h4>
        <hr className="my-4 border border-[#EDE0D4]" />
        {linksList}
        <AddLinkForm 
          newLink={newLink} 
          onLinkChange={handleNewLinkChange} 
          onAddLink={handleAddLink} 
        />
      </div>
    </div>
  ), [profile, handleProfileChange, linksList, newLink, handleNewLinkChange, handleAddLink]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full">
        <div className="container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-8">
            <div className="lg:col-span-3 lg:row-span-2 bg-[#B08968] rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={toggleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showExport ? "Back to Editor" : "Export HTML"}
                </button>
              </div>

              {showExport ? exportPanel : editorPanel}
            </div>
            <div className="lg:col-span-2 bg-[#B08968] rounded-lg px-8 py-4 overflow-hidden text-[#EDE0D4]">
              <h4 className="text-2xl font-bold mb-4 text-center">Preview</h4>
              <Preview html={generateHTML} />
            </div>
            <div className="lg:col-span-2 bg-[#B08968] rounded-lg p-8 overflow-hidden text-[#EDE0D4]">
              <h4 className="text-2xl font-bold text-center tracking-tight">
                Thank you for using Links!
              </h4>
              <hr className="my-4 border border-[#EDE0D4]" />
              <p className="text-xl tracking-tight text-center">
                Thank you for using Links. We're glad to be part of your journey
                in simplifying and enhancing your online experience.
              </p>
              <h4 className="text-2xl font-bold text-center tracking-tight mt-8">
                Your feedback!
              </h4>
              <hr className="my-4 border border-[#EDE0D4]" />
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Links;