// app/providers.tsx
"use client";

import SplashScreen from "@/layouts/SplashScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spin } from "antd";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <>
        <SplashScreen />
        {children}
      </>
    </QueryClientProvider>
  );
}
