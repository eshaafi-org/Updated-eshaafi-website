import React, { useState, useMemo } from 'react'
import styles from '@/styles/findDoctors.module.scss'
import DoctorCard from './DoctorCard'

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
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors }) => {
  const [activeSpecialty, setActiveSpecialty] = useState('All Doctor')

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
    const exclude = [
      'clinical psychologist',
      'counselor',
      
    ]
    mappedDoctors.forEach((d) => {
      const s = String(d.specialty || '').trim()
      if (!s) return
      const sLower = s.toLowerCase()
      // skip any specialty that matches any excluded keyword (case-insensitive, partial match)
      if (exclude.some((ex) => sLower.includes(ex))) return
      set.add(s)
    })
    return ['All Doctor', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [mappedDoctors])
console.log("specialties", specialties);
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
          {mappedDoctors
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
