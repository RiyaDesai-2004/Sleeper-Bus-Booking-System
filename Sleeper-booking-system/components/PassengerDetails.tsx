import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone } from 'lucide-react';
import type { PassengerData } from '../App';

interface PassengerDetailsProps {
  numberOfPassengers: number;
  onNext: (data: PassengerData) => void;
  onBack: () => void;
}

export function PassengerDetails({ numberOfPassengers, onNext, onBack }: PassengerDetailsProps) {
  const [passengers, setPassengers] = useState(
    Array(numberOfPassengers).fill(null).map(() => ({
      name: '',
      age: '',
      gender: 'male',
    }))
  );
  
  const [contact, setContact] = useState({
    email: '',
    phone: '',
  });

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ passengers, contact });
  };

  const isFormValid = () => {
    const passengersValid = passengers.every(p => p.name && p.age && p.gender);
    const contactValid = contact.email && contact.phone;
    return passengersValid && contactValid;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Meals
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Passenger Details</h2>
          <p className="text-gray-600">
            Please provide information for all passengers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Passenger Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-indigo-600" />
              Passenger Information
            </h3>

            <div className="space-y-6">
              {passengers.map((passenger, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Passenger {index + 1}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        placeholder="Age"
                        min="1"
                        max="120"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="male"
                            checked={passenger.gender === 'male'}
                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="female"
                            checked={passenger.gender === 'female'}
                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span>Female</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="other"
                            checked={passenger.gender === 'other'}
                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                            className="w-4 h-4 text-indigo-600"
                          />
                          <span>Other</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Mail size={20} className="text-indigo-600" />
              Contact Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Booking confirmation will be sent to this email
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  pattern="[0-9+\s-]+"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  For booking updates and notifications
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 text-indigo-600 rounded"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions and cancellation policy. I understand that the booking confirmation is subject to availability.
              </span>
            </label>

            <button
              type="submit"
              disabled={!isFormValid()}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Confirmation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
