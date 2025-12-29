import React from 'react'
import Head from 'next/head'
import FindDoctorsView from '@/views/FindDoctors'

const FindDoctorsPage: React.FC = () => {
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
