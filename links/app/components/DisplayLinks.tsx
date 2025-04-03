"use client";

import React, { useState } from "react";
import CodeBlock from "../components/CodeBlock";

const DisplayLinks: React.FC = (): React.ReactNode => {
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const toggleView = (): void => {
    setShowPreview((prev) => !prev);
  };

  const codeString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    
  <!-- Primary Meta Tags -->
  <title>Links | Links</title>
  <meta name="title" content="Links | Links">
  <meta name="description" content="Hello, we’re Links. We offer an open-source, SEO-optimized, and free link-in-bio service.">
  <meta name="author" content="Links">
  <meta name="generator" content="Links by egeuysall">
  <meta name="keywords" content="profile links, linkshq, Links, social links, portfolio, contact">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://links.egeuysall.com/linkshq">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://links.egeuysall.com/linkshq">
  <meta property="og:title" content="Links">
  <meta property="og:description" content="Hello, we’re Links. We offer an open-source, SEO-optimized, and free link-in-bio service.">
  <meta property="og:image" content="https://res.cloudinary.com/ddjnqljd8/image/upload/v1743375048/full-logo.svg">
  <meta property="og:site_name" content="Links">
  <meta property="profile:username" content="linkshq">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://links.egeuysall.com/linkshq">
  <meta property="twitter:title" content="Links">
  <meta property="twitter:description" content="Hello, we’re Links. We offer an open-source, SEO-optimized, and free link-in-bio service.">
  <meta property="twitter:image" content="https://res.cloudinary.com/ddjnqljd8/image/upload/v1743375048/full-logo.svg">
  
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Lato:wght@400;700&family=Inter:wght@400;700&family=Montserrat:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" href="https://links.egeuysall.com/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="https://links.egeuysall.com/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="https://links.egeuysall.com/apple-touch-icon.png">
    
    <!-- Styles and Scripts -->
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
            font-family: 'Space Grotesk', system-ui, sans-serif;
            font-weight: 700;
        }
        .text-font {
            font-family: 'Lato', sans-serif;
            font-weight: 400;
        }
        .button-font {
          font-family: 'Lato', sans-serif;
          font-weight: 700;
        }
    </style>
    
    
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Links",
      "alternateName": "linkshq",
      "description": "Hello, we’re Links. We offer an open-source, SEO-optimized, and free link-in-bio service.",
      "image": "https://res.cloudinary.com/ddjnqljd8/image/upload/v1743375048/full-logo.svg",
      "url": "https://links.egeuysall.com/linkshq"
    },
    "dateModified": "2025-03-30"
  }
  </script>
  
</head>
<body
    class="flex h-screen w-screen items-center justify-center bg-[#E6CCB2] text-[#593116]">
    <main class="flex h-screen w-screen flex-col items-center justify-center">
        <section class="flex w-[70vw] flex-col items-center justify-center">
            <img src="https://res.cloudinary.com/ddjnqljd8/image/upload/v1743375048/full-logo.svg" alt="Links's profile picture"
        class="mb-4 h-31 w-31 rounded-full transition-all duration-200 hover:grayscale" loading="eager"
        width="128" height="128" fetchpriority="high" />
            <article class="flex flex-col items-center">
                <h1 class="mb-1 text-3xl font-bold tracking-tight heading-font">
                    Links</h1>
                <h2 class="mb-4 text-base tracking-tight opacity-50 text-font">
                    @linkshq</h2>
                <p aria-label="bio" class="text-center text-lg tracking-tight text-font">
                    Hello, we’re Links. We offer an open-source, SEO-optimized, and free link-in-bio service.
                </p>
            </article>
            <section class="flex items-center justify-center w-full">
            <nav aria-label="Social Links" class="mt-6 flex w-full flex-col gap-4 items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-items-center">
                
  <a 
    href="https://www.links.egeuysal.com/" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex button-font w-full items-center justify-center gap-2 rounded-lg py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[#593116] text-[#E6CCB2]"
    aria-label="Visit Website"
  >
    
    <span class="button-font">Website</span>
  </a>
  
  <a 
    href="https://github.com/egeuysall/links" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex button-font w-full items-center justify-center gap-2 rounded-lg py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[#593116] text-[#E6CCB2]"
    aria-label="Visit GitHub"
  >
    
    <span class="button-font">GitHub</span>
  </a>
  <a 
    href="mailto:hello@egeuysal.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex button-font w-full items-center justify-center gap-2 rounded-lg py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[#593116] text-[#E6CCB2]"
    aria-label="Visit Website"
  >
    
    <span class="button-font">Contact</span>
  </a>
  
            </nav>
            </section
        </section>
        <section class="flex w-[75vw] flex-col items-center justify-center">
            <p aria-label="Made by" class="text-font mt-8 text-center text-base opacity-50">
                Created with ❤️ by Links
            </p>
        </section>
    </main>
</body>
</html>`;

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full flex items-center flex-col gap-6">
        <button
          onClick={toggleView}
          className="outline-none bg-[#B08968] text-[#EDE0D4] p-3 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-lg font-bold transition-colors duration-300"
        >
          {showPreview ? "Show Code" : "Show Preview"}
        </button>
        {showPreview ? (
          <iframe
            srcDoc={codeString}
            className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] rounded-lg h-[650px] md:h-[550px]"
            title="Preview"
          />
        ) : (
          <CodeBlock
            code={codeString}
            language="html"
            fileName="Links' links"
          />
        )}
      </div>
    </div>
  );
};

export default DisplayLinks;
