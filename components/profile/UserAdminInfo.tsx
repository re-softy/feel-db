'use client';

import { useState } from "react";

import UserProfile from "./UserProfile";
import UserSettings from "./UserSettings";
import { UserAdminInfoProps } from "@/types/types";

function UserAdminInfo({ user }: UserAdminInfoProps) {
  const [currentBio, setCurrentBio] = useState(user.data.user.bio || '');

  return (
    <section className="my-4">
      <UserProfile user={user} />
      <UserSettings 
          user={user} 
          currentBio={currentBio} 
          onBioUpdate={setCurrentBio} 
        />
    </section>
  );
}

export default UserAdminInfo;