"use client";

// JsonLd.tsx
import { useEffect } from "react";

interface JsonLdProps {
  jsonLdData: {
    "@context": string;
    "@type": string;
    name: string;
    image: string;
    description: string;
  };
}

const JsonLd = ({ jsonLdData }: JsonLdProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLdData]);

  return null;
};

export default JsonLd;