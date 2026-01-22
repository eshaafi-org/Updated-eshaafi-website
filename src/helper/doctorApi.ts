import { BASE_URL } from "./CONST";

export type DoctorFilterType = "categroy" | "specialization";

interface FetchDoctorsOptions {
  type: DoctorFilterType;
  search?: string;
}

/**
 * Process promises with concurrency limit
 * @param promises - Array of promise-returning functions
 * @param concurrency - Maximum number of concurrent promises
 * @returns Array of results
 */
async function processWithConcurrencyLimit<T>(
  promiseFns: (() => Promise<T>)[],
  concurrency: number = 5
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (let i = 0; i < promiseFns.length; i++) {
    const promiseFn = promiseFns[i];
    const promise = promiseFn().then(result => {
      results[i] = result;
    });

    results[i] = {} as T; // placeholder

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }

    executing.push(promise.then(() => {
      executing.splice(executing.indexOf(promise), 1);
    }));
  }

  await Promise.all(executing);
  return results;
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

  try {
    const response = await fetch(BASE_URL + "/patients/doctors/filter", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Doctor API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch doctors: ${response.status}`);
    }

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
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
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
 * Fetch availability slots for multiple doctors with concurrency limit
 * @param doctors - Array of doctor objects
 * @param concurrency - Maximum concurrent requests (default: 5)
 * @returns Array of doctors with availabilitySlots added
 */
export async function fetchDoctorsWithSlots(
  doctors: any[],
  concurrency: number = 5
): Promise<any[]> {
  if (!doctors || doctors.length === 0) return [];

  const promiseFns = doctors.map(doctor => async () => {
    try {
      const response = await fetch(`${BASE_URL}/patients/doctor/appointmentSlots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor.Id,
          medium: 'Video',
        }),
      });

      if (!response.ok) {
        console.error(`Error fetching slots for doctor ${doctor.Id}: ${response.status}`);
        return {
          ...doctor,
          availabilitySlots: [],
        };
      }

      const data = await response.json();
      return {
        ...doctor,
        availabilitySlots: data.response?.Items || [],
      };
    } catch (error) {
      console.error(`Error fetching slots for doctor ${doctor.Id}:`, error);
      return {
        ...doctor,
        availabilitySlots: [],
      };
    }
  });

  return processWithConcurrencyLimit(promiseFns, concurrency);
}
