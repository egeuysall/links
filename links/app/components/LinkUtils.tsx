// Types and Interfaces
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
}

export interface UserProfile {
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
    buttonRounding: number; // New property for button rounding
  };
}

// Constants - defined outside of component rendering for better performance
export const FONT_OPTIONS = {
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

export const INITIAL_PROFILE: UserProfile = {
  username: "",
  displayName: "",
  bio: "",
  avatar: "",
  links: [],
  theme: {
    backgroundColor: "#f2f2f2",
    textColor: "#121212",
    buttonColor: "#121212",
    buttonTextColor: "#f2f2f2",
    headingFont: "space-grotesk",
    textFont: "lato",
    buttonRounding: 8, // Default rounding of 8px
  },
};

// Font utility functions
// Memoize font family mappings to avoid recalculating them
const FONT_FAMILY_MAP = {
  "space-grotesk": "'Space Grotesk', system-ui, sans-serif",
  "jetbrains-mono": "'JetBrains Mono', monospace",
  "inter": "'Inter', sans-serif",
  "montserrat": "'Montserrat', sans-serif",
  "arial": "Arial, sans-serif",
  "lato": "'Lato', sans-serif",
  "default": "system-ui, sans-serif"
};

export const getFontFamily = (fontName: string): string => {
  // Use the pre-computed map instead of a switch statement for better performance
  return FONT_FAMILY_MAP[fontName as keyof typeof FONT_FAMILY_MAP] || FONT_FAMILY_MAP.default;
};

// Helper function to create link elements
const createLinkElement = (link: LinkItem, buttonColor: string, buttonTextColor: string, buttonRounding: number): string => {
  return `
  <a 
    href="${link.url}" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="flex button-font w-full items-center justify-center gap-2 rounded-[${buttonRounding}px] py-3.5 px-3.5 text-lg transition-opacity duration-200 hover:opacity-75 bg-[${buttonColor}] text-[${buttonTextColor}]"
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
  `;
};

// Generate the meta tags section to reduce complexity in the main function
const generateMetaTags = (
  safeDisplayName: string,
  safeBio: string,
  safeUsername: string,
  canonicalUrl: string,
  avatar?: string
): string => {
  return `
  <!-- Primary Meta Tags -->
  <title>${safeDisplayName} | Links</title>
  <meta name="title" content="${safeDisplayName} | Links">
  <meta name="description" content="${safeBio}">
  <meta name="author" content="${safeDisplayName}">
  <meta name="generator" content="Links by egeuysall">
  <meta name="keywords" content="profile links, ${safeUsername}, ${safeDisplayName}, social links, portfolio, contact">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="profile">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${safeDisplayName}">
  <meta property="og:description" content="${safeBio}">
  ${avatar ? `<meta property="og:image" content="${avatar}">` : ''}
  <meta property="og:site_name" content="Links">
  <meta property="profile:username" content="${safeUsername}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonicalUrl}">
  <meta property="twitter:title" content="${safeDisplayName}">
  <meta property="twitter:description" content="${safeBio}">
  ${avatar ? `<meta property="twitter:image" content="${avatar}">` : ''}
  `;
};

// Generate the JSON-LD structured data
const generateJsonLd = (
  safeDisplayName: string,
  safeUsername: string,
  safeBio: string,
  canonicalUrl: string,
  currentDate: string,
  avatar?: string
): string => {
  return `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "${safeDisplayName}",
      "alternateName": "${safeUsername}",
      "description": "${safeBio}",
      ${avatar ? `"image": "${avatar}",` : ''}
      "url": "${canonicalUrl}"
    },
    "dateModified": "${currentDate}"
  }
  </script>
  `;
};

// HTML generation function with performance optimizations
export const generateHTML = (profile: UserProfile): string => {
  // Destructure profile once to avoid multiple object property accesses
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
      textFont,
      buttonRounding = 8 // Default to 8px if not set
    } 
  } = profile;

  // Format current timestamp in YYYY-MM-DD format - only calculate once
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Format safe display name and username - only calculate once
  const safeDisplayName = displayName || 'Links User';
  const safeUsername = username.toLowerCase() || 'linksuser';
  const safeBio = bio || ' through my links';
  
  // Generate canonical URL - only calculate once
  const canonicalUrl = `https://links.egeuysall.com/${safeUsername}`;
  
  // Prepare links list for the page - use a more efficient approach by iterating once
  const linkElements = links.map(link => createLinkElement(link, buttonColor, buttonTextColor, buttonRounding)).join("");

  // Generate profile avatar/placeholder - calculate conditionally only once
  const avatarElement = avatar
    ? `<img src="${avatar}" alt="${safeDisplayName}'s profile picture"
        class="mb-4 h-31 w-31 rounded-full transition-all duration-200 hover:grayscale" loading="eager"
        width="128" height="128" fetchpriority="high" />`
    : `<div
        class="heading-font mb-4 h-31 w-31 rounded-full flex items-center justify-center text-4xl heading-font font-bold transition-all duration-200 hover:grayscale bg-[${backgroundColor}] invert-4"
        aria-label="${safeDisplayName}'s profile initial">
        ${safeDisplayName.charAt(0).toUpperCase()}
      </div>`;

  // Get font families - calculate once 
  const headingFontFamily = getFontFamily(headingFont);
  const textFontFamily = getFontFamily(textFont);
  
  // Generate meta tags section
  const metaTags = generateMetaTags(safeDisplayName, safeBio, safeUsername, canonicalUrl, avatar);
  
  // Generate JSON-LD script
  const jsonLdScript = generateJsonLd(safeDisplayName, safeUsername, safeBio, canonicalUrl, currentDate, avatar);

  // Return the complete HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    ${metaTags}
    
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
            font-family: ${headingFontFamily};
            font-weight: 700;
        }
        .text-font {
            font-family: ${textFontFamily};
            font-weight: 400;
        }
        .button-font {
          font-family: ${textFontFamily};
          font-weight: 700;
        }
    </style>
    
    ${jsonLdScript}
</head>
<body
    class="flex h-screen w-screen items-center justify-center bg-[${backgroundColor}] text-[${textColor}]">
    <main class="flex h-screen w-screen flex-col items-center justify-center">
        <section class="flex w-[70vw] flex-col items-center justify-center">
            ${avatarElement}
            <article class="flex flex-col items-center">
                <h1 class="mb-1 text-3xl font-bold tracking-tight heading-font">
                    ${safeDisplayName}</h1>
                <h2 class="mb-4 text-base tracking-tight opacity-50 text-font">
                    @${safeUsername}</h2>
                <p aria-label="bio" class="text-center text-lg tracking-tight text-font">
                    ${safeBio}
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
              &copy; 2025 ${safeDisplayName}
            </p>
        </section>
    </main>
</body>
</html>`;
};
