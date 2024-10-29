import Head from 'next/head'
import React from 'react'

export default function PaymentError() {
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
