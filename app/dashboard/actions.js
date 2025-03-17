"use server";

import { revalidateTag } from "next/cache";

export const sendCreateTransactionRequest = async (values) => {
    try {

        const response = await fetch(`${process.env.DATABASE_URL}/movements/create`, {
            headers: { "Content-Type": "application/json" }, 
            method: "POST",
            body: JSON.stringify(values)
        })

        if(!response.ok){
            throw new Error(`Request failed with status: ${response.status}`)
        }

        const createdTransaction = await response.json();
        revalidateTag("total")
        revalidateTag("transactions")
        return createdTransaction

    } catch (e) {
        console.error("Error in sendTransactionRequest: ", e)
    }
}

export const sendChangeTotalRequest = async (values) => {
    try {
        const response = await fetch(`${process.env.DATABASE_URL}/total/modify/${values.id}`, {
            method: "PUT", 
            body: JSON.stringify(values), 
            headers: { "Content-Type": "application/json" }
        })

        if(!response.ok){
            throw new Error(`Request failed with status: ${response.status}`)
        }

        const modifiedTotal = await response.json();

        revalidateTag("total")
        return modifiedTotal

    } catch (e){
        console.error("Error in sendChangeTotalrequest: ", e)
    }
}