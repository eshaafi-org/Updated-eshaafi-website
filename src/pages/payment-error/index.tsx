import Head from 'next/head'
import React, { useEffect } from 'react'
import { trackEvent } from "@/lib/ga";

export default function PaymentError() {
    useEffect(() => {
        if (!sessionStorage.getItem('payment_error_page_view_tracked')) {
            trackEvent('payment_error_page_view_clk', {
                section: 'page_load'
            });
            sessionStorage.setItem('payment_error_page_view_tracked', 'true');
        }
    }, []);

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
