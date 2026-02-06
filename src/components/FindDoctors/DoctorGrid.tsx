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
    // Handle activeCategory from URL params
    if (activeCategory) {
      // Don't set activeSpecialty when activeCategory is present - let the active state logic handle it
      setLastClickedSpecialty(null);
      return;
    }

    // Fallback to query param
    const q = router.query?.specialty as string | undefined
    if (q) {
      try {
        const decoded = decodeURIComponent(q).replace(/\+/g, ' ')
        setActiveSpecialty(decoded)
      } catch (e) {
        setActiveSpecialty(q)
      }
    } else {
      // Reset to default when no category is active
      setActiveSpecialty(onlyMentalHealth ? 'All Therapists' : 'All Doctor')
    }
    setLastClickedSpecialty(null);
  }, [router.query?.specialty, activeCategory, onlyMentalHealth])

  const mappedDoctors: Doctor[] = useMemo(() => doctors.map((doc: any) => {
    // Extract availability time from backend response
    let availableTime: string | undefined;
    
    // Helper function to format availability time with date if not today
    const formatAvailabilityTime = (isoDateTime: string) => {
      if (!isoDateTime) return '';
      
      // Parse ISO datetime
      const availabilityDate = new Date(isoDateTime);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      availabilityDate.setHours(0, 0, 0, 0);
      
      // Extract time in 12-hour format
      const dateObj = new Date(isoDateTime);
      let hours = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      
      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours = hours - 12;
      }
      
      const timeStr = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
      
      // Check if date is not today
      if (availabilityDate.getTime() > today.getTime()) {
        // Format date as "Feb 8"
        const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
        const dateStr = dateFormatter.format(new Date(isoDateTime));
        return `${dateStr}, ${timeStr}`;
      }
      
      return timeStr;
    };
    
    if (doc.availability_time && doc.is_slot_available !== undefined) {
      const formattedTime = formatAvailabilityTime(doc.availability_time);
      if (doc.is_slot_available) {
        availableTime = `Available till ${formattedTime}`;
      } else {
        availableTime = `Available at ${formattedTime}`;
      }
    } else if (doc.isOnline) {
      // Fallback: if availability_time not provided, show based on online status
      availableTime = 'Available Now';
    }
   

    return {
      id: doc.Id,
      name: `${doc.personal_info?.title || ''} ${doc.personal_info?.firstName || ''} ${doc.personal_info?.lastName || ''}`.trim(),
      specialty: doc.specialization || '',
      experience: `${doc.yearsOfExperience || 0} ${(doc.yearsOfExperience || 0) === 1 ? 'year' : 'years'}`,
      rating: Number(doc.rating?.averageRating) || 0,
      consultationFee: doc.videoCallCharges || 0,
      available: doc.isOnline || false,
      availableTime,
      image: doc.personal_info?.profileUrl || ''
    };
  }), [doctors])

  // Memoize filtered doctors to avoid recalculating on every render
  const filteredDoctors = useMemo(() => {
    // Determine which specialty to filter by
    let filterSpecialty = activeSpecialty;
    
    // If activeCategory is set, convert slug to display name
    if (activeCategory && !lastClickedSpecialty) {
      // Convert slug back to display name (reverse of generateSlug)
      // For example: "cardiology" -> "Cardiology"
      const displayName = activeCategory
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/\(/g, '(')
        .replace(/\)/g, ')');
      
      // For mental health pages, check if specialty contains the displayName
      if (onlyMentalHealth) {
        filterSpecialty = displayName; // Will be checked with includes logic below
      } else {
        filterSpecialty = displayName;
      }
    }

    return mappedDoctors.filter((doc) => {
      const mentalHealthSpecialties = ['psychiatrist', 'psychologist', 'clinical psychologist', 'counselor', 'counsellor', 'therapist', 'mentor', 'mental health']
      const docSpecialtyLower = String(doc.specialty || '').toLowerCase().trim()
      
      // Check if doctor has any mental health specialty
      const isMentalHealth = mentalHealthSpecialties.some((specialty) => 
        docSpecialtyLower.includes(specialty)
      )

      // If excludeMentalHealth is true and 'All Doctor' is selected, exclude mental health doctors
      if (excludeMentalHealth && (filterSpecialty === 'All Doctor' || filterSpecialty === 'All Therapists')) {
        return !isMentalHealth
      }

      // Show all when 'All Doctor' or 'All Therapists' selected (for both mental health and regular doctors)
      if (filterSpecialty === 'All Doctor' || filterSpecialty === 'All Therapists') {
        return true
      }
      
      // For specific specialties, do flexible matching
      const specialtyMatch = doc.specialty.trim().toLowerCase().includes(filterSpecialty.trim().toLowerCase()) ||
                            filterSpecialty.trim().toLowerCase().includes(doc.specialty.trim().toLowerCase());
      return specialtyMatch;
    })
  }, [mappedDoctors, activeSpecialty, activeCategory, lastClickedSpecialty, onlyMentalHealth, excludeMentalHealth])

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
            } else if (activeCategory) {
              if (specialty === 'All Doctor' || specialty === 'All Therapists') {
                isActive = false; // Don't highlight "All" when a specific category is active
              } else {
                // Convert activeCategory slug to display name and compare
                const displayName = activeCategory
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                  .replace(/\(/g, '(')
                  .replace(/\)/g, ')');
                // For mental health pages, use flexible matching; exact match for others
                if (onlyMentalHealth) {
                  isActive = specialty === displayName || 
                            specialty.toLowerCase().includes(displayName.toLowerCase()) || 
                            displayName.toLowerCase().includes(specialty.toLowerCase());
                } else {
                  isActive = specialty === displayName;
                }
              }
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
                // Apply pagination to all categories
                const shouldLimitDoctors = true
                const doctorsToShow = shouldLimitDoctors ? filteredDoctors.slice(0, visibleDoctorsCount) : filteredDoctors
                
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
          const shouldLimitDoctors = true
          const hasMoreDoctors = shouldLimitDoctors && filteredDoctors.length > visibleDoctorsCount
          
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
