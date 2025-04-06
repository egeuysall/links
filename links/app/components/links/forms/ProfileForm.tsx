"use client";

import React from "react";
import { UserProfile } from "@/lib/LinkUtils";

interface ProfileFormProps {
  profile: UserProfile;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onChange }) => {
  return (
    <div className="text-[#593116]">
      <h4 className="text-2xl font-bold mb-3 flex">Profile Details</h4>
      <hr className="my-4 border border-[#EDE0D4]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">
            Display name
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-xl font-bold mb-1 mt-2">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            placeholder="Doe"
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xl font-bold mb-1 mt-2">Bio</label>
          <textarea
            name="bio"
            placeholder="John Doe – Web Developer. More coming soon!"
            value={profile.bio}
            onChange={onChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none min-h-[105px] text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xl font-bold mb-1 mt-2">
            Avatar URL
          </label>
          <input
            type="text"
            name="avatar"
            value={profile.avatar || ""}
            onChange={onChange}
            placeholder="https://example.com/avatar.jpg"
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
          />
        </div>
      </div>
    </div>
  );
};