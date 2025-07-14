import { formatCurrency } from '@/src/utils';
import React from 'react';  

type AmountProps = {
    label: string 
    amount: number;
    discount?: boolean; 

}
export default function Amount ({label, amount, discount}: AmountProps) {
    return (
        <div className= {`${discount && 'bg-green-400 text-green-800'} flex justify-between p-1`}>

            <dt className="font-bold">
                <span className="text-gray-500">{label}</span>
            </dt>
            <dd className="text-gray-900">
                 <span className="text-gray-500">{discount && '-' }{formatCurrency(amount)}</span>
            </dd>
        </div>
    )
}