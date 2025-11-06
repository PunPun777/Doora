import React from 'react';
import { Service, SearchFilters as SearchFiltersType } from '../../types';

interface ServiceGridProps {
  services: Service[];
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onStartChat: (service: Service) => void; // Add this line
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services,
  onStartChat
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            <span className="text-sm text-gray-500">{service.provider.avatar}</span>
          </div>
          <p className="text-gray-600 mb-3">{service.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>⭐ {service.rating}</span>
            <span>📏 {service.distance}km</span>
            <span>💰 ${service.rate}/hr</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">By {service.provider.name}</span>
            <button
              onClick={() => onStartChat(service)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
            >
              💬 Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};