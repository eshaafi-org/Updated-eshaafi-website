import React from 'react'
import Head from 'next/head'
import FindDoctorsView from '@/views/FindDoctors'
import { BASE_URL } from '@/helper/CONST'

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
  let response = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "categroy",
      
    }),
  });

  const docData = await response.json();
  return {
    props: {
      doctors: docData.response.Items.sort((a: any, b: any) => {
        if (a.isOnline && !b.isOnline) {
          return -1;
        } else if (!a.isOnline && b.isOnline) {
          return 1;
        } else {
          return 0;
        }
      }),
    },
    revalidate: 1,
  };
}
