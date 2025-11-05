import React from 'react'
import Head from 'next/head'
import FindDoctorsView from '@/views/FindDoctors'
import { fetchAndSortDoctors, DoctorQueryPresets } from '@/helper/doctorApi'

const FindDoctorsPage: React.FC<{ doctors: any[] }> = ({ doctors }) => {
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

export default FindDoctorsPage

export async function getStaticProps() {
  const doctors = await fetchAndSortDoctors(DoctorQueryPresets.allDoctors());

  return {
    props: {
      doctors,
    },
    revalidate: 1,
  };
}
