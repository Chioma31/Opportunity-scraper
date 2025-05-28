'use client';

import React from 'react';
import {
    MapPin,
    Calendar,
    Briefcase,
    ExternalLink,
    Mail,
    Tag,
    List
} from 'lucide-react';
import { Opportunity } from '@/types/opportunity';
import AIAssistant from './AIAssistant';
import Link from 'next/link';

interface OpportunityDetailProps {
    opportunity: Opportunity;
    onBack: () => void;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({
    opportunity,
    onBack
}) => {
    const getDisplayText = (text: string | undefined) => {
        if (!text || text === "NA" || text === "N/A") {
            return "Information not available at this time.";
        }
        return text;
    };

    const formatDeadline = (deadline: string) => {
        try {
            const date = new Date(deadline);
            if (isNaN(date.getTime())) {
                return "Deadline not specified";
            }
            return date.toLocaleDateString();
        } catch {
            return "Deadline not specified";
        }
    };

    const formatExternalUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Opportunities
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Opportunity Details */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">
                                {opportunity.title}
                            </h1>
                            <p className="text-lg text-gray-600 break-words">{getDisplayText(opportunity.company)}</p>
                        </div>
                        {opportunity.link && opportunity.link !== "NA" && (
                            <div className="w-full sm:w-auto">
                                <a
                                    href={opportunity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                                >
                                    Apply Now
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            {opportunity.jobLocation && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin className="w-5 h-5 text-gray-900" />
                                    <span>{opportunity.jobLocation}</span>
                                </div>
                            )}
                            {opportunity.payment && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Briefcase className="w-5 h-5 text-gray-900" />
                                    <span>{opportunity.payment.currency} {opportunity.payment.total}</span>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            {opportunity.deadline && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-5 h-5 text-gray-800" />
                                    <span>Deadline: {formatDeadline(opportunity.deadline)}</span>
                                </div>
                            )}
                            {opportunity.companyEmail && opportunity.companyEmail !== "NA" && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-gray-900" />
                                    <span>{opportunity.companyEmail}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg text-black font-semibold mb-3">Event</h3>
                            <p className="text-gray-700 leading-relaxed">{getDisplayText(opportunity.event)}</p>
                        </div>

                        <div>
                            <h3 className="text-lg text-black font-semibold mb-3">Event Description</h3>
                            <p className="text-gray-700 leading-relaxed">{getDisplayText(opportunity.eventDescription)}</p>
                        </div>

                        <div>
                            <h3 className="text-lg text-black font-semibold mb-3">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{getDisplayText(opportunity.description)}</p>
                        </div>

                        {opportunity.tags && opportunity.tags.length > 0 && (
                            <div>
                                <h3 className="text-lg text-black font-semibold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                        >
                                            <Tag className="w-4 h-4" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {opportunity.deliverables && opportunity.deliverables.length > 0 && (
                            <div>
                                <h3 className="text-lg text-black font-semibold mb-3">Deliverables</h3>
                                <ul className="space-y-2">
                                    {opportunity.deliverables.map((deliverable, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <List className="w-5 h-5 text-blue-500 mt-0.5" />
                                            <span className="text-gray-700">{deliverable}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                AI Assistant
                <AIAssistant opportunity={opportunity} />
            </div>
        </div>
    );
};

export default OpportunityDetail;