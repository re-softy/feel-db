import React from 'react';
import DashboardLayout from "../DashboardLayout";
import Spinner from '@/components/ui/Spinner';

export default function ProfileLoading() {
  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw]">
        <div className="flex justify-center items-center min-h-[50vh] my-8">
          <Spinner size="lg" text="Loading user profile..." />
        </div>
      </main>
    </DashboardLayout>
  );
} 