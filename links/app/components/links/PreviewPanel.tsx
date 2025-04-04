"use client";

import React from "react";

interface PreviewPanelProps {
  html: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ html }) => {
  return (
    <div className="lg:col-span-2 row-span-1 rounded-md text-[#593116]">
      <h3 className="text-3xl mb-4 font-bold text-center">Preview</h3>
      <iframe
        srcDoc={html}
        title="Preview"
        className="w-full"
        style={{
          height: "750px",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};