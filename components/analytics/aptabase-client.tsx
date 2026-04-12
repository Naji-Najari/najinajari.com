"use client";

import { AptabaseProvider } from "@aptabase/react";
import { PageTracker } from "@/components/analytics/page-tracker";

export function AptabaseClient({ children }: { children: React.ReactNode }) {
  const appKey = process.env.NEXT_PUBLIC_APTABASE_APP_KEY;
  if (!appKey) return <>{children}</>;

  return (
    <AptabaseProvider appKey={appKey}>
      <PageTracker />
      {children}
    </AptabaseProvider>
  );
}
