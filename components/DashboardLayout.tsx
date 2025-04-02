import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <header className="bg-[#252526] border-b border-[#2D2D2D]">
        <div className="mx-auto max-w-[1920px] py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white text-center">
            Crankshaft Brushing Monitor
          </h1>
        </div>
      </header>
      <main className="p-4">
        <div className="mx-auto max-w-[1920px]">{children}</div>
      </main>
    </div>
  );
}
