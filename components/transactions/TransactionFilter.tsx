"use client"

import { getSalesByDate } from "@/src/api"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import TransactionSummary from "./TransactionSummary"
import { Transaction } from "@/src/schemas"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {

    const [date, setDate] = useState<Value>(new Date())

    const getDateForFormatting = (dateValue: Value): Date => {
        if (Array.isArray(dateValue)) {
            return dateValue[0] || new Date()
        }
        return dateValue || new Date()
    }

    const formattedDate = format(getDateForFormatting(date), "yyyy-MM-dd")

    const { data, isLoading } = useQuery<Transaction[]>({
        queryKey: ['sales', formattedDate],
        queryFn: async () => {
            const result = await getSalesByDate(formattedDate)
            return Array.isArray(result) ? result : [result]
        }
    })

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
            <div>
                <Calendar
                    value={date}
                    onChange={setDate} />
            </div>
            <div>
                {isLoading && 'Cargando...'}
                {data?.length ? data.map((transaction: Transaction) => (
                    <TransactionSummary
                        key={transaction.id}
                        transaction={transaction}
                    />
                )) : (
                    <p className="text-lg text-center"> No hay ventas en esta fecha</p>
                )}
            </div>
        </div>
    )
}