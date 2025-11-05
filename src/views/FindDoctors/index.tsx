import React from 'react'
import DoctorGrid from '@/components/FindDoctors/DoctorGrid'
import CarePlanSection from '@/components/FindDoctors/CarePlanSection'
import BenefitsSection from '@/components/FindDoctors/BenefitsSection'
import FAQSection from '@/components/FindDoctors/FAQSection'

interface FindDoctorsViewProps {
  doctors: any[]
}

const FindDoctorsView: React.FC<FindDoctorsViewProps> = ({ doctors }) => {
  return (
    <div>
      <DoctorGrid doctors={doctors} />
      <CarePlanSection />
      <BenefitsSection />
      <FAQSection />
    </div>
  )
}

export default FindDoctorsView
