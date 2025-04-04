"use client";

import React from "react";
import { UserProfile, LinkItem } from "@/lib/LinkUtils";
import { ExportPanel } from "./ExportPanel";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import { FeedbackPanel } from "./FeedbackPanel";
import { JetBrains_Mono } from "next/font/google";

// JetBrains Mono font configuration
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
});

interface LinksPageLayoutProps {
  profile: UserProfile;
  newLink: Omit<LinkItem, "id">;
  showExport: boolean;
  htmlContent: string;
  onProfileChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onAddLink: () => void;
  onRemoveLink: (id: string) => void;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleExport: () => void;
}

export default function LinksPageLayout({
  profile,
  newLink,
  showExport,
  htmlContent,
  onProfileChange,
  onAddLink,
  onRemoveLink,
  onLinkChange,
  onToggleExport,
}: LinksPageLayoutProps) {
  return (
    <div className="w-full">
      <div className="container w-full">
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 row-span-2 lg:row-span-2 text-[#593116]">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onToggleExport}
                className="outline-none bg-[#B08968] text-[#EDE0D4] p-3 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-lg font-bold transition-colors duration-300"
              >
                {showExport ? "Back to editor" : "Export code"}
              </button>
            </div>

            {showExport ? (
              <ExportPanel
                htmlContent={htmlContent}
                profile={profile}
                jetBrainsMonoClass={jetBrainsMono.className}
              />
            ) : (
              <EditorPanel
                profile={profile}
                newLink={newLink}
                onProfileChange={onProfileChange}
                onLinkChange={onLinkChange}
                onAddLink={onAddLink}
                onRemoveLink={onRemoveLink}
              />
            )}
          </div>
          <PreviewPanel html={htmlContent} />
          <FeedbackPanel />
        </div>
      </div>
    </div>
  );
}