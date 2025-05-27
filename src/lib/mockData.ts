// src/lib/mockData.ts
import { Opportunity } from '@/types/opportunity';

export const mockOpportunities: Opportunity[] = [
    {
        id: '1',
        name: 'Senior UI/UX Designer',
        description: 'Join our creative team to design innovative digital experiences for African markets. We are looking for a passionate designer who understands user-centered design principles and can create beautiful, functional interfaces that resonate with our diverse user base.',
        company: 'TechHub Lagos',
        location: 'Lagos, Nigeria',
        type: 'Full-time',
        deadline: '2025-06-15',
        salary: '₦2,500,000 - ₦4,000,000',
        category: 'Design',
        experienceLevel: 'Senior',
        requirements: [
            '5+ years of UI/UX design experience',
            'Proficiency in Figma, Adobe XD, and Sketch',
            'Strong portfolio showcasing mobile and web design',
            'Experience with design systems and component libraries',
            'Understanding of user research and usability testing',
            'Bachelor\'s degree in Design or related field'
        ],
        benefits: [
            'Comprehensive health insurance',
            'Remote work flexibility',
            'Professional development budget (₦500,000/year)',
            'Annual performance bonus',
            '25 days paid vacation',
            'Modern equipment and tools'
        ],
        contactEmail: 'careers@techhub.ng',
        contactPhone: '+234-801-234-5678',
        website: 'https://techhub.ng',
        applicationUrl: 'https://techhub.ng/careers/senior-ux-designer'
    },
    {
        id: '2',
        name: 'Creative Content Writer',
        description: 'Create compelling content for digital marketing campaigns targeting Nigerian audiences. We need a storyteller who can craft engaging narratives that connect with our local market while maintaining brand consistency across all platforms.',
        company: 'Digital Creatives NG',
        location: 'Remote',
        type: 'Contract',
        deadline: '2025-06-30',
        salary: '₦150,000 - ₦300,000/month',
        category: 'Content',
        experienceLevel: 'Mid-level',
        requirements: [
            '3+ years of content writing experience',
            'Deep understanding of Nigerian culture and languages',
            'SEO knowledge and best practices',
            'Experience with social media content',
            'Portfolio of published work',
            'Excellent English and local language skills'
        ],
        benefits: [
            'Flexible working hours',
            'Creative freedom and autonomy',
            'Performance-based bonuses',
            'Access to premium writing tools',
            'Professional development opportunities'
        ],
        contactEmail: 'hello@digitalcreatives.ng',
        website: 'https://digitalcreatives.ng'
    },
    {
        id: '3',
        name: 'Brand Identity Designer',
        description: 'Design cohesive brand identities for startups and established businesses across Africa. This role involves creating logos, brand guidelines, and visual identity systems that tell powerful brand stories.',
        company: 'Afro Brands Studio',
        location: 'Abuja, Nigeria',
        type: 'Full-time',
        deadline: '2025-07-10',
        salary: '₦1,800,000 - ₦2,800,000',
        category: 'Design',
        experienceLevel: 'Mid-level',
        requirements: [
            '3-5 years of brand design experience',
            'Expertise in Adobe Creative Suite',
            'Strong typography and color theory knowledge',
            'Portfolio of brand identity projects',
            'Understanding of African market aesthetics'
        ],
        benefits: [
            'Health and dental insurance',
            'Creative studio environment',
            'Client interaction opportunities',
            'Brand design training',
            'Equipment allowance'
        ],
        contactEmail: 'jobs@afrobrands.studio',
        website: 'https://afrobrands.studio',
        applicationUrl: 'https://afrobrands.studio/careers'
    },
    {
        id: '4',
        name: 'Video Content Creator',
        description: 'Produce engaging video content for social media platforms, focusing on lifestyle, culture, and entertainment content that resonates with young Nigerian audiences.',
        company: 'Naija Content Hub',
        location: 'Lagos, Nigeria',
        type: 'Part-time',
        deadline: '2025-06-20',
        salary: '₦200,000 - ₦400,000/month',
        category: 'Video',
        experienceLevel: 'Entry-level',
        requirements: [
            '1-2 years of video production experience',
            'Proficiency in video editing software (Premiere Pro, Final Cut)',
            'Understanding of social media platforms',
            'Creative storytelling abilities',
            'Own video equipment preferred'
        ],
        benefits: [
            'Flexible schedule',
            'Creative collaboration',
            'Social media growth opportunities',
            'Equipment support',
            'Performance incentives'
        ],
        contactEmail: 'creators@naijacontenthub.com',
        contactPhone: '+234-802-345-6789'
    },
]