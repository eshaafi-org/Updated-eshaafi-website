"use client";
import Head from 'next/head'
import React, { useEffect } from 'react'

export default function PaymentError() {
      useEffect(() => {
        // Check if the page has already been reloaded during this session
        if (!sessionStorage.getItem('hasReloaded')) {
          // Mark that the page has reloaded
          sessionStorage.setItem('hasReloaded', 'true');
          // Reload the page
          window.location.reload();
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
