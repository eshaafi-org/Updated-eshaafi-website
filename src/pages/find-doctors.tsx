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
  try {
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

    if (!response.ok) {
      console.error(`API responded with status ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }

    const docData = await response.json();
    const items = docData?.response?.Items || [];

    const sortedDoctors = items.sort((a: any, b: any) => {
      if (a.isOnline && !b.isOnline) {
        return -1;
      } else if (!a.isOnline && b.isOnline) {
        return 1;
      } else {
        return 0;
      }
    });

    return {
      props: {
        doctors: sortedDoctors,
      },
      revalidate: 60, // increased from 1 to reduce API calls on first deploy
    };
  } catch (error) {
    console.error("Error fetching doctors in getStaticProps:", error);
    // return empty doctors array so page renders without 500 error
    return {
      props: {
        doctors: [],
      },
      revalidate: 5, // short revalidate so it retries soon
    };
  }
}
