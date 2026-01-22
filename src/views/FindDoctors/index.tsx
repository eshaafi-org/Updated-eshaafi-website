'use client'
import React, { useState, useEffect } from 'react'
import DoctorGrid from '@/components/FindDoctors/DoctorGrid'
import CarePlanSection from '@/components/FindDoctors/CarePlanSection'
import BenefitsSection from '@/components/FindDoctors/BenefitsSection'
import FAQSection from '@/components/FindDoctors/FAQSection'
import { BASE_URL } from '@/helper/CONST'
import { fetchAndSortDoctors, DoctorQueryPresets, fetchDoctorsWithSlots } from '@/helper/doctorApi'

interface FindDoctorsViewProps {
  doctors?: any[]
  category?: string
}

const FindDoctorsView: React.FC<FindDoctorsViewProps> = ({ doctors: initialDoctors = [], category }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [doctorsWithSlots, setDoctorsWithSlots] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>(initialDoctors)

  // Fetch doctors if not provided
  useEffect(() => {
    if (doctors.length === 0) {
      const fetchDoctors = async () => {
        try {
          const fetchedDoctors = await fetchAndSortDoctors(DoctorQueryPresets.allDoctors());
          setDoctors(fetchedDoctors);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]);
        }
      };
      fetchDoctors();
    }
  }, [doctors.length]);

  // Fetch availability slots for all doctors
  useEffect(() => {
    const fetchAvailabilitySlots = async () => {
      if (doctors && doctors.length > 0) {
        const doctorsWithAvailability = await fetchDoctorsWithSlots(doctors, 5); // Limit to 5 concurrent requests
        setDoctorsWithSlots(doctorsWithAvailability)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }

    fetchAvailabilitySlots()
  }, [doctors])

  return (
    <div>
      <DoctorGrid doctors={doctorsWithSlots} excludeMentalHealth={true} isLoading={isLoading} activeCategory={category} />
      <CarePlanSection />
      <BenefitsSection />
      <FAQSection />
    </div>
  )
}

export default FindDoctorsView
