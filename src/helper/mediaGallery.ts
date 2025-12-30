export interface MediaItem {
  id: string;
  title: string;
  category?: string;
  excerpt?: string;
  cover: string;
  images: string[];
  imageCaptions?: string[];
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
    cover: '/images/hazel-mainimage.webp',
    images: [
      '/images/session1-hazel.webp','/images/session2-hazel.webp','/images/session3-hazel.webp'
      
    ],
  },
  {
    id: 'partnership-highlights-1',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi Partners with Excel Lab to Expand Affordable, Accessible Diagnostics forCommunities Across Pakistan',
    cover: '/images/Excel-Lab-X.webp',
    images: [
      '/images/session1-excel.webp',
      '/images/session2-excel.webp',
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
    cover: '/images/main-image-tetrapak.webp',
    images: [
      '/images/session-image1-tetrapak.webp','/images/session-image2-tetrapak.webp','/images/session-image3-tetrapak.webp'
    ],
  },
  {
    id: 'impact-moment-3',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Leads Breast Cancer Awareness Initiative at Fiverivers Technologies',
    cover: '/images/main-image-Fiverivers.webp',
    images: [
      '/images/session1-Fiverivers.webp','/images/session2-Fiverivers.webp','/images/session3-Fiverivers.webp'
    ],
  },
  {
    id: 'impact-moment-4',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Corporate Breast Cancer Awareness Program by eShaafi at Folium AI', 
    cover: '/images/main-image-folium.webp',
    images: [
      '/images/session1-folium.webp','/images/session2-folium.webp','/images/session3-folium.webp'
    ],
  },
  {
    id: 'impact-moment-5',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Breast Cancer Awareness Session Delivered by eShaafi at My Brand Genius',
    cover: '/images/main-image-brand.webp',
    images: [
      '/images/session1-brand.webp','/images/session2-brand.webp','/images/session3-brand.webp'
    ],
  },
  {
    id: 'impact-moment-6',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Women health initiative and preventive care workshop...',
    cover: '/images/main-image-septem.webp',
    images: [
      '/images/session1-septem.webp','/images/session2-septem.webp','/images/session3-septem.webp'
    ],
  },
  {
    id: 'impact-moment-7',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Breast Cancer Awareness Drive by eShaafi at SUKUK',
    cover: '/images/main-image-sukuk.webp',
    images: [
      '/images/session1-sukuk.webp','/images/session2-sukuk.webp','/images/session3-sukuk.webp'
    ],
  },
  {
    id: 'impact-moment-8',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Conducts Workplace Mental Health Session at Prime System Solutions Islamabad',
    cover: '/images/main-image-prime.webp',
    images: [
      '/images/session1-prime.webp','/images/session2-prime.webp','/images/session3-prime.webp'
    ],
  },
  {
    id: 'impact-moment-9',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'eShaafi Conducts Workplace Mental Health Session at Prime System Solutions Lahore',
    cover: '/images/main-image-prme.webp',
    images: [
      '/images/session1-prme.webp','/images/session2-prme.webp',    ],
  },
  {
    id: 'impact-moment-10',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Workplace Mental Wellness Session Delivered by eShaafi at 9D Technologies',
    cover: '/images/main-image-9d.webp',
    coverStyle: { transform: 'scale(1.45)', objectPosition: 'center' }, // Extra zoom for this image
    images: [
      '/images/session1-9d.webp','/images/session2-9d.webp','/images/session3-9d.webp','/images/session4-9d.webp'
    ],
  },
  {
    id: 'impact-moment-11',
    title: 'Impact Moment',
    category: 'Impact',
    excerpt: 'Mind Wellness & Employee Well-Being Session by eShaafi at Mindstorm Studios',
    cover: '/images/main-screen-mind.webp',
    images: [
      '/images/session1-mind.webp','/images/session2-mind.webp','/images/session3-mind.webp','/images/session4-mind.webp'
    ],
  },
  {
    id: 'partnership-highlights-2',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi Partners with Green Pharmacy to Enhance Community Access to Medicines and Care',
    cover: '/images/main-image-greenpharmacy.webp',
    images: [
      '/images/Medicine-greenpharmacy.webp',
    ],
  },
  {
    id: 'partnership-highlights-3',
    title: 'Partnership Highlights',
    category: 'Partnership',
    excerpt: 'eShaafi x Essa Lab — Expanding Reliable Diagnostic Services for Our Users',
    cover: '/images/main-image-Essa.webp',
    images: [
      '/images/session1-Essa.webp','/images/session2-Essa.webp',
    ],
  },
  // {
  //   id: 'partnership-highlights-4',
  //   title: 'Partnership Highlights',
  //   category: 'Partnership',
  //   excerpt: 'Zindigi & eShaafi Partners to Make Healthcare More Accessible',
  //   cover: '/images/pz1.png',
  //   images: [
  //     '/images/pz2.png','/images/pz1.png',
  //   ],
  // },
  {
  id: 'partnership-highlights-4',
  title: 'Partnership Highlights',
  category: 'Partnership',
  excerpt: 'Zindigi & eShaafi Partners to Make Healthcare More Accessible',
  cover: '/images/pz1.png',
  images: [
    '/images/pz1.png',
    '/images/pz2.png',
    '/images/pz3.png',
  ],
  imageCaptions: [
    'In a significant step forward for Pakistan’s digital health and financial ecosystem, Zindigi and eShaafi have entered into a strategic partnership to jointly drive innovation and to advance digital healthcare access for masses, especially those in remote and underserved communities.This collaboration brings together eShaafi’s end-to-end telehealth ecosystem and Zindigi’s advanced digital payment ecosystem, enabling users to access round-the-clock healthcare services and complete secure, instant digital payments , all within one seamless experience.',
    'The MoU was formalized by Noman Azhar, Chief Officer of Zindigi, and Shafique Anwar, Founder & CEO of eShaafi, with senior leadership from both organizations in attendance. Noman Azhar, Chief Officer Zindigi, stated, ‘Through this partnership, we are bringing together Zindigi’s digital financial ecosystem and eShaafi’s innovative healthcare services to drive meaningful change. It reflects our commitment to reaching underserved communities and improving access where it’s needed most”',
    'Commenting on the partnership, Shafique Anwar, Founder & CEO eShaafi said: “This collaboration is more than a partnership , it is a national commitment. Together with Zindigi, we are shaping a future where digital health and digital payments work hand in hand, breaking barriers that have kept communities from accessing quality and affordable healthcare.”',
    'The partnership offers value to all stakeholders, enabling patients to access timely and affordable healthcare, empowering providers with efficient digital tools, and create lasting social impact. Together, Zindigi and eShaafi are reshaping the future of healthcare and financial inclusion in Pakistan, making seamless, technology-driven access a reality for everyone, everywhere.',
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
