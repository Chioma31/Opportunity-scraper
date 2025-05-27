import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Opportunity } from '@/types/opportunity';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    try {
        const { type, opportunity } = await request.json();

        if (!type || !opportunity) {
            return NextResponse.json(
                { error: 'Document type and opportunity details are required' },
                { status: 400 }
            );
        }

        let prompt = '';
        if (type === 'cover-letter') {
            prompt = `Write a professional cover letter for a ${opportunity.title} position at ${opportunity.company}. 
            The position requires: ${opportunity.tags?.join(', ')}. 
            The letter should be concise, highlight relevant skills, and express genuine interest in the company.`;
        } else if (type === 'letter-of-intent') {
            prompt = `Write a letter of intent for a ${opportunity.title} position at ${opportunity.company}. 
            The position requires: ${opportunity.tags?.join(', ')}. 
            The letter should focus on career goals, alignment with company values, and potential contributions.`;
        } else {
            return NextResponse.json(
                { error: 'Invalid document type' },
                { status: 400 }
            );
        }

        // Get the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate content
        const result = await model.generateContent([
            "You are a professional career coach helping write application documents. Be concise, professional, and specific.",
            prompt
        ]);

        const response = await result.response;
        const text = response.text();

        const document = {
            type,
            content: text,
            generatedAt: new Date().toISOString(),
            metadata: {
                position: opportunity.title,
                company: opportunity.company,
                requirements: opportunity.tags
            }
        };

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error generating document:', error);
        return NextResponse.json(
            { error: 'Failed to generate document' },
            { status: 500 }
        );
    }
} 