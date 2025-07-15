import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import TransactionList from "@/components/transactions/TransactionList";


export default async function SalesPage() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    })

    const today = new Date()
    const formattedDate = format(today, "yyyy-MM-dd")

    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    return (
        <>
            <Heading>Pagina de Ventas </Heading>
            <p className="text-lg"> En esta seccion apareceran las ventas, utiliza el calendario para filtrar por fechas.</p>

            <TransactionList dehydratedState={dehydrate(queryClient)} />

        </>
    )
}