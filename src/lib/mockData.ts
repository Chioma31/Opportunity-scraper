// src/lib/mockData.ts
import { Opportunity } from '@/types/opportunity';

export const mockOpportunities: Opportunity[] = [
    {
        id: '1',
        title: 'Senior UI/UX Designer',
        description: 'Join our creative team to design innovative digital experiences for African markets. We are looking for a passionate designer who understands user-centered design principles and can create beautiful, functional interfaces that resonate with our diverse user base.',
        company: 'TechHub Lagos',
        jobLocation: 'Lagos, Nigeria',
        event: 'Full-time Position',
        eventDescription: 'Join our growing design team',
        deadline: '2025-06-15',
        payment: {
            currency: '₦',
            total: 2500000
        },
        tags: ['UI/UX', 'Design', 'Figma', 'Adobe XD', 'User Research'],
        deliverables: [
            'Design user interfaces for web and mobile applications',
            'Create and maintain design systems',
            'Conduct user research and usability testing',
            'Collaborate with development team'
        ],
        companyEmail: 'careers@techhub.ng',
        link: 'techhub.ng/careers/senior-ux-designer'
    },
    {
        id: '2',
        title: 'Creative Content Writer',
        description: 'Create compelling content for digital marketing campaigns targeting Nigerian audiences. We need a storyteller who can craft engaging narratives that connect with our local market while maintaining brand consistency across all platforms.',
        company: 'Digital Creatives NG',
        jobLocation: 'Remote',
        event: 'Contract Position',
        eventDescription: 'Join our content team',
        deadline: '2025-06-30',
        payment: {
            currency: '₦',
            total: 150000
        },
        tags: ['Content Writing', 'SEO', 'Social Media', 'Digital Marketing'],
        deliverables: [
            'Create engaging blog posts and articles',
            'Develop social media content',
            'Write marketing copy',
            'Conduct content research'
        ],
        companyEmail: 'hello@digitalcreatives.ng',
        link: 'digitalcreatives.ng/careers'
    },
    {
        id: '3',
        title: 'Brand Identity Designer',
        description: 'Design cohesive brand identities for startups and established businesses across Africa. This role involves creating logos, brand guidelines, and visual identity systems that tell powerful brand stories.',
        company: 'Afro Brands Studio',
        jobLocation: 'Abuja, Nigeria',
        event: 'Full-time Position',
        eventDescription: 'Join our brand design team',
        deadline: '2025-07-10',
        payment: {
            currency: '₦',
            total: 1800000
        },
        tags: ['Brand Design', 'Logo Design', 'Adobe Creative Suite', 'Typography'],
        deliverables: [
            'Create brand identities and logos',
            'Develop brand guidelines',
            'Design marketing materials',
            'Present design concepts to clients'
        ],
        companyEmail: 'jobs@afrobrands.studio',
        link: 'afrobrands.studio/careers'
    },
    {
        id: '4',
        title: 'Video Content Creator',
        description: 'Produce engaging video content for social media platforms, focusing on lifestyle, culture, and entertainment content that resonates with young Nigerian audiences.',
        company: 'Naija Content Hub',
        jobLocation: 'Lagos, Nigeria',
        event: 'Part-time Position',
        eventDescription: 'Join our video production team',
        deadline: '2025-06-20',
        payment: {
            currency: '₦',
            total: 200000
        },
        tags: ['Video Production', 'Social Media', 'Content Creation', 'Editing'],
        deliverables: [
            'Create engaging video content',
            'Edit and post-produce videos',
            'Manage social media presence',
            'Collaborate with content team'
        ],
        companyEmail: 'creators@naijacontenthub.com',
        link: 'naijacontenthub.com/careers'
    }
];