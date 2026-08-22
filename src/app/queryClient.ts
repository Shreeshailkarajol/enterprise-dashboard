import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 100,
            retry: 2,
            refetchOnWindowFocus: false
        }
    }
})