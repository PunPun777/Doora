import React from 'react';
import { SearchFilters as SearchFiltersType } from '../../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  // Remove the unused handleHashtagsChange function

  const handleInputChange = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Services</h3>
      
      {/* Max Distance */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Distance: {filters.maxDistance} km
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={filters.maxDistance}
          onChange={(e) => handleInputChange('maxDistance', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Minimum Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating: {filters.minRating} ⭐
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={filters.minRating}
          onChange={(e) => handleInputChange('minRating', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleInputChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="distance">Distance</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="repair">Repair</option>
          <option value="medical">Medical</option>
          <option value="transport">Transport</option>
          <option value="food">Food & Supplies</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => onFiltersChange({
          maxDistance: 50,
          minRating: 0,
          sortBy: 'distance',
        })}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};