import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import FindDoctorsView from '@/views/FindDoctors'
import { BASE_URL } from '@/helper/CONST'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SkeletonLoader } from '@/components/SkeletonLoader'
import { trackEvent } from '@/lib/ga'

interface CategoryPageProps {
  doctors: any[]
  category: string
  categoryTitle: string
}

const FindDoctorsByCategoryPage: React.FC<CategoryPageProps> = ({ doctors, category, categoryTitle }) => {
  const router = useRouter()

  useEffect(() => {
    trackEvent('find_doctors_page_view_clk', {
      section: 'page_load',
      category: category
    })
  }, [category])

  // Show loading state while page is being generated
  if (router.isFallback) {
    return <div><SkeletonLoader /></div>
  }

  return (
    <>
      <Head>
        <title>{categoryTitle} - Find Doctors - eShaafi</title>
        <meta name="description" content={`Book video consultation with the best ${categoryTitle.toLowerCase()}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FindDoctorsView doctors={doctors} category={category} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(BASE_URL + "/patients/doctors/filter", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "categroy",
      }),
    })

    const docData = await response.json()
    const allDoctors = docData.response?.Items || []

    // Extract unique categories from all doctors
    const specialtyToSlugMap: { [key: string]: string } = {
      'cardiologist': 'cardiologist',
      'dermatologist': 'dermatologist',
      'gynecologist': 'gynecologist',
      'pediatrician': 'child-specialist',
      'psychiatrist': 'psychiatrist',
      'psychologist': 'psychologist',
      'clinical psychologist': 'psychologist',
      'orthopedic': 'orthopedic',
      'orthopedic surgeon': 'orthopedic',
      'neurologist': 'neurologist',
      'general physician': 'general-physician',
      'general physician (mo peads)': 'general-physician-mo-peads',
      'mental health': 'mental-health',
      'dentist': 'dentist',
      'physiotherapist': 'physiotherapist',
      'cons. physiotherapist': 'cons-physiotherapist',
      'consultant physician': 'consultant-physician',
      'family physician': 'family-physician',
      'gastroenterologist': 'gastroenterologist',
      'medical specialist': 'medical-specialist',
      'nephrologist': 'nephrologist',
      'pulmonologist': 'pulmonologist',
      'speech therapist': 'speech-therapist',
      'counselor': 'counselor',
      'counsellor': 'counselor',
      'therapist': 'therapist',
      'ent': 'ent',
      'urologist': 'urologist',
    }

    const uniqueCategories = new Set<string>()
    allDoctors.forEach((doctor: any) => {
      const specialty = doctor.specialization?.toLowerCase().trim() || ''
      // Match specialty to slug
      for (const [spec, slug] of Object.entries(specialtyToSlugMap)) {
        if (specialty.includes(spec)) {
          uniqueCategories.add(slug)
          break
        }
      }
    })

    const paths = Array.from(uniqueCategories).map(category => ({
      params: { category }
    }))

    return {
      paths: paths.length > 0 ? paths : [
        { params: { category: 'cardiologist' } },
        { params: { category: 'general-physician' } },
        { params: { category: 'psychiatrist' } }
      ],
      fallback: true
    }
  } catch (error) {
    console.error('Error fetching categories for find-doctors:', error)
    
    return {
      paths: [
        { params: { category: 'cardiologist' } },
        { params: { category: 'general-physician' } },
        { params: { category: 'psychiatrist' } }
      ],
      fallback: true
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string

  // Map URL-friendly category to display title
  const categoryTitles: { [key: string]: string } = {
    'cardiologist': 'Cardiologists',
    'dermatologist': 'Dermatologists',
    'gynecologist': 'Gynecologists',
    'pediatrician': 'Pediatricians',
    'psychiatrist': 'Psychiatrists',
    'psychologist': 'Psychologists',
    'orthopedic': 'Orthopedic Specialists',
    'neurologist': 'Neurologists',
    'general-physician': 'General Physicians',
    'mental-health': 'Mental Health Specialists',
    'mind-wellness': 'Mind Wellness Specialists',
    'dentist': 'Dentists',
    'physiotherapist': 'Physiotherapists',
    'consultant-physician': 'Consultant Physicians',
    'family-physician': 'Family Physicians',
    'gastroenterologist': 'Gastroenterologists',
    'medical-specialist': 'Medical Specialists',
    'nephrologist': 'Nephrologists',
    'pulmonologist': 'Pulmonologists',
    'speech-therapist': 'Speech Therapists'
  }

  const categoryTitle = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1)

  try {
    // Fetch doctors filtered by category
    const response = await fetch(BASE_URL + "/patients/doctors/filter", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "category",
        category: category
      }),
    })

    const docData = await response.json()

    // Sort doctors with online status first
    const sortedDoctors = (docData.response?.Items || []).sort((a: any, b: any) => {
      if (a.isOnline && !b.isOnline) return -1
      if (!a.isOnline && b.isOnline) return 1
      return 0
    })

    return {
      props: {
        doctors: sortedDoctors,
        category,
        categoryTitle
      },
      revalidate: 60 // Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching doctors for category:', category, error)
    
    return {
      props: {
        doctors: [],
        category,
        categoryTitle
      },
      revalidate: 60
    }
  }
}

export default FindDoctorsByCategoryPage
