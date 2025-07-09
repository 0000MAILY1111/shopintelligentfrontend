import { formatCurrency } from '@/src/utils';
import React from 'react';  

type AmountProps = {
    label: string 
    amount: number;

}
export default function Amount ({label, amount}: AmountProps) {
    return (
        <div className="flex justify-beetween">

            <dt className="font-bold">
                <span className="text-gray-500">{label}</span>
            </dt>
            <dd className="text-gray-900">
                 <span className="text-gray-500">{formatCurrency(amount)}</span>
            </dd>
        </div>
    )
}