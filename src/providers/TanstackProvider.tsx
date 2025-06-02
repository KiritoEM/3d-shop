"use client"

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type TanstackProviderProps = {
    children: ReactNode;
}

export default function TanstackProvider({
    children
}: TanstackProviderProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}