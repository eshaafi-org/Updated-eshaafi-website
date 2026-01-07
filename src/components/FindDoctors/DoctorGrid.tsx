import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/findDoctors.module.scss'
import DoctorCard from './DoctorCard'
import { DoctorCardSkeleton } from '@/components/SkeletonLoader'
import { useRouter } from 'next/router'
import { trackEvent } from '@/lib/ga'

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  rating: number
  consultationFee: number
  available: boolean
  availableTime?: string
  image: string
}

interface DoctorGridProps {
  doctors: any[]
  excludeMentalHealth?: boolean
  onlyMentalHealth?: boolean
  isLoading?: boolean
  activeCategory?: string
  disableNavigation?: boolean
  baseRoute?: string
  onCategoryChange?: (category: string | null) => void
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors, excludeMentalHealth = false, onlyMentalHealth = false, isLoading = false, activeCategory, disableNavigation = false, baseRoute = '/find-doctors', onCategoryChange }) => {
  const [activeSpecialty, setActiveSpecialty] = useState('All Doctor')
  const [lastClickedSpecialty, setLastClickedSpecialty] = useState<string | null>(null)
  const router = useRouter()

  // set initial active specialty from query param or activeCategory prop
  useEffect(() => {
    // First check if activeCategory prop is provided (from dynamic route)
    if (activeCategory) {
      // Map URL slug back to display name
      const slugToSpecialty: { [key: string]: string } = {
        'cardiologist': 'Cardiologist',
        'pediatrician': 'Child Specialist',
        'dermatologist': 'Dermatologist',
        'general-physician': 'General Physician',
        'general-physician-mo-peads': 'General Physician (MO PEADS)',
        'gynaecologist': 'Gynaecologist',
        'psychiatrist': 'Psychiatrist',
        'psychologist': 'Psychologist',
        'clinical-psychologist': 'Clinical Psychologist',
        'mental-health': 'Counselor',
        'counselor': 'Counselor',
        'therapist': 'Counselor',
        'dentist': 'Dentist',
        'physiotherapist': 'Physiotherapist',
        'cons-physiotherapist': 'Cons. Physiotherapist',
        'consultant-physician': 'Consultant Physician',
        'family-physician': 'Family Physician',
        'gastroenterologist': 'Gastroenterologist',
        'medical-specialist': 'Medical Specialist',
        'nephrologist': 'Nephrologist (R)',
        'pulmonologist': 'Pulmonologist',
        'speech-therapist': 'Speech Therapist',
      }
      const displayName = slugToSpecialty[activeCategory] || activeCategory
      
      // Handle multiple active categories (e.g., psychologist includes clinical psychologist)
      if (activeCategory === 'psychologist') {
        // Highlight Clinical Psychologist button for psychologist category
        setActiveSpecialty('Psychologist');
        setLastClickedSpecialty('Clinical Psychologist');
      } else if (activeCategory === 'counselor') {
        // Highlight Counselor button for counselor category
        setActiveSpecialty('Counselor');
        setLastClickedSpecialty('Counselor');
      } else {
        setActiveSpecialty(displayName);
        setLastClickedSpecialty(displayName);
      }
    } else {
      // Fallback to query param
      const q = router.query?.specialty as string | undefined
      if (q) {
        try {
          const decoded = decodeURIComponent(q).replace(/\+/g, ' ')
          setActiveSpecialty(decoded)
        } catch (e) {
          setActiveSpecialty(q)
        }
      }
      setLastClickedSpecialty(null);
    }
  }, [router.query?.specialty, activeCategory])

  const mappedDoctors: Doctor[] = doctors.map((doc: any) => {
    // Extract real availability time from backend slots
    let availableTime: string | undefined;
    
    const slots = doc.availabilitySlots || [];
    
    // Helper function to convert 24-hour time to 12-hour format with AM/PM
    const convertTo12Hour = (time24: string) => {
      if (!time24) return time24;
      
      const [hours, minutes] = time24.split(':');
      let hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      
      if (hour === 0) {
        hour = 12;
      } else if (hour > 12) {
        hour = hour - 12;
      }
      
      return `${hour}:${minutes} ${period}`;
    };
    
    if (slots.length > 0) {
      // Helper function to get first time from slot array (using 'start' field)
      const getFirstTime = (timeSlots: any[]) => {
        if (timeSlots && timeSlots.length > 0) {
          return timeSlots[0].start;
        }
        return null;
      };
      
      // Helper function to get last time from slot array (using 'start' field)
      const getLastTime = (timeSlots: any[]) => {
        if (timeSlots && timeSlots.length > 0) {
          return timeSlots[timeSlots.length - 1].start;
        }
        return null;
      };
      
      // Helper function to check if a slot date has any available times
      const hasAvailableSlots = (appointmentSlots: any) => {
        return (
          (appointmentSlots?.morning_slots?.length > 0) ||
          (appointmentSlots?.afternoon_slots?.length > 0) ||
          (appointmentSlots?.evening_slots?.length > 0)
        );
      };
      
      // Get today's date for comparison
      const today = new Date().toISOString().split('T')[0];
      
      // Find the first slot that has available times
      let selectedSlot = null;
      let selectedTime = null;
      let showBookedTill = false;
      
      for (const slot of slots) {
        const appointmentSlots = slot.appointment_slots;
        
        // Skip slots with no available times
        if (!hasAvailableSlots(appointmentSlots)) {
          // console.log(`Skipping ${slot.slot_date} - no available slots`);
          continue;
        }
        
        // console.log(`Checking ${slot.slot_date}:`, appointmentSlots);
        
        if (doc.isOnline === true) {
          // For online doctors, first try to find today's slots
          if (slot.slot_date === today) {
            const lastTime = 
              getLastTime(appointmentSlots?.evening_slots) ||
              getLastTime(appointmentSlots?.afternoon_slots) ||
              getLastTime(appointmentSlots?.morning_slots);
            
            if (lastTime) {
              selectedSlot = slot;
              selectedTime = convertTo12Hour(lastTime);
              showBookedTill = false;
              // console.log(`Selected for ${doc.personal_info?.firstName}: ${slot.slot_date}, ${selectedTime}`);
              break;
            }
          } else if (!selectedSlot) {
            // If no today slots found, get first available future slot for "Booked till"
            const firstTime = 
              getFirstTime(appointmentSlots?.morning_slots) ||
              getFirstTime(appointmentSlots?.afternoon_slots) ||
              getFirstTime(appointmentSlots?.evening_slots);
            
            if (firstTime) {
              selectedSlot = slot;
              selectedTime = convertTo12Hour(firstTime);
              showBookedTill = true;
              // console.log(`Booked till for ${doc.personal_info?.firstName}: ${slot.slot_date}, ${selectedTime}`);
              // Don't break - keep looking for today's slots
            }
          }
        } else {
          // For offline/undefined doctors, find first available slot (any date)
          const firstTime = 
            getFirstTime(appointmentSlots?.morning_slots) ||
            getFirstTime(appointmentSlots?.afternoon_slots) ||
            getFirstTime(appointmentSlots?.evening_slots);
          
          if (firstTime) {
            selectedSlot = slot;
            selectedTime = convertTo12Hour(firstTime);
            // console.log(`Selected for ${doc.personal_info?.firstName}: ${slot.slot_date}, ${selectedTime}`);
            break;
          }
        }
      }
      
      if (selectedSlot && selectedTime) {
        if (doc.isOnline === true) {
          if (showBookedTill) {
            // Show "Available at" with date for online doctors with no today slots
            const formattedDate = new Date(selectedSlot.slot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            availableTime = `Available at ${formattedDate}, ${selectedTime}`;
          } else {
            // Show "Available till" time only for today's slots
            availableTime = selectedTime;
          }
        } else {
          // For offline doctors, show date and time
          const formattedDate = new Date(selectedSlot.slot_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          availableTime = `${formattedDate}, ${selectedTime}`;
        }
      }
    }
    
   

    return {
      id: doc.Id,
      name: `${doc.personal_info.title}. ${doc.personal_info.firstName} ${doc.personal_info.lastName}`,
      specialty: doc.specialization,
      experience: `${doc.yearsOfExperience} year`,
      rating: Number(doc.rating?.averageRating) || 0,
      consultationFee: doc.videoCallCharges,
      available: doc.isOnline,
      availableTime,
      image: doc.personal_info.profileUrl
    };
  })

  // derive specialties from backend doctors list so filters reflect actual data
  const specialties = useMemo(() => {
    const set = new Set<string>()
    const mentalHealthSpecialties = [
      'clinical psychologist',
      'counselor'
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
          {specialties.map((specialty) => {
            // Map specialty names to URL-friendly slugs
            const specialtyToSlug: { [key: string]: string } = {
              'All Doctor': baseRoute,
              'Cardiologist': `${baseRoute}/cardiologist`,
              'Child Specialist': `${baseRoute}/pediatrician`,
              'Cons. Physiotherapist': `${baseRoute}/cons-physiotherapist`,
              'Consultant Physician': `${baseRoute}/consultant-physician`,
              'Dentist': `${baseRoute}/dentist`,
              'Dermatologist': `${baseRoute}/dermatologist`,
              'Family Physician': `${baseRoute}/family-physician`,
              'Gastroenterologist': `${baseRoute}/gastroenterologist`,
              'General Physician': `${baseRoute}/general-physician`,
              'General Physician (MO PEADS)': `${baseRoute}/general-physician-mo-peads`,
              'Gynaecologist': `${baseRoute}/gynecologist`,
              'Medical Specialist': `${baseRoute}/medical-specialist`,
              'Nephrologist (R)': `${baseRoute}/nephrologist`,
              'Physiotherapist': `${baseRoute}/physiotherapist`,
              'Pulmonologist': `${baseRoute}/pulmonologist`,
              'Speech Therapist': `${baseRoute}/speech-therapist`,
              'Psychiatrist': `${baseRoute}/psychiatrist`,
              'Psychologist': `${baseRoute}/psychologist`,
              'Clinical Psychologist': `${baseRoute}/psychologist`,
              'Counselor': `${baseRoute}/counselor`,
            }
            
            const href = specialtyToSlug[specialty] || `${baseRoute}/${specialty.toLowerCase().replace(/\s+/g, '-')}`
            
            // Determine if this button should be highlighted
            // Only highlight the exact clicked specialty, unless it's a special mapping
            let isActive = false
            
            if (lastClickedSpecialty) {
              // Exact match with last clicked
              isActive = lastClickedSpecialty === specialty
              
              // Special cases for multiple specialties mapping to same category
              // Physiotherapist and Cons. Physiotherapist - only highlight exact one clicked
              // General Physician and General Physician (MO PEADS) - only highlight exact one clicked
              // Psychologist and Clinical Psychologist - highlight both when in psychologist category
              if (activeCategory === 'psychologist' && (lastClickedSpecialty === 'Clinical Psychologist' || lastClickedSpecialty === 'Psychologist')) {
                isActive = specialty === 'Clinical Psychologist' || specialty === 'Psychologist'
              }
            } else {
              // Fallback: use activeSpecialty only for exact match
              isActive = activeSpecialty === specialty
            }
            
            // If navigation is disabled (mind-wellness page), use button with onClick
            if (disableNavigation) {
              return (
                <button
                  key={specialty}
                  className={`${styles.filterButton} ${isActive ? styles.filterActive : ''}`}
                  onClick={() => {
                    setActiveSpecialty(specialty);
                    setLastClickedSpecialty(specialty);
                    if (onCategoryChange) {
                      // For "All Doctor", pass null to navigate to /mind-wellness
                      if (specialty === 'All Doctor') {
                        onCategoryChange(null);
                      } else {
                        // Extract category slug from specialty name
                        const specialtyToSlug: { [key: string]: string } = {
                          'Psychiatrist': 'psychiatrist',
                          'Psychologist': 'psychologist',
                          'Clinical Psychologist': 'psychologist',
                          'Counselor': 'counselor',
                        }
                        const slug = specialtyToSlug[specialty] || specialty.toLowerCase().replace(/\s+/g, '-');
                        onCategoryChange(slug);
                      }
                    }
                    trackEvent('select_content', {
                      section: 'filters',
                      action: 'specialty_filter',
                      label: specialty,
                      content_type: 'doctor_specialty'
                    });
                  }}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {specialty}
                </button>
              )
            }
            
            // Otherwise use Link for navigation
            return (
              <Link 
                key={specialty} 
                href={href}
                style={{ textDecoration: 'none' }}
              >
                <button
                  className={`${styles.filterButton} ${isActive ? styles.filterActive : ''}`}
                  onClick={() => {
                    trackEvent('select_content', {
                      section: 'filters',
                      action: 'specialty_filter',
                      label: specialty,
                      content_type: 'doctor_specialty'
                    });
                  }}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {specialty}
                </button>
              </Link>
            )
          })}
        </div>

        <div className={styles.doctorsGrid}>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
            : mappedDoctors
              .filter((doc) => {
                // Normalize specialty strings
                const mentalHealthSpecialties = ['psychiatrist', 'psychologist', 'clinical psychologist', 'counselor', 'counsellor', 'therapist', 'mentor', 'mental health']
                const docSpecialtyLower = String(doc.specialty || '').toLowerCase().trim()
                
                // Check if doctor has any mental health specialty
                const isMentalHealth = mentalHealthSpecialties.some((specialty) => 
                  docSpecialtyLower.includes(specialty)
                )

                // If onlyMentalHealth is true and 'All Doctor' is selected, show all mental health doctors
                if (onlyMentalHealth && activeSpecialty === 'All Doctor') {
                  return isMentalHealth
                }

                // If excludeMentalHealth is true and 'All Doctor' is selected, exclude mental health doctors
                if (excludeMentalHealth && activeSpecialty === 'All Doctor') {
                  return !isMentalHealth
                }

                // show all when 'All Doctor' selected, otherwise match specialty (case-insensitive, partial match)
                if (activeSpecialty === 'All Doctor') return true
                
                // For specific specialties, do an exact match (case-insensitive)
                // This ensures only doctors in the selected category are shown
                const activeSpecialtyLower = activeSpecialty.toLowerCase().trim()
                return docSpecialtyLower.includes(activeSpecialtyLower)
              })
              .sort((a, b) => {
                // Priority 1: Online doctors with "Available till" (today's slots) - no date in time string
                const aIsAvailableTill = a.available && a.availableTime && !a.availableTime.includes(',')
                const bIsAvailableTill = b.available && b.availableTime && !b.availableTime.includes(',')
                
                if (aIsAvailableTill && !bIsAvailableTill) return -1
                if (!aIsAvailableTill && bIsAvailableTill) return 1
                
                // Priority 2: Online doctors with "Available at" (future dates) - contains "Available at"
                const aIsOnlineWithDate = a.available && a.availableTime && a.availableTime.includes('Available at')
                const bIsOnlineWithDate = b.available && b.availableTime && b.availableTime.includes('Available at')
                
                if (aIsOnlineWithDate && !bIsOnlineWithDate && !bIsAvailableTill) return -1
                if (!aIsOnlineWithDate && bIsOnlineWithDate && !aIsAvailableTill) return 1
                
                // Priority 3: Offline doctors with "Available at" - has time but not online
                const aIsOfflineWithDate = !a.available && a.availableTime
                const bIsOfflineWithDate = !b.available && b.availableTime
                
                if (aIsOfflineWithDate && !bIsOfflineWithDate) return -1
                if (!aIsOfflineWithDate && bIsOfflineWithDate) return 1
                
                return 0
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
