"use client";

import React from "react";
import { UserProfile } from "@/lib/LinkUtils";
import { CodeBlockWrapper } from "../ui/CodeBlockWrapper";

interface ExportPanelProps {
  htmlContent: string;
  profile: UserProfile;
  jetBrainsMonoClass: string;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  htmlContent,
  profile,
  jetBrainsMonoClass,
}) => {
  return (
    <div className="export-panel px-2">
      <div className={`h-full ${jetBrainsMonoClass}`}>
        <CodeBlockWrapper
          language="html"
          fileName={`${profile.username.toLowerCase() || "links-user"}-link`}
          code={htmlContent}
        />
      </div>
    </div>
  );
};