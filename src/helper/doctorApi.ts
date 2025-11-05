import { BASE_URL } from "./CONST";

export type DoctorFilterType = "categroy" | "specialization";

interface FetchDoctorsOptions {
  type: DoctorFilterType;
  search?: string;
}

/**
 * Fetch and sort doctors from the backend API
 * @param options - Filter type and optional search term
 * @returns Sorted doctor array (online first, then offline)
 */
export async function fetchAndSortDoctors(options: FetchDoctorsOptions) {
  const { type, search } = options;

  const body: any = { type };
  if (search) {
    body.search = search;
  }

  const response = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const doctors = data.response?.Items || [];

  // Sort: online doctors first, then offline
  return doctors.sort((a: any, b: any) => {
    if (a.isOnline && !b.isOnline) {
      return -1;
    } else if (!a.isOnline && b.isOnline) {
      return 1;
    }
    return 0;
  });
}

/**
 * Preset configurations for common doctor queries
 */
export const DoctorQueryPresets = {
  /**
   * All doctors (no filter) — use type "categroy" to get all specializations
   */
  allDoctors: (): FetchDoctorsOptions => ({
    type: "categroy",
  }),

  /**
   * Mental health specialists: Fetch all doctors and filter client-side for mental health specializations
   * This ensures we get all therapists/counselors/psychologists regardless of API response
   */
  mentalHealthSpecialists: (): FetchDoctorsOptions => ({
    type: "categroy",
    // Fetch all and let client-side filtering handle mental-health specialization extraction
  }),

  /**
   * General physicians only
   */
  generalPhysicians: (): FetchDoctorsOptions => ({
    type: "specialization",
    search: "General Physician",
  }),

  /**
   * Custom specialization filter
   */
  bySpecialization: (specialization: string): FetchDoctorsOptions => ({
    type: "specialization",
    search: specialization,
  }),
};

/**
 * Client-side filter: Extract mental-health specialists from doctor list
 * Includes: Psychiatrist, Psychologist, Counselor, Clinical Psychologist, etc.
 */
export function filterMentalHealthSpecialists(doctors: any[]): any[] {
  const mentalHealthKeywords = [
    "psychiatr",
    "psycholog",
    "counselor",
    "counsellor",
    "therapist",
    "mental health",
  ];

  return doctors.filter((doc) => {
    const spec = String(doc.specialization || "").toLowerCase();
    return mentalHealthKeywords.some((keyword) => spec.includes(keyword));
  });
}
