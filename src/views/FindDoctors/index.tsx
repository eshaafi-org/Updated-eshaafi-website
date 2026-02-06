'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DoctorGrid from '@/components/FindDoctors/DoctorGrid'
import CarePlanSection from '@/components/FindDoctors/CarePlanSection'
import BenefitsSection from '@/components/FindDoctors/BenefitsSection'
import FAQSection from '@/components/FindDoctors/FAQSection'
import { BASE_URL } from '@/helper/CONST'
import axios from 'axios'
import { fetchAndSortDoctors, DoctorQueryPresets } from '@/helper/doctorApi'

interface FindDoctorsViewProps {
  doctors?: any[]
  category?: string
}

const FindDoctorsView: React.FC<FindDoctorsViewProps> = ({ doctors: initialDoctors = [], category }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [doctors, setDoctors] = useState<any[]>(initialDoctors)

  // Fetch doctors if not provided
  useEffect(() => {
    if (doctors.length === 0) {
      const fetchDoctors = async () => {
        try {
          const fetchedDoctors = await fetchAndSortDoctors(DoctorQueryPresets.allDoctors());
          setDoctors(fetchedDoctors);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]);
          setIsLoading(false);
        }
      };
      fetchDoctors();
    } else {
      setIsLoading(false);
    }
  }, [doctors.length]);

  // Handle hash scroll navigation after page loads
  useEffect(() => {
    if (!isLoading && router.isReady) {
      const hash = window.location.hash
      if (hash) {
        const elementId = hash.substring(1)
        // Wait longer to ensure all layout is complete and no layout shifts occur
        setTimeout(() => {
          const element = document.getElementById(elementId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 800)
      }
    }
  }, [isLoading, router.isReady])

  return (
    <div>
      <DoctorGrid doctors={doctors} excludeMentalHealth={true} isLoading={isLoading} activeCategory={category} />
      <CarePlanSection />
      <BenefitsSection />
      <FAQSection />
    </div>
  )
}

export default FindDoctorsView
