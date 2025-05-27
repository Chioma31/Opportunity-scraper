'use client';

import { useState, useEffect } from 'react';
import { OpportunityService } from '@/utils/api';
import { Opportunity } from '@/types/opportunity';
import LandingPage from '@/components/LandingPage';
import OpportunityDetail from '@/components/OpportunityDetail';
import { Loader } from 'lucide-react';

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const data = await OpportunityService.getAllOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setError('Failed to load opportunities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (selectedOpportunity) {
    return (
      <OpportunityDetail
        opportunity={selectedOpportunity}
        onBack={() => setSelectedOpportunity(null)}
      />
    );
  }

  return (
    <LandingPage
      opportunities={opportunities}
      onSelectOpportunity={(opportunity) => setSelectedOpportunity(opportunity)}
    />
  );
}