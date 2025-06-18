'use client';

import { useState } from "react";

import UserProfile from "./UserProfile";
import UserStats from "./UserStats";
import UserSettings from "./UserSettings";
import { UserAdminInfoProps } from "@/types/types";

function UserAdminInfo({ user }: UserAdminInfoProps) {
    const [currentBio, setCurrentBio] = useState(user.data.user.bio || '');
  
    return (
      <section>
        <div className="flex items-center gap-3">
          <UserProfile user={user} />
          <UserStats followStats={user.data.follow_stats} />
        </div>
        <UserSettings 
          user={user} 
          currentBio={currentBio} 
          onBioUpdate={setCurrentBio} 
        />
      </section>
    );
  }

export default UserAdminInfo;