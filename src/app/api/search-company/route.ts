import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const company = searchParams.get('company');

        if (!company) {
            return NextResponse.json(
                { error: 'Company name is required' },
                { status: 400 }
            );
        }

        // Search for company information using Google Custom Search API
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${encodeURIComponent(company + ' company information news reviews')}&num=5`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from Google Custom Search API');
        }

        const data = await response.json();

        // Process and structure the results
        const companyInfo = {
            name: company,
            summary: data.items?.[0]?.snippet || 'No summary available',
            news: data.items?.slice(1).map((item: any) => ({
                title: item.title,
                link: item.link,
                snippet: item.snippet
            })) || [],
            lastUpdated: new Date().toISOString()
        };

        return NextResponse.json(companyInfo);
    } catch (error) {
        console.error('Error searching company:', error);
        return NextResponse.json(
            { error: 'Failed to search company information' },
            { status: 500 }
        );
    }
} 