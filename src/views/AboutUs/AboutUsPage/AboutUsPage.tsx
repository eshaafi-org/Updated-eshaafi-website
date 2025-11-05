import React from 'react'
import Head from 'next/head'
import HeroSection from './HeroSection'
import AboutJourneySection from './AboutJourneySection'
import AboutValuesSection from './AboutValuesSection'
import CoreValuesSection from './CoreValuesSection'
import FounderStorySection from './FounderStorySection'
import LeadershipTeamSection from './LeadershipTeamSection'
import CTASection from './CTASection'

const AboutUsPage = () => {
  return (
    <>
      <Head>
        <title>eShaafi | About Us</title>
        <meta
          name="description"
          content="Learn about eShaafi's mission to revolutionize healthcare accessibility through telemedicine"
        />
      </Head>
      <main>
        {/* Hero Section with Vision & Mission Cards */}
        <HeroSection />

        {/* Our Journey Section */}
        <AboutJourneySection />

        {/* Core Values Section (CARE) */}
        <CoreValuesSection />

        {/* Founder's Story Section */}
        <FounderStorySection />

        {/* Leadership Team Section */}
        <LeadershipTeamSection />

        {/* Call to Action Section */}
        <CTASection />
      </main>
    </>
  )
}

export default AboutUsPage
