"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
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

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

const getFormattedDate = () => {
  const now = new Date();
  return (
    now.getUTCFullYear() +
    "-" +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getUTCDate()).padStart(2, "0") +
    " " +
    String(now.getUTCHours()).padStart(2, "0") +
    ":" +
    String(now.getUTCMinutes()).padStart(2, "0") +
    ":" +
    String(now.getUTCSeconds()).padStart(2, "0")
  );
};

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

    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${profile.displayName} | Connect with me | Links Platform</title>
    <meta name="title" content="${
      profile.displayName
    } | Connect with me | Links Platform" />
    <meta name="description"
        content="${profile.bio} | Connect with ${
      profile.displayName
    } on social media, websites, and other platforms through this curated link collection." />
    <meta name="author" content="${profile.displayName}" />
    <meta name="creator" content="egeuysall" />
    <meta name="generator" content="Links Platform" />
    <meta name="keywords"
        content="links, social media, ${
          profile.displayName
        }, profile links, bio links, ${
      profile.username
    }, contact, connect, portfolio, ${profile.links
      .map((link) => link.title)
      .join(", ")}" />
    <meta name="created" content="2025-03-27T15:31:31Z" />
    <meta name="revised" content="2025-03-27T15:31:31Z"/>
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="canonical" content="https://links.platform/${
      profile.username
    }" />
    <meta name="theme-color" content="${profile.theme.backgroundColor}" />

    <link rel="icon" type="image/png" href="${profile.avatar}" />
    <link rel="apple-touch-icon" href="${profile.avatar}" />

    <meta property="og:type" content="profile" />
    <meta property="og:url" content="https://links.platform/${
      profile.username
    }" />
    <meta property="og:title" content="${
      profile.displayName
    } | Connect with me | Links Platform" />
    <meta property="og:description"
        content="${profile.bio} | Connect with ${
      profile.displayName
    } on social media, websites, and other platforms through this curated link collection." />
    <meta property="og:image" content="${profile.avatar}" />
    <meta property="og:image:alt" content="${
      profile.displayName
    }'s profile photo" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="profile:username" content="${profile.username}" />
    <meta property="og:site_name" content="Links Platform" />
    <meta property="og:locale" content="en_US" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://links.platform/${
      profile.username
    }" />
    <meta property="twitter:creator" content="@${profile.username}" />
    <meta property="twitter:site" content="@linksplatform" />
    <meta property="twitter:title" content="${
      profile.displayName
    } | Connect with me | Links Platform" />
    <meta property="twitter:description"
        content="${profile.bio} | Connect with ${
      profile.displayName
    } on social media, websites, and other platforms through this curated link collection." />
    <meta property="twitter:image" content="${profile.avatar}" />
    <meta property="twitter:image:alt" content="${
      profile.displayName
    }'s profile photo" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Lato:wght@400;700&family=Inter:wght@400;700&family=Montserrat:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet" />

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

        /* Base styles */
        .heading-font {
            font-family: ${getHeadingFontFamily()};
            font-weight: 700;
        }

        .text-font {
            font-family: ${getTextFontFamily()};
            font-weight: 400;
        }

        .button-font {
          font-family: ${getTextFontFamily()};
          font-weight: 500;
        }
    </style>
</head>

<body
    class="flex h-screen w-screen items-center justify-center bg-[${
      profile.theme.backgroundColor
    }] text-[${profile.theme.textColor}]">
    <main class="flex h-screen w-screen flex-col items-center justify-center">
        <section class="flex w-[70vw] flex-col items-center justify-center">
            ${
              profile.avatar
                ? `<img src="${profile.avatar}" alt="${profile.displayName}'s profile picture"
                class="mb-4 h-31 w-31 rounded-full transition-all duration-200 hover:grayscale" loading="eager"
                width="128" height="128" fetchpriority="high" />`
                : `<div
                class="heading-font mb-4 h-31 w-31 rounded-full flex items-center justify-center text-4xl heading-font font-bold transition-all duration-200 hover:grayscale bg-[${
                  profile.theme.backgroundColor
                }] invert-4"
                aria-label="${profile.displayName}'s profile initial">
                ${profile.displayName.charAt(0).toUpperCase()}
            </div>`
            }
            <article class="flex flex-col items-center">
                <h1 class="mb-1 text-3xl font-bold tracking-tight heading-font">
                    ${profile.displayName}</h1>
                <h2 class="mb-4 text-base tracking-tight opacity-50 text-font">
                    @${profile.username.toLowerCase()}</h2>
                <p aria-label="bio" class="text-center text-lg tracking-tight text-font">
                    ${profile.bio}
                </p>
            </article>
            <section class="flex items-center justify-center w-full">
            <nav aria-label="Social Links" class="mt-6 flex w-full flex-col gap-4 items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-items-center">
                ${profile.links
                  .map(
                    (link) => `
                <a 
                  href="${link.url}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="flex button-font w-full items-center justify-center gap-2 rounded-lg py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[${
                    profile.theme.buttonColor
                  }] text-[${profile.theme.buttonTextColor}]"
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
                  )
                  .join("")}
            </nav>
            </section
        </section>
        <section class="flex w-[75vw] flex-col items-center justify-center">
            <p aria-label="Made by" class="text-font mt-8 text-center text-base opacity-50">
                Created with ❤️ by Links
            </p>
        </section>

        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": "${profile.displayName}",
            "alternateName": "${profile.username}",
            "description": "${profile.bio}",
            "image": "${profile.avatar}",
            "url": "https://links.platform/${profile.username}",
            "sameAs": [${profile.links
              .map((link) => `"${link.url}"`)
              .join(", ")}]
          },
          "publisher": {
            "@type": "Organization",
            "name": "Links Platform",
            "logo": {
              "@type": "ImageObject",
              "url": "${profile.avatar}"
            }
          },
          "datePublished": "2025-03-27T15:31:31Z",
          "dateModified": "2025-03-27T15:31:31Z",
          "creator": {
            "@type": "Person",
            "name": "egeuysall"
          }
        }
      </script>
    </main>
</body>

</html>`;
  }, [profile]);

  const toggleExport = () => {
    setShowExport(!showExport);
  };
  // Render
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

              {showExport ? (
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
              ) : (
                <div className="editor-panel space-y-6">
                  {/* Profile Section */}
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
                    <hr className="my-4 border border-[#EDE0D4]" />
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
                    <hr className="my-4 border border-[#EDE0D4]" />
                    <div className="space-y-4 mb-4">
                      {profile.links.map((link) => (
                        <div
                          key={link.id}
                          className="items-center grid grid-cols-6"
                        >
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
                            onClick={() => handleRemoveLink(link.id)}
                            className="ml-2 text-[#EDE0D4] p-1 rounded-full transition-colors col-span-1 flex flex-col items-center justify-center"
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
                Thank you for using Links. We’re glad to be part of your journey
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
