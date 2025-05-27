export interface Payment {
    currency: string;
    total: number;
}

export interface Opportunity {
    id: string;
    title: string;
    company: string;
    companyEmail: string;
    event: string;
    eventDescription: string;
    description: string;
    jobLocation: string;
    payment: Payment;
    deadline: string;
    tags: string[];
    deliverables: string[];
    link: string;
}