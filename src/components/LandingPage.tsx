'use client';

import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';
import OpportunityCard from './OpportunityCard';

interface LandingPageProps {
    opportunities: Opportunity[];
    onSelectOpportunity: (opportunity: Opportunity) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
    opportunities,
    onSelectOpportunity
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(opportunities.map(o => o.tags[0]).filter(Boolean))];



    // Apply search filter

    const filteredOpportunities = opportunities.filter((opp) => {
        if (searchTerm === "" && selectedCategory === "All") {
            return true;
        } else if (searchTerm !== "") {
            const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase())

            return matchesSearch ;
        } else if (selectedCategory !== "All"){
            const matchesCategory = opp.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase())

            return matchesCategory;
        }
    });





    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <header className="relative overflow-hidden bg-gradient-to-r from-[#01175b] to-[#00040f] text-white">
                <div className="absolute inset-0 bg-black/10 "></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                            Opportunities for Nigerian Creatives
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Discover amazing opportunities tailored for creative professionals across Nigeria
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm">
                            <Users className="w-4 h-4" />
                            {opportunities.length} Active Opportunities
                        </div>
                    </div>
                </div>
            </header>

            {/* Search and Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-black" />
                            <input
                                type="text"
                                placeholder="Search opportunities, companies, or keywords..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-black focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Opportunities Grid */}
                {filteredOpportunities.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-900 text-lg">No opportunities found matching your criteria</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOpportunities.map((opportunity, index) => (
                            <OpportunityCard
                                key={index}
                                opportunity={opportunity}
                                onClick={() => onSelectOpportunity(opportunity)}
                            />
                        ))}
                    </div>
                )}


            </section>
        </div>
    );
};

export default LandingPage;