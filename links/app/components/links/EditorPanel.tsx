"use client";

import React from "react";
import { UserProfile, LinkItem } from "@/lib/LinkUtils";
import { ProfileForm } from "./forms/ProfileForm";
import { ThemeForm } from "./forms/ThemeForm";
import { LinksList } from "./links/LinksList";
import { AddLinkForm } from "./forms/AddLinkForm";

interface EditorPanelProps {
  profile: UserProfile;
  newLink: Omit<LinkItem, "id">;
  onProfileChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddLink: () => void;
  onRemoveLink: (id: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  profile,
  newLink,
  onProfileChange,
  onLinkChange,
  onAddLink,
  onRemoveLink,
}) => {
  return (
    <div id="customize" className="editor-panel text-[#593116] space-y-6">
      <ProfileForm profile={profile} onChange={onProfileChange} />
      <ThemeForm theme={profile.theme} onChange={onProfileChange} />
      <div className="text-[#593116]">
        <h4 className="text-2xl mt-10 font-bold">Links</h4>
        <LinksList links={profile.links} onRemoveLink={onRemoveLink} />
        <AddLinkForm
          newLink={newLink}
          onLinkChange={onLinkChange}
          onAddLink={onAddLink}
        />
      </div>
    </div>
  );
};