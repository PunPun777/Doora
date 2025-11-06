import React, { useState } from 'react';
import { SOSPost } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useGeoLocation } from '../../hooks/useGeoLocation';

interface SOSFormProps {
  onSubmit: (sosData: Partial<SOSPost>) => void;
  onCancel: () => void;
}

export const SOSForm: React.FC<SOSFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const { location: userLocation, error: locationError } = useGeoLocation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    category: '',
    address: '',
    radius: 5,
    contactPhone: '',
    contactEmail: '',
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');

  const urgencyLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
  ];

  const categories = [
    'Emergency Repair',
    'Medical Help',
    'Security',
    'Transportation',
    'Food & Supplies',
    'Shelter',
    'Other'
  ];

  const calculateExpiry = (urgency: 'low' | 'medium' | 'high' | 'critical'): Date => {
    const now = new Date();
    const expiryTimes = {
      low: 24 * 60 * 60 * 1000, // 24 hours
      medium: 12 * 60 * 60 * 1000, // 12 hours
      high: 6 * 60 * 60 * 1000, // 6 hours
      critical: 2 * 60 * 60 * 1000, // 2 hours
    };
    return new Date(now.getTime() + expiryTimes[urgency]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userLocation && !formData.address) {
      alert('Please enable location services or enter an address');
      return;
    }

    const sosData: Partial<SOSPost> = {
      userId: user?.id || '',
      userName: user?.name || '',
      title: formData.title,
      description: formData.description,
      urgency: formData.urgency,
      category: formData.category,
      location: userLocation || {
        latitude: 0,
        longitude: 0,
        address: formData.address,
      },
      expiryTimestamp: calculateExpiry(formData.urgency),
      status: 'active',
      tags: formData.tags,
      contactInfo: {
        phone: formData.contactPhone,
        email: formData.contactEmail,
      },
    };

    onSubmit(sosData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create SOS Request</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your emergency"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of what you need help with..."
              />
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {urgencyLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: level.value as any }))}
                    className={`p-2 rounded-md border-2 text-sm font-medium transition-all ${
                      formData.urgency === level.value
                        ? `${level.color} border-${level.color.split('-')[1]}-300`
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              {locationError ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-green-600">📍 Using your current location</p>
              )}
            </div>

            {/* Broadcast Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broadcast Radius: {formData.radius} km
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={formData.radius}
                onChange={(e) => setFormData(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1km</span>
                <span>50km</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contact Information (Optional)
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="Phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Expiry Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                ⏰ This SOS will expire in {' '}
                {formData.urgency === 'critical' ? '2 hours' :
                 formData.urgency === 'high' ? '6 hours' :
                 formData.urgency === 'medium' ? '12 hours' : '24 hours'}
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Send SOS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};