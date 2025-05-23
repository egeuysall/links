"use client";

import React, { useState, useCallback, useMemo } from "react";
import "../globals.css";
import {
  INITIAL_PROFILE,
  generateHTML,
} from "./LinkUtils";
import {
  Preview,
  ProfileForm,
  ThemeForm,
  AddLinkForm,
  CodeBlockWrapper,
} from "./LinksComponent";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link"
import { LinkItem, UserProfile } from "@/types/newlinks.types";
import Image from "next/image";

// JetBrains Mono font configuration
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

const LinksList = ({
  links,
  onRemoveLink,
}: {
  links: LinkItem[];
  onRemoveLink: (id: string) => void;
}) => {
  if (links.length === 0) {
    return <div className="text-md">No links added yet</div>;
  }

  return (
    <div className="space-y-3 mb-4">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
        >
          <div className="flex items-center space-x-2">
            {link.iconUrl && (
              //TODO: check if Image can be used
              // <img src={link.iconUrl} alt="icon" className="w-5 h-5" />
              <Image src={link.iconUrl} width={20} height={20} alt="icon" />
            )}
            <span className="font-medium">{link.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              {link.url}
            </Link>
            <button
              onClick={() => onRemoveLink(link.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Links() {
  // Core state definitions
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [newLink, setNewLink] = useState<Omit<LinkItem, "id">>({
    title: "",
    url: "",
    iconUrl: "",
  });
  const [showExport, setShowExport] = useState(false);

  // Updates profile state from form inputs
  const handleProfileChange = useCallback(
    (
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
    },
    []
  );

  // Adds a new link to the profile
  const handleAddLink = useCallback(() => {
    if (newLink.title && newLink.url) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        links: [
          ...prevProfile.links,
          {
            ...newLink,
            id: Date.now().toString(),
          },
        ],
      }));

      setNewLink({ title: "", url: "", iconUrl: "" });
    }
  }, [newLink]);

  // Removes a link from the profile
  const handleRemoveLink = useCallback((id: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      links: prevProfile.links.filter((link) => link.id !== id),
    }));
  }, []);

  // Updates new link form state
  const handleNewLinkChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewLink((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Toggles between editor and export views
  const toggleExport = useCallback(() => {
    setShowExport((prev) => !prev);
  }, []);

  const htmlContent = generateHTML(profile);

  const exportButton = useMemo(
    () => (
      <button
        onClick={toggleExport}
        className="outline-none bg-[#B08968] text-[#EDE0D4] p-3 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-lg font-bold transition-colors duration-300"
      >
        {showExport ? "Back to editor" : "Export code"}
      </button>
    ),
    [toggleExport, showExport]
  );

  // HTML export view with code display
  const exportPanel = useMemo(
    () => (
      <div className="export-panel px-2">
        <div
          className={`overflow-x-scroll max-h-[1500px] ${jetBrainsMono.className}`}
        > 
          <CodeBlockWrapper
            language="html"
            fileName={`${profile.displayName || "Links User"}'s Website`}
            code={htmlContent}
          />
        </div>
      </div>
    ),
    [htmlContent, profile.displayName] // Removed jetBrainsMono.className
  );

  // Main editor interface with forms
  const editorPanel = useMemo(
    () => (
      <div id="customize" className="editor-panel text-[#593116] space-y-6">
        <ProfileForm profile={profile} onChange={handleProfileChange} />
        <ThemeForm theme={profile.theme} onChange={handleProfileChange}/>
        <div className="text-[#593116]">
          <h4 className="text-2xl mt-10 font-bold">Links</h4>
          <LinksList links={profile.links} onRemoveLink={handleRemoveLink} />
          <AddLinkForm
            newLink={newLink}
            onLinkChange={handleNewLinkChange}
            onAddLink={handleAddLink}
          />
        </div>
      </div>
    ),
    [
      profile,
      handleProfileChange,
      newLink,
      handleNewLinkChange,
      handleAddLink,
      handleRemoveLink,
    ]
  );

  // Live preview of the generated page
  const previewPanel = useMemo(
    () => (
      <div className="lg:col-span-2 rounded-md text-[#593116]">
        <h3 className="text-3xl font-bold mb-4 text-center">Preview</h3>
        <Preview html={htmlContent} />
      </div>
    ),
    [htmlContent]
  );

  // Feedback collection section
  const feedbackPanel = useMemo(
    () => (
      <section 
  aria-labelledby="next-steps-heading" 
  className="lg:col-span-2 ld:pl-8 text-[#593116]"
>
  <header className="mb-4">
    <h3 
      id="next-steps-heading" 
      className="text-3xl font-bold text-center tracking-tight"
    >
      Next Steps
    </h3>
  </header>

  <nav aria-label="Deployment steps">
    <ol className="list-decimal flex flex-col gap-6 text-lg">
      <li>
        <strong>Set Up GitHub Repository:</strong> Create a new GitHub repository 
        for your links page. Refer to the "Setting Up GitHub Repository" section 
        in our documentation, which includes visual examples of the entire setup 
        process.
      </li>
      <li>
        <strong>Add Your Code:</strong> Copy your generated code into a new 
        "index.html" file in your GitHub repository. The "Adding Your Code to 
        GitHub" section of our documentation shows you exactly how to do this 
        with clear visual guides.
      </li>
      <li>
        <strong>Deploy with Vercel:</strong> Follow our detailed Vercel 
        deployment guide in the documentation&apos;s "Deploying with Vercel" section. 
        We&apos;ve included comprehensive screenshots of each step to make the process 
        straightforward.
      </li>
    </ol>
  </nav>

  <footer className="mt-6 bg-[#E6CCB2] p-6 rounded-lg">
    <div className="mb-3">
      <p className="text-lg font-semibold">💡 Pro Tip:</p>
      <p className="text-lg">
        <Link
          href="/docs/getting-started"
          className="text-[#7F5539] font-bold hover:underline"
          aria-label="View comprehensive documentation with visual guides"
        >
          Our documentation {" "}
        </Link>
        includes detailed screenshots and examples for each step. 
        Make sure to reference them as you go through the deployment process.
      </p>
    </div>
    <p className="italic text-sm">
      Need assistance? Visit our{" "}
      <Link
        href="https://github.com/egeuysall/links/issues"
        className="text-[#7F5539] font-bold hover:underline"
        aria-label="Open an issue on GitHub"
      >
        GitHub repository
      </Link>{" "}
      to open an issue or review common questions.
    </p>
  </footer>
</section>
    ),
    []
  );

  return (
    <div className="w-full">
      <div className="container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 lg:row-span-2 text-[#593116] rounded-md">
            <div className="flex justify-between items-center mb-6">
              {exportButton}
            </div>

            {showExport ? exportPanel : editorPanel}
          </div>
          {previewPanel}
          {feedbackPanel}
        </div>
      </div>
    </div>
  );
}
