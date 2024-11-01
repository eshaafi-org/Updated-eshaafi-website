"use client";
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function PaymentError() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/payment-error/booking')
        }, 3000)

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className='container'>
            <Head>
                <title>Eshaafi | Payment Error</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            <h3 className='text-center'>
                You are facing some Error in Transaction please contact with Support.
            </h3>
        </div>
    )
}
