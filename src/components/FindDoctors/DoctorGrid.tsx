import React, { useState, useMemo, useEffect } from 'react'
import styles from '@/styles/findDoctors.module.scss'
import DoctorCard from './DoctorCard'
import { DoctorCardSkeleton } from '@/components/SkeletonLoader'
import { useRouter } from 'next/router'

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  rating: number
  consultationFee: number
  available: boolean
  image: string
}

interface DoctorGridProps {
  doctors: any[]
  excludeMentalHealth?: boolean
  onlyMentalHealth?: boolean
  isLoading?: boolean
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors, excludeMentalHealth = false, onlyMentalHealth = false, isLoading = false }) => {
  const [activeSpecialty, setActiveSpecialty] = useState('All Doctor')
  const router = useRouter()

  // set initial active specialty from query param (if provided)
  useEffect(() => {
    const q = router.query?.specialty as string | undefined
    if (q) {
      try {
        const decoded = decodeURIComponent(q).replace(/\+/g, ' ')
        setActiveSpecialty(decoded)
      } catch (e) {
        setActiveSpecialty(q)
      }
    }
  }, [router.query?.specialty])

  const mappedDoctors: Doctor[] = doctors.map((doc: any) => ({
    id: doc.Id,
    name: `${doc.personal_info.title}. ${doc.personal_info.firstName} ${doc.personal_info.lastName}`,
    specialty: doc.specialization,
    experience: `${doc.yearsOfExperience} year`,
    rating: Number(doc.rating?.averageRating) || 0,
    consultationFee: doc.videoCallCharges,
    available: doc.isOnline,
    image: doc.personal_info.profileUrl
  }))

  // derive specialties from backend doctors list so filters reflect actual data
  const specialties = useMemo(() => {
    const set = new Set<string>()
    const mentalHealthSpecialties = [
      'clinical psychologist',
      'counselor',
      'FamilyPhysician'
    ]
    mappedDoctors.forEach((d) => {
      const s = String(d.specialty || '').trim()
      if (!s) return
      const sLower = s.toLowerCase()
      const isMentalHealth = mentalHealthSpecialties.some((specialty) => sLower.includes(specialty.toLowerCase()))

      // If onlyMentalHealth is true, only include mental health specialties
      if (onlyMentalHealth && !isMentalHealth) return

      // If excludeMentalHealth is true, exclude mental health specialties
      if (excludeMentalHealth && isMentalHealth) return

      set.add(s)
    })
    return ['All Doctor', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [mappedDoctors, excludeMentalHealth, onlyMentalHealth])

  return (
    <section className={styles.doctorsSection}>
      <div className={styles.doctorsWrapper}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle} style={{ fontFamily: "'Inter', sans-serif" }}>
            Book <span className={styles.highlightBlue}>video consultation</span> with the best doctors
          </h1>
        </div>

        <div className={styles.specialtyFilters}>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              className={`${styles.filterButton} ${activeSpecialty === specialty ? styles.filterActive : ''}`}
              onClick={() => setActiveSpecialty(specialty)}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {specialty}
            </button>
          ))}
        </div>

        <div className={styles.doctorsGrid}>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
            : mappedDoctors
              .filter((doc) => {
                // show all when 'All Doctor' selected, otherwise match specialty (case-insensitive, partial match)
                if (activeSpecialty === 'All Doctor') return true
                return (
                  String(doc.specialty || '')
                    .toLowerCase()
                    .includes(activeSpecialty.toLowerCase())
                )
              })
              .map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
        </div>
      </div>
    </section>
  )
}

export default DoctorGrid
