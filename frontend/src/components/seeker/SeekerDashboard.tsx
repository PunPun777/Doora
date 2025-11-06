import React, { useState } from 'react';
import { SearchFilters } from './SearchFilters';
import { ServiceGrid } from './ServiceGrid';
import { SOSForm } from './SOSForm';
import { SOSPost, SearchFilters as SearchFiltersType, Service } from '../../types';

const initialFilters: SearchFiltersType = {
  maxDistance: 50,
  minRating: 0,
  sortBy: 'distance',
};

// Mock data that matches the Service type
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Emergency Plumber',
    description: '24/7 plumbing services for emergencies',
    rating: 4.5,
    distance: 2.5,
    category: 'repair',
    hashtags: ['emergency', 'plumbing', 'repair'],
    rate: 75,
    provider: {
      id: 'provider1',
      name: 'John Plumbing',
      avatar: '👨‍🔧'
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Medical Assistance',
    description: 'First aid and emergency medical help',
    rating: 4.8,
    distance: 1.2,
    category: 'medical',
    hashtags: ['medical', 'emergency', 'first-aid'],
    rate: 100,
    provider: {
      id: 'provider2',
      name: 'MediHelp Team',
      avatar: '👩‍⚕️'
    },
    createdAt: new Date('2024-01-16')
  }
];

export const SeekerDashboard: React.FC = () => {
  const [filters, setFilters] = useState<SearchFiltersType>(initialFilters);
  const [showSOSForm, setShowSOSForm] = useState(false);

  const handleSOSSubmit = (sosData: Partial<SOSPost>) => {
    console.log('SOS Data:', sosData);
    // TODO: Implement API call to create SOS post
    // This will be handled by your backend service
    setShowSOSForm(false);
  };

  const handleSOSCancel = () => {
    setShowSOSForm(false);
  };

  return (
    <div className="space-y-6">
      {/* SOS Quick Action Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Emergency Assistance</h2>
            <p className="text-gray-600 mt-1">Need immediate help? Create an SOS request</p>
          </div>
          <button
            onClick={() => setShowSOSForm(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            🚨 Create SOS
          </button>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
        </div>
        <div className="lg:col-span-3">
          <ServiceGrid 
            services={mockServices} 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
        </div>
      </div>

      {/* SOS Form Modal - Using original props */}
      {showSOSForm && (
        <SOSForm 
          onSubmit={handleSOSSubmit}
          onCancel={handleSOSCancel}
        />
      )}
    </div>
  );
};