import type React from 'react';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col w-full bg-background">
      {children}
    </div>
  );
}
