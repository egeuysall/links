"use client";

import { useState, useCallback } from "react";
import { INITIAL_PROFILE, UserProfile, LinkItem } from "@/lib/LinkUtils";

export function useLinksState() {
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
          
          // Fix: Use a more specific type to handle both string and number values
          if (themeProperty === "buttonRounding") {
            return {
              ...prevProfile,
              theme: {
                ...prevProfile.theme,
                [themeProperty]: parseInt(value, 10),
              },
            };
          }
          
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

  return {
    profile,
    newLink,
    showExport,
    handleProfileChange,
    handleAddLink,
    handleRemoveLink,
    handleNewLinkChange,
    toggleExport,
  };
}