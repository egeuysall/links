import JsonLd from "./JsonLd";

interface LayoutWrapperProps {
  children: React.ReactNode;
  jsonLdData?: {
    "@context": string;
    "@type": string;
    name: string;
    image: string;
    description: string;
    [key: string]: any;
  };
}
// TODO: check any types
export default function LayoutWrapper({ jsonLdData, children }: LayoutWrapperProps) {
  return (
    <>
      {jsonLdData && <JsonLd jsonLdData={jsonLdData} />}
      {children}
    </>
  );
}