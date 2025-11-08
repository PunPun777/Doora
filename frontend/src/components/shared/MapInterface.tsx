import React from 'react';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { Service } from '../../types';

interface MapInterfaceProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
  selectedService?: Service;
  onStartChat: (service: Service) => void; // Add this line
}

export const MapInterface: React.FC<MapInterfaceProps> = ({
  services,
  onServiceSelect,
  selectedService,
  onStartChat
}) => {
  const { location: userLocation } = useGeoLocation();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 relative">
      {/* Mock Map Background */}
      <div className="w-full h-full bg-blue-50 relative overflow-hidden">
        {/* User Location Marker */}
        {userLocation && (
          <div 
            className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '50%',
              top: '50%'
            }}
            title="Your location"
          >
            <div className="animate-ping w-4 h-4 bg-blue-400 rounded-full absolute -inset-1"></div>
          </div>
        )}

        {/* Service Markers */}
        {services.map((service, index) => {
          const angle = (index / services.length) * 2 * Math.PI;
          const distance = 30 + (index * 10);
          const left = 50 + Math.cos(angle) * distance;
          const top = 50 + Math.sin(angle) * distance;

          return (
            <div
              key={service.id}
              className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                selectedService?.id === service.id 
                  ? 'bg-green-500 scale-125 z-10' 
                  : 'bg-orange-500 hover:scale-110'
              }`}
              style={{
                left: `${left}%`,
                top: `${top}%`
              }}
              onClick={() => onServiceSelect(service)}
              title={service.title}
            >
              {selectedService?.id === service.id && (
                <div className="animate-ping w-6 h-6 bg-green-400 rounded-full absolute -inset-1"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Service Info Panel */}
      {selectedService && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedService.title}</h3>
              <p className="text-sm text-gray-600">{selectedService.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>⭐ {selectedService.rating}</span>
                <span>📏 {selectedService.distance}km</span>
                <span>💰 ${selectedService.rate}/hr</span>
              </div>
            </div>
            <button
              onClick={() => onStartChat(selectedService)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};