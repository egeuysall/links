"use client";

import React, { useState, useCallback } from "react";
import "../globals.css";
import { 
  INITIAL_PROFILE, 
  UserProfile, 
  LinkItem,
  generateHTML 
} from "./LinkUtils";
import {
  Preview,
  ProfileForm,
  ThemeForm,
  AddLinkForm,
  LinksList,
  CodeBlockWrapper
} from "./LinksComponent";
import ContactForm from "./ContactForm";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

// Main Component (Client Component)
export default function Links() {
  // State management
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  
  const [newLink, setNewLink] = useState<Omit<LinkItem, "id">>({
    title: "",
    url: "",
    iconUrl: "",
  });

  const [showExport, setShowExport] = useState(false);

  // Event Handlers
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

  // Generated HTML content
  const htmlContent = generateHTML(profile);

  // Export panel
  const exportPanel = (
    <div className="export-panel px-2">
      <div className={`rounded-lg overflow-auto max-h-[1525px] ${jetBrainsMono.className}`}>
        <CodeBlockWrapper
          language="html"
          fileName={`${profile.displayName}'s Website`}
          code={htmlContent}
        />
      </div>
    </div>
  );

  // Editor panel
  const editorPanel = (
    <div className="editor-panel space-y-6">
      {/* Profile Section */}
      <ProfileForm profile={profile} onChange={handleProfileChange} />

      {/* Theme Section */}
      <ThemeForm theme={profile.theme} onChange={handleProfileChange} />

      {/* Links Section */}
      <div className="text-[#EDE0D4]">
        <h4 className="text-2xl mt-10 font-bold mb-3">Links</h4>
        <hr className="my-4 border border-[#EDE0D4]" />
        <LinksList 
          links={profile.links} 
          onRemoveLink={handleRemoveLink} 
        />
        <AddLinkForm 
          newLink={newLink} 
          onLinkChange={handleNewLinkChange} 
          onAddLink={handleAddLink} 
        />
      </div>
    </div>
  );

  return (
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
            <Preview html={htmlContent} />
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
  );
}