"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"
import { success } from "zod/v4"


export async function submitOrder(data : unknown){
    const order = OrderSchema.parse (data)
    const url = `${process.env.API_URL}/transactions`
    const req = await fetch (url , {
        method : 'POST',
        headers : {
            'Content-Type': 'application'
        },
        body: JSON.stringify ({...order})
    })
    const json = await req.json ()
    if (!req.ok){
        const errors = ErrorResponseSchema.parse (json) 
        return {
            errors: errors.message.map (issue => issue),
            success: ''
        } 
    }
    const success = SuccessResponseSchema.parse (json)
    revalidateTag('products-by-category')
    ///revalidatePath ('/(store)/[categoryId]', 'page')
    console.log (order)
    return {
        errors : [],
        success: success.message
    }
}