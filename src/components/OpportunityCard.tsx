'use client';

import React from 'react';
import { MapPin, Briefcase, Clock, Tag, ArrowRight } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';

interface OpportunityCardProps {
    opportunity: Opportunity;
    onClick: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onClick }) => {
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
                return "not specified";
            }
            return date.toLocaleDateString();
        } catch {
            return "not specified";
        }
    };

    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer hover:border-blue-200 hover:-translate-y-1"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {opportunity.title}
                    </h3>
                    <p className="text-sm text-gray-900 mt-1">{getDisplayText(opportunity.company)}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-900 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {getDisplayText(opportunity.description)}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.jobLocation && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        <MapPin className="w-3 h-3" />
                        {opportunity.jobLocation}
                    </span>
                )}
                {opportunity.payment && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                        <Briefcase className="w-3 h-3" />
                        {opportunity.payment.currency} {opportunity.payment.total}
                    </span>
                )}
                {opportunity.tags && opportunity.tags.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                        <Tag className="w-3 h-3" />
                        {opportunity.tags[0]}
                    </span>
                )}
            </div>

            {opportunity.deadline && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Deadline: {formatDeadline(opportunity.deadline)}
                </div>
            )}
        </div>
    );
};

export default OpportunityCard;