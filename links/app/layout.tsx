import type { Metadata } from "next";

// Styles and fonts
import "./globals.css";
import { spaceGrotesk, lato } from "./fonts";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./components/LayoutWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Function to get product data
async function getProduct() {
  return {
    name: "Links – Connect everything, effortlessly",
    image: "/og-links.jpg",
    description:
      "Links is the ultimate bio link tool. Showcase all your content in one customizable link. Claim your link today!",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data needed for metadata
  const product = await getProduct();

  return {
    title: {
      default: "Links – Connect everything, effortlessly",
      template: "%s | Links",
    },
    description:
      "Links is the ultimate bio link tool. Showcase all your content in one customizable link. Claim your link today!",
    metadataBase: new URL("https://www.links.egeuysal.com/"),
    authors: [{ name: "Ege Uysal" }],
    keywords:
      "Bio link solution, Customizable landing page, Multi-link bio page, One link for everything, All-in-one links tool, Social media bio link, Portfolio link organizer, Easy link sharing, Personal content showcase, Online link management, Digital link page, Link aggregation tool, Simplified link sharing, Centralized URL page, Link organizer for creatives, Custom link hub, Professional bio link, Showcase multiple links, Digital presence link, One-click link access, Curated links page, URL sharing platform, Custom link collection, Seamless link management, Simplified portfolio link, Multi-link profile page",
    openGraph: {
      title: "Links – Connect everything, effortlessly",
      description:
        "Links is the ultimate bio link tool. Showcase all your content in one customizable link. Claim your link today!",
      url: "https://www.links.egeuysal.com/",
      images: [
        {
          url: "/og-links.jpg", // Keep relative - metadataBase will handle this
          width: 1200,
          height: 630,
          alt: "Links Logo",
        },
      ],
      type: "website",
      locale: "en_US",
      siteName: "Links – Connect everything, effortlessly",
    },
    twitter: {
      card: "summary_large_image",
      site: "@links",
      title: "Links – Connect everything, effortlessly",
      description:
        "Links is the ultimate bio link tool. Showcase all your content in one customizable link. Claim your link today!",
      images: ["/og-links.jpg"],
      creator: "@links",
    },
    icons: {
      icon: [
        { url: "/icon.ico", sizes: "any" }, // Use standard favicon name
        { url: "/icon.png", type: "image/png" }, // Additional icon format
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/icon.ico", // Match the primary favicon name
    },
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.links.egeuysal.com/",
    },
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
    themeColor: "#9C6644",
    applicationName: "Links – Connect everything, effortlessly",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },
    other: {
      appleMobileWebAppCapable: "yes",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getProduct();

  // Calculate one year from current date (2025-03-24)
  const priceValidUntilDate = "2026-03-24";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    url: "https://www.links.egeuysal.com/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://www.links.egeuysal.com/",
      priceValidUntil: priceValidUntilDate,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: "0",
            maxValue: "0",
            unitCode: "HUR",
          },
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    merchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    creator: {
      "@type": "Person",
      name: "Ege Uysal",
      jobTitle: "Creative Professional",
      worksFor: {
        "@type": "Organization",
        name: "Self-employed",
      },
    },
    sameAs: [
      "https://twitter.com/egecreates",
      "https://www.linkedin.com/in/egeuysal",
      "https://www.instagram.com/egeuysalo",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lato.variable} !scroll-smooth`}
    >
      <head>
        {/* Add explicit og tags to help Discord parser */}
        <meta
          property="og:title"
          content="Links – Connect everything, effortlessly"
        />
        <meta
          property="og:description"
          content="Links is the ultimate bio link tool. Showcase all your content in one customizable link. Claim your link today!"
        />
        <meta
          property="og:image"
          content="https://www.links.egeuysal.com/og-links.jpg"
        />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={lato.className}>
        <LayoutWrapper>
          <div className="min-h-screen flex flex-col items-center justify-between mb-12">
            <main className="w-[85vw] max-w-7xl flex-1 flex flex-col py-4">
              <Header />
              <div className="flex-1 my-4">{children}</div>
              <Analytics />
              <SpeedInsights />
              <Footer />
            </main>
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
