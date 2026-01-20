import React, { useEffect } from 'react'
import Head from 'next/head'
import FindDoctorsView from '@/views/FindDoctors'
import { trackEvent } from '@/lib/ga'

const FindDoctorsPage: React.FC = () => {
  useEffect(() => {
    trackEvent('find_doctors_page_view', {
      section: 'page_load'
    })
  }, [])

  return (
    <>
      <Head>
        <title>Find Doctors - eShaafi</title>
        <meta name="description" content="Book video consultation with the best doctors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FindDoctorsView />
    </>
  )
}

export default FindDoctorsPage
