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
  eventPrefix?: string; // Optional: defaults to 'fd_', use 'mw_' for mind-wellness
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors, excludeMentalHealth = false, onlyMentalHealth = false, isLoading = false, activeCategory, disableNavigation = false, baseRoute = '/find-doctors', onCategoryChange, eventPrefix = 'fd_' }) => {
  const [activeSpecialty, setActiveSpecialty] = useState(onlyMentalHealth ? 'All Therapists' : 'All Doctor')
  const [lastClickedSpecialty, setLastClickedSpecialty] = useState<string | null>(null)
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(6) // Start with 6 doctors for specific categories
  const router = useRouter()

  // Reset visible doctors count when specialty changes
  useEffect(() => {
    setVisibleDoctorsCount(6)
  }, [activeSpecialty])

  // Handle router query params and activeCategory changes
  useEffect(() => {
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
    // console.log('[DoctorGrid] Generating specialties from backend data...')
    // console.log('[DoctorGrid] Total doctors:', mappedDoctors.length)
    // console.log('[DoctorGrid] onlyMentalHealth:', onlyMentalHealth, 'excludeMentalHealth:', excludeMentalHealth)
    
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
    
    const finalSpecialties = [onlyMentalHealth ? 'All Therapists' : 'All Doctor', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
    // console.log('[DoctorGrid] Final specialties:', finalSpecialties)
    
    return finalSpecialties
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
            // Generate URL slug dynamically from specialty name
            const generateSlug = (name: string) => {
              if (name === 'All Doctor' || name === 'All Therapists') return baseRoute;
              return `${baseRoute}/${name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`;
            };
            
            const href = generateSlug(specialty);
            
            // Determine if this button should be highlighted
            let isActive = false;
            
            if (lastClickedSpecialty) {
              isActive = lastClickedSpecialty === specialty;
            } else if (activeCategory && specialty !== 'All Doctor' && specialty !== 'All Therapists') {
              // Check if current URL slug matches this specialty
              const currentSlug = specialty.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
              isActive = activeCategory === currentSlug;
            } else {
              isActive = activeSpecialty === specialty;
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
                      if (specialty === 'All Doctor' || specialty === 'All Therapists') {
                        onCategoryChange(null);
                      } else {
                        const slug = specialty.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
                        onCategoryChange(slug);
                      }
                    }
                  }}
                >
                  {specialty}
                </button>
              );
            }
            
            // Default: use Link for navigation
            return (
              <Link key={specialty} href={href} passHref>
                <button
                  className={`${styles.filterButton} ${isActive ? styles.filterActive : ''}`}
                  onClick={() => {
                    setActiveSpecialty(specialty);
                    setLastClickedSpecialty(specialty);
                  }}
                >
                  {specialty}
                </button>
              </Link>
            );
          })}
        </div>

        <div className={styles.doctorsGrid}>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
              <DoctorCardSkeleton key={index} />
            ))
            : (() => {
                const filtered = mappedDoctors.filter((doc) => {
                  const mentalHealthSpecialties = ['psychiatrist', 'psychologist', 'clinical psychologist', 'counselor', 'counsellor', 'therapist', 'mentor', 'mental health']
                  const docSpecialtyLower = String(doc.specialty || '').toLowerCase().trim()
                  
                  // Check if doctor has any mental health specialty
                  const isMentalHealth = mentalHealthSpecialties.some((specialty) => 
                    docSpecialtyLower.includes(specialty)
                  )

                  // If onlyMentalHealth is true and 'All Therapists' is selected, show all mental health doctors
                  if (onlyMentalHealth && (activeSpecialty === 'All Therapists' || activeSpecialty === 'All Doctor')) {
                    return isMentalHealth
                  }

                  // If excludeMentalHealth is true and 'All Doctor' is selected, exclude mental health doctors
                  if (excludeMentalHealth && (activeSpecialty === 'All Doctor' || activeSpecialty === 'All Therapists')) {
                    return !isMentalHealth
                  }

                  // Show all when 'All Doctor' or 'All Therapists' selected
                  if (activeSpecialty === 'All Doctor' || activeSpecialty === 'All Therapists') {
                    return true
                  }
                  
                  // For specific specialties, do exact match (case-insensitive)
                  return doc.specialty.trim() === activeSpecialty.trim()
                })
                
                // Apply pagination to all categories
                const shouldLimitDoctors = true
                const doctorsToShow = shouldLimitDoctors ? filtered.slice(0, visibleDoctorsCount) : filtered
                
                return doctorsToShow.sort((a, b) => {
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
                  <DoctorCard key={doctor.id} {...doctor} eventPrefix={eventPrefix} />
                ))
              })()}
        </div>

        {/* Load More Button - Calculate hasMoreDoctors outside the IIFE */}
        {(() => {
          const filtered = mappedDoctors.filter((doc) => {
            const mentalHealthSpecialties = ['psychiatrist', 'psychologist', 'clinical psychologist', 'counselor', 'counsellor', 'therapist', 'mentor', 'mental health']
            const docSpecialtyLower = String(doc.specialty || '').toLowerCase().trim()
            
            // Check if doctor has any mental health specialty
            const isMentalHealth = mentalHealthSpecialties.some((specialty) => 
              docSpecialtyLower.includes(specialty)
            )

            // If onlyMentalHealth is true and 'All Therapists' is selected, show all mental health doctors
            if (onlyMentalHealth && (activeSpecialty === 'All Therapists' || activeSpecialty === 'All Doctor')) {
              return isMentalHealth
            }

            // If excludeMentalHealth is true and 'All Doctor' is selected, exclude mental health doctors
            if (excludeMentalHealth && (activeSpecialty === 'All Doctor' || activeSpecialty === 'All Therapists')) {
              return !isMentalHealth
            }

            // Show all when 'All Doctor' or 'All Therapists' selected
            if (activeSpecialty === 'All Doctor' || activeSpecialty === 'All Therapists') {
              return true
            }
            
            // For specific specialties, do exact match (case-insensitive)
            return doc.specialty.trim() === activeSpecialty.trim()
          })
          
          const shouldLimitDoctors = true
          const hasMoreDoctors = shouldLimitDoctors && filtered.length > visibleDoctorsCount
          
          return hasMoreDoctors && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMoreButton}
                onClick={() => setVisibleDoctorsCount(prev => prev + 6)}
              >
                Load More Doctors
              </button>
            </div>
          )
        })()}
      </div>
    </section>
  )
}

export default DoctorGrid
