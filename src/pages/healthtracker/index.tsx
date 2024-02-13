import Health from '@/views/HealthTracker/Health'
import Head from 'next/head'
import React from 'react'
export default function HealthTracker() {
    return (
        <>
            <Head>
                <title>Health Tracker</title>
            </Head>
            <main>
                <Health />
            </main>
        </>
    )
}
