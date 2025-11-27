import React, { useState, useEffect } from 'react'
import DoctorGrid from '@/components/FindDoctors/DoctorGrid'
import CarePlanSection from '@/components/FindDoctors/CarePlanSection'
import BenefitsSection from '@/components/FindDoctors/BenefitsSection'
import FAQSection from '@/components/FindDoctors/FAQSection'

interface FindDoctorsViewProps {
  doctors: any[]
}

const FindDoctorsView: React.FC<FindDoctorsViewProps> = ({ doctors }) => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for doctors data
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500) // Show skeleton for 1.5 seconds
      return () => clearTimeout(timer)
    }
  }, [doctors])

  return (
    <div>
      <DoctorGrid doctors={doctors} excludeMentalHealth={true} isLoading={isLoading} />
      <CarePlanSection />
      <BenefitsSection />
      <FAQSection />
    </div>
  )
}

export default FindDoctorsView
