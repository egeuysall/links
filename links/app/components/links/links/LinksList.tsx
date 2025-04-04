"use client";

import React from "react";
import { LinkItem } from "@/lib/LinkUtils";
import { LinkItemDisplay } from "./LinkItemDisplay";

interface LinksListProps {
  links: LinkItem[];
  onRemoveLink: (id: string) => void;
}

export const LinksList: React.FC<LinksListProps> = ({ links, onRemoveLink }) => {
  if (links.length === 0) {
    return <p className="text-md text-[#B08968]">No links added yet</p>;
  }

  return (
    <div className="space-y-3 mt-4 flex flex-col justify-center mb-4 w-full h-full">
      {links.map((link) => (
        <LinkItemDisplay 
          key={link.id} 
          link={link} 
          onRemove={onRemoveLink} 
        />
      ))}
    </div>
  );
};