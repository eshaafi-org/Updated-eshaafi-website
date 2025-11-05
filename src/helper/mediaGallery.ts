export interface MediaItem {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  cover: string;
  images: string[];
  coverStyle?: React.CSSProperties; // Add optional style override for cover images
  imagesStyle?: React.CSSProperties; // Add optional style override for image lists
}

// Sample data for the media gallery. Replace or extend with real API data later.
export const mediaItems: MediaItem[] = [
  {
    id: 'impact-moment-1',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Conducts Breast Cancer Awareness Session at Imagation & Hazal',
    cover: '/images/4.png',
    images: [
      '/images/impact_1_1.png','/images/impact_1_2.png','/images/impact_1_3.png'
      
    ],
  },
  {
    id: 'partnership-highlights-1',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi Partners with Excel Lab to Expand Affordable, Accessible Diagnostics forCommunities Across Pakistan',
    cover: '/images/Excel-Lab-X.png',
    images: [
      '/images/p11.png',
      '/images/p12.png',
    ],
  },
  {
    id: 'media-campaign-1',
    title: 'Campaign Gallery',
    category: 'Campaigns',
    excerpt: 'Events & campaigns that show our footprint.',
    cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=1200&q=80&auto=format&fit=crop',
    images: [
      '/images/achieve1.jpg'
    ],
  },
  {
    id: 'impact-moment-2',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Breast Cancer Awareness Session Organized by eShaafi at Tetra Pak',
    cover: '/images/2.png',
    images: [
      '/images/i_2_3.png','/images/i_2_1.png','/images/i_2_2.png'
    ],
  },
  {
    id: 'impact-moment-3',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Leads Breast Cancer Awareness Initiative at Fiverivers Technologies',
    cover: '/images/impactm3.png',
    images: [
      '/images/i31.png','/images/i32.png','/images/i33.png'
    ],
  },
  {
    id: 'impact-moment-4',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Corporate Breast Cancer Awareness Program by eShaafi at Folium AI', 
    cover: '/images/i4.png',
    images: [
      '/images/i41.png','/images/i42.png','/images/i43.png'
    ],
  },
  {
    id: 'impact-moment-5',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Breast Cancer Awareness Session Delivered by eShaafi at My Brand Genius',
    cover: '/images/i5.png',
    images: [
      '/images/i51.png','/images/i52.png','/images/i53.png'
    ],
  },
  {
    id: 'impact-moment-6',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Women health initiative and preventive care workshop...',
    cover: '/images/i6.png',
    images: [
      '/images/i61.png','/images/i62.png','/images/i63.png'
    ],
  },
  {
    id: 'impact-moment-7',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Breast Cancer Awareness Drive by eShaafi at SUKUK',
    cover: '/images/i7.png',
    images: [
      '/images/i71.png','/images/i72.png','/images/i73.png'
    ],
  },
  {
    id: 'impact-moment-8',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Conducts Workplace Mental Health Session at Prime System Solutions Islamabad',
    cover: '/images/i8.png',
    images: [
      '/images/i81.png','/images/i82.png','/images/i83.png'
    ],
  },
  {
    id: 'impact-moment-9',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Conducts Workplace Mental Health Session at Prime System Solutions Lahore',
    cover: '/images/i9.png',
    images: [
      '/images/i91.png','/images/i92.png',    ],
  },
  {
    id: 'impact-moment-10',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Workplace Mental Wellness Session Delivered by eShaafi at 9D Technologies',
    cover: '/images/i10.png',
    coverStyle: { transform: 'scale(1.45)', objectPosition: 'center' }, // Extra zoom for this image
    images: [
      '/images/i10_1.png','/images/i10_2.png','/images/i10_3.png','/images/i10_4.png'
    ],
  },
  {
    id: 'impact-moment-11',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Mind Wellness & Employee Well-Being Session by eShaafi at Mindstorm Studios',
    cover: '/images/i11.png',
    images: [
      '/images/i11_1.png','/images/i11_2.png','/images/i11_3.png','/images/i11_4.png'
    ],
  },
  {
    id: 'partnership-highlights-2',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi Partners with Green Pharmacy to Enhance Community Access to Medicines and Care',
    cover: '/images/part2.jpg',
    images: [
      '/images/part31.png',
    ],
  },
  {
    id: 'partnership-highlights-3',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi x Essa Lab — Expanding Reliable Diagnostic Services for Our Users',
    cover: '/images/part3.png',
    images: [
      '/images/p21.png','/images/p22.png',
    ],
  },
  {
    id: 'achievements-1',
    title: 'Achievements',
    category: 'Achievements',
    excerpt: 'eShaafi at London Tech Week — Showcasing Innovation on a Global Stage',
    cover: '/images/achieve1.jpg',
    images: [ '/images/a1.jpg','/images/a2.jpg','/images/a3.jpg','/images/a4.jpg',    ],
  },
  
];
