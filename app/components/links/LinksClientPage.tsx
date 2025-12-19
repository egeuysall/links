"use client";

import React from "react";
import { generateHTML } from "@/lib/LinkUtils";
import LinksPageLayout from "./LinksPageLayout";
import { useLinksState } from "../../hooks/useLinksState";

export default function LinksClientPage() {
  const {
    profile,
    newLink,
    showExport,
    handleProfileChange,
    handleAddLink,
    handleRemoveLink,
    handleNewLinkChange,
    toggleExport,
  } = useLinksState();

  // Generate HTML using the imported function
  const htmlContent = generateHTML(profile);

  return (
    <LinksPageLayout
      profile={profile}
      newLink={newLink}
      showExport={showExport}
      htmlContent={htmlContent}
      onProfileChange={handleProfileChange}
      onAddLink={handleAddLink}
      onRemoveLink={handleRemoveLink}
      onLinkChange={handleNewLinkChange}
      onToggleExport={toggleExport}
    />
  );
}