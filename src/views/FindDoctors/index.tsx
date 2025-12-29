'use client'
import React, { useState, useEffect } from 'react'
import DoctorGrid from '@/components/FindDoctors/DoctorGrid'
import CarePlanSection from '@/components/FindDoctors/CarePlanSection'
import BenefitsSection from '@/components/FindDoctors/BenefitsSection'
import FAQSection from '@/components/FindDoctors/FAQSection'
import { BASE_URL } from '@/helper/CONST'
import axios from 'axios'
import { fetchAndSortDoctors, DoctorQueryPresets } from '@/helper/doctorApi'

interface FindDoctorsViewProps {
  doctors?: any[]
}

const FindDoctorsView: React.FC<FindDoctorsViewProps> = ({ doctors: initialDoctors = [] }) => {
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
        const doctorsWithAvailability = await Promise.all(
          doctors.map(async (doctor) => {
            try {
              const response = await axios.post(
                `${BASE_URL}/patients/doctor/appointmentSlots`,
                {
                  doctorId: doctor.Id,
                  medium: 'Video',
                }
              )
              return {
                ...doctor,
                availabilitySlots: response.data.response?.Items || [],
              }
            } catch (error) {
              console.error(`Error fetching slots for doctor ${doctor.Id}:`, error)
              return {
                ...doctor,
                availabilitySlots: [],
              }
            }
          })
        )
        setDoctorsWithSlots(doctorsWithAvailability)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchAvailabilitySlots()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [doctors])

  return (
    <div>
      <DoctorGrid doctors={doctorsWithSlots} excludeMentalHealth={true} isLoading={isLoading} />
      <CarePlanSection />
      <BenefitsSection />
      <FAQSection />
    </div>
  )
}

export default FindDoctorsView
