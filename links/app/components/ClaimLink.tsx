"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import ContactForm from "./ContactForm"

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

// Constants
const CURRENT_DATETIME = "2025-03-25 22:42:30";
const CURRENT_USER = "egeuysall";

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

// Utility Functions
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

// Error Fallback Component
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
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
  );
};

// Preview Component
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

// Main Component
const Links = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
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
  });

  const [newLink, setNewLink] = useState<Omit<LinkItem, "id">>({
    title: "",
    url: "",
    iconUrl: "",
  });

  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load profile from localStorage
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("links.Profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }, []);

  // Debounced save to localStorage
  const debouncedSave = useMemo(
    () =>
      debounce((profile: UserProfile) => {
        try {
          localStorage.setItem("links.Profile", JSON.stringify(profile));
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSave(profile);
    return () => {
      debouncedSave.cancel();
    };
  }, [profile, debouncedSave]);

  // Event Handlers
  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      const newLinkWithId: LinkItem = {
        ...newLink,
        id: Date.now().toString(),
      };

      setProfile((prevProfile) => ({
        ...prevProfile,
        links: [...prevProfile.links, newLinkWithId],
      }));

      setNewLink({ title: "", url: "", iconUrl: "" });
    }
  };

  const handleRemoveLink = (id: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      links: prevProfile.links.filter((link) => link.id !== id),
    }));
  };

  const handleNewLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Generate HTML with memoization
  const generateHTML = useMemo(() => {
    const getHeadingFontFamily = () => {
      switch (profile.theme.headingFont) {
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
        default:
          return "system-ui, sans-serif";
      }
    };

    const getTextFontFamily = () => {
      switch (profile.theme.textFont) {
        case "lato":
          return "'Lato', sans-serif";
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
        default:
          return "system-ui, sans-serif";
      }
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${profile.displayName} | Links</title>
    <meta name="title" content="${profile.displayName} | Links">
    <meta name="description" content="${profile.bio} | Connect with ${
      profile.displayName
    } through their curated links">
    <meta name="author" content="${profile.displayName}">
    <meta name="creator" content="egeuysall">
    <meta name="generator" content="Links Platform">
    <meta name="keywords" content="links, social media, ${
      profile.displayName
    }, profile links, bio links">
    <meta name="created" content="2025-03-25 22:43:53">
    <meta name="revised" content="2025-03-25 22:43:53">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="profile">
    <meta property="og:title" content="${profile.displayName} | Links">
    <meta property="og:description" content="${profile.bio} | Connect with ${
      profile.displayName
    } through their curated links">
    <meta property="og:image" content="${profile.avatar || ""}">
    <meta property="profile:username" content="${profile.username}">
    <meta property="og:site_name" content="Links Platform">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:creator" content="@${profile.username}">
    <meta property="twitter:title" content="${profile.displayName} | Links">
    <meta property="twitter:description" content="${
      profile.bio
    } | Connect with ${profile.displayName} through their curated links">
    <meta property="twitter:image" content="${profile.avatar || ""}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Lato:wght@400;700&family=Inter:wght@400;700&family=Montserrat:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- TailwindCSS -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    
    <style>
      /* Define fonts first to ensure proper loading */
      @font-face {
        font-family: 'Space Grotesk';
        font-display: swap;
        src: local('Space Grotesk');
      }
      
      @font-face {
        font-family: 'Lato';
        font-display: swap;
        src: local('Lato');
      }
      
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: local('Inter');
      }
      
      @font-face {
        font-family: 'Montserrat';
        font-display: swap;
        src: local('Montserrat');
      }
      
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
        src: local('JetBrains Mono');
      }
      
      /* Apply styles */
      body {
        background-color: ${profile.theme.backgroundColor};
        color: ${profile.theme.textColor};
        width: 100%;
        margin: 0;
        padding: 16px;
        box-sizing: border-box;
      }
      
      .heading-font {
        font-family: ${getHeadingFontFamily()};
        font-weight: 700;
      }
      
      .text-font {
        font-family: ${getTextFontFamily()};
        font-weight: 400;
      }
      
      .link-button {
        background-color: ${profile.theme.buttonColor};
        color: ${profile.theme.buttonTextColor};
        transition: all 0.2s ease;
        font-family: ${getTextFontFamily()};
      }
      
      .link-button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      .link-button:focus {
        outline: 2px solid ${profile.theme.buttonTextColor};
        outline-offset: 2px;
      }
    </style>
</head>
<body class="min-h-screen">
  <main class="container mx-auto px-4 py-8 max-w-md" role="main">
    <article class="flex flex-col items-center justify-center text-center mb-8">
      ${
        profile.avatar
          ? `<img 
            src="${profile.avatar}" 
            alt="${profile.displayName}'s profile picture" 
            class="w-24 h-24 rounded-full mb-4 object-cover" 
            loading="eager"
            width="96"
            height="96"
          />`
          : `<div 
            class="w-24 h-24 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-2xl font-bold heading-font"
          >
            ${profile.displayName.charAt(0)}
          </div>`
      }
      <h2 class="text-2xl font-bold mb-2 heading-font">${
        profile.displayName
      }</h2>
      <p class="text-lg mb-4 text-font">${profile.bio}</p>
      <p class="text-sm opacity-70 text-font">@${profile.username}</p>
    </article>
    
    <nav class="flex flex-col gap-4">
      ${profile.links
        .map(
          (link, index) => `
        <a 
          href="${link.url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="link-button py-3 px-6 rounded-lg flex items-center justify-center text-lg font-medium text-font"
        >
          ${
            link.iconUrl
              ? `<span class="w-6 h-6 mr-2">
                <img 
                  src="${link.iconUrl}" 
                  alt="" 
                  class="w-full h-full object-contain rounded"
                  width="24"
                  height="24"
                  loading="lazy"
                />
               </span>`
              : ""
          }
          <span>${link.title}</span>
        </a>
      `
        )
        .join("")}
    </nav>
  </main>

  <footer class="text-center text-sm opacity-50 py-4 mt-8 text-font">
    <p>Created with ❤️ by Links</p>
  </footer>
</body>
</html>`;
  }, [profile]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const toggleExport = () => {
    setShowExport(!showExport);
  };
  // Render
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
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

              {showExport ? (
                <div className="export-panel">
                  <div className="mb-4 flex items-center">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 transition-colors"
                    >
                      <span>Copy HTML</span>
                      {copied && (
                        <span className="ml-2 text-sm">✓ Copied!</span>
                      )}
                    </button>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[1475px]">
                    <pre className="text-sm whitespace-pre-wrap">
                      {generateHTML}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="editor-panel space-y-6">
                  {/* Profile Section */}
                  <div className="text-[#EDE0D4]">
                    <h4 className="text-2xl font-bold mb-3">
                      Profile Details
                    </h4>
                    <hr className="my-4 border border-[#EDE0D4]"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Display name
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          value={profile.displayName}
                          onChange={handleProfileChange}
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
                          onChange={handleProfileChange}
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
                          onChange={handleProfileChange}
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
                          onChange={handleProfileChange}
                          placeholder="https://example.com/avatar.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Theme Section */}
                  <div className="text-[#EDE0D4]">
                    <h4 className="text-2xl mt-10 font-bold mb-3">Theme</h4>
                    <hr className="my-4 border border-[#EDE0D4]"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Background color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="theme.backgroundColor"
                            value={profile.theme.backgroundColor}
                            onChange={handleProfileChange}
                            className="h-10 w-10 rounded-sm"
                          />
                          <input
                            type="text"
                            name="theme.backgroundColor"
                            value={profile.theme.backgroundColor}
                            onChange={handleProfileChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Text color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="theme.textColor"
                            value={profile.theme.textColor}
                            onChange={handleProfileChange}
                            className="h-10 w-10 rounded-sm"
                          />
                          <input
                            type="text"
                            name="theme.textColor"
                            value={profile.theme.textColor}
                            onChange={handleProfileChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Button color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="theme.buttonColor"
                            value={profile.theme.buttonColor}
                            onChange={handleProfileChange}
                            className="h-10 w-10 rounded-sm"
                          />
                          <input
                            type="text"
                            name="theme.buttonColor"
                            value={profile.theme.buttonColor}
                            onChange={handleProfileChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Button text color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            name="theme.buttonTextColor"
                            value={profile.theme.buttonTextColor}
                            onChange={handleProfileChange}
                            className="h-10 w-10 rounded-sm"
                          />
                          <input
                            type="text"
                            name="theme.buttonTextColor"
                            value={profile.theme.buttonTextColor}
                            onChange={handleProfileChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Heading font
                        </label>
                        <select
                          name="theme.headingFont"
                          value={profile.theme.headingFont}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        >
                          {FONT_OPTIONS.heading.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xl font-bold mb-1 mt-2">
                          Text font
                        </label>
                        <select
                          name="theme.textFont"
                          value={profile.theme.textFont}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        >
                          {FONT_OPTIONS.text.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="text-[#EDE0D4]">
                    <h4 className="text-2xl mt-10 font-bold mb-3">Links</h4>
                    <hr className="my-4 border border-[#EDE0D4]"/>
                    <div className="space-y-4 mb-4">
                      {profile.links.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center"
                        >
                          <div className="flex-1 bg-[#E6CCB2] p-4 rounded-md">
                            <p className="font-bold text-lg text-[#7F5539]">{link.title}</p>
                            <div className="text-md text-[#B08968]">
                            {link.url && link.url.length > 32 ? `${link.url.slice(0, 32)}…` : link.url}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveLink(link.id)}
                            className="ml-2 text-[#EDE0D4] p-1 rounded-full transition-colors"
                          >
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
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg">
                    <h4 className="text-2xl mt-10 font-bold mb-3">Add new link</h4>
                    <hr className="my-4 border border-[#EDE0D4]"/>
                      <div className="grid grid-cols-1 gap-3 mb-3">
                        <div>
                          <label className="block text-xl font-bold mb-1 mt-2">
                            Link title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={newLink.title}
                            onChange={handleNewLinkChange}
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
                            onChange={handleNewLinkChange}
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
                            value={newLink.iconUrl}
                            onChange={handleNewLinkChange}
                            placeholder="https://example.com/icon.png"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleAddLink}
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
                  </div>
                </div>
              )}
            </div>
            <div
              className="lg:col-span-2 bg-[#B08968] rounded-lg px-12 pb-10 pt-6 overflow-hidden text-[#EDE0D4]"
            >
              <h4 className="text-2xl font-bold mb-4 text-center">Preview</h4>
              <Preview html={generateHTML} />
            </div>
            <div
              className="lg:col-span-2 bg-[#B08968] rounded-lg px-12 py-12 overflow-hidden text-[#EDE0D4]"
            >
              <h4 className="text-2xl font-bold text-center tracking-tight">Thank you for using Links!</h4>
              <hr className="my-4 border border-[#EDE0D4]"/>
              <p className="text-xl tracking-tight text-center">
                Thank you for using Links. We’re glad to be part of your journey in simplifying and enhancing your online experience.
                </p>
                <h4 className="text-2xl font-bold text-center tracking-tight mt-8">Your feedback!</h4>
                <hr className="my-4 border border-[#EDE0D4]"/>
                <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Links;
