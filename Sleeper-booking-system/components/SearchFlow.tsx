import { useState } from 'react';
import { Bus, Calendar, MapPin, Users, Ticket } from 'lucide-react';
import type { SearchData } from '../App';
import { getAllStations } from '../utils/pricing';

interface SearchFlowProps {
  onSubmit: (data: SearchData) => void;
  onViewBookings: () => void;
}

const stations = getAllStations();

export function SearchFlow({ onSubmit, onViewBookings }: SearchFlowProps) {
  const [from, setFrom] = useState('Ahmedabad');
  const [to, setTo] = useState('Mumbai');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that from and to are different
    if (from === to) {
      setError('Origin and destination cannot be the same station');
      return;
    }
    
    // Validate that destination comes after origin in the route
    const fromIndex = stations.indexOf(from);
    const toIndex = stations.indexOf(to);
    
    if (fromIndex >= toIndex) {
      setError('Please select a valid route. Destination must come after origin.');
      return;
    }
    
    setError('');
    if (from && to && date && passengers) {
      onSubmit({ from, to, date, passengers });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Bus className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SleepRide</h1>
                <p className="text-sm text-gray-500">Premium Sleeper Bus Service</p>
              </div>
            </div>
            <button
              onClick={onViewBookings}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Ticket size={20} />
              <span className="font-medium">My Bookings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Travel in Comfort
            </h2>
            <p className="text-xl text-gray-600">
              Book your sleeper bus journey with complimentary meals
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={18} className="text-indigo-600" />
                    From
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    {stations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin size={18} className="text-indigo-600" />
                    To
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    {stations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar size={18} className="text-indigo-600" />
                    Journey Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users size={18} className="text-indigo-600" />
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Search Buses
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bus className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comfortable Sleeper Seats</h3>
              <p className="text-sm text-gray-600">Premium sleeper berths for a restful journey</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Meal Service</h3>
              <p className="text-sm text-gray-600">Choose from variety of delicious meals</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-sm text-gray-600">Quick and hassle-free reservation process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}