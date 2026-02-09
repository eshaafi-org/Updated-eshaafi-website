import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import FindDoctorsView from '@/views/FindDoctors'
import { trackEvent } from '@/lib/ga'
import { fetchAndSortDoctors, DoctorQueryPresets } from '@/helper/doctorApi'

interface FindDoctorsPageProps {
  doctors: any[]
}

const FindDoctorsPage: React.FC<FindDoctorsPageProps> = ({ doctors }) => {
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
      <FindDoctorsView doctors={doctors} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Pre-fetch doctors at build time/revalidation
    const doctors = await fetchAndSortDoctors(DoctorQueryPresets.allDoctors())
    
    return {
      props: {
        doctors: doctors || [],
      },
      revalidate: 60, // Revalidate every 60 seconds ensures data stays relatively fresh
    }
  } catch (error) {
    console.error('Error pre-fetching doctors:', error)
    return {
      props: {
        doctors: [], // Fallback to client-side fetching if server-side fails
      },
      revalidate: 10,
    }
  }
}

export default FindDoctorsPage
