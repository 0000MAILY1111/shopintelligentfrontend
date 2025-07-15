'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TransactionFilter from "./TransactionFilter"
import { HydrationBoundary } from "@tanstack/react-query"

export default function TransactionList({ dehydratedState }: { dehydratedState: any }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <TransactionFilter />
            </HydrationBoundary>
        </QueryClientProvider>
    )
}
