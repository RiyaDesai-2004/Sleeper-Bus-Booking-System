import { CheckCircle, Download, Share2, TrendingUp, Calendar, MapPin, Users, Utensils } from 'lucide-react';
import type { Booking } from '../App';
import { getIntermediateStations, getDistance } from '../utils/pricing';

interface BookingConfirmationProps {
  booking: Booking;
  onNewBooking: () => void;
  onViewBookings: () => void;
}

export function BookingConfirmation({ booking, onNewBooking, onViewBookings }: BookingConfirmationProps) {
  const totalAmount = booking.seatData.totalPrice + booking.mealData.totalMealPrice;
  const routeStations = getIntermediateStations(booking.searchData.from, booking.searchData.to);
  const distance = getDistance(booking.searchData.from, booking.searchData.to);

  const getPredictionColor = (probability: number) => {
    if (probability >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (probability >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  const getPredictionMessage = (probability: number) => {
    if (probability >= 90) return 'High confidence - Your booking is highly likely to be confirmed';
    if (probability >= 75) return 'Good confidence - Your booking has a strong chance of confirmation';
    return 'Moderate confidence - Your booking may be subject to availability';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your reservation has been confirmed
          </p>
          <p className="text-sm text-gray-500">
            Booking ID: <span className="font-mono font-semibold text-indigo-600">{booking.id}</span>
          </p>
        </div>

        {/* AI Prediction */}
        <div className={`rounded-lg shadow-md p-6 mb-6 border-2 ${getPredictionColor(booking.confirmationProbability)}`}>
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg">
              <TrendingUp size={32} className={booking.confirmationProbability >= 90 ? 'text-green-600' : booking.confirmationProbability >= 75 ? 'text-blue-600' : 'text-orange-600'} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Confirmation Prediction</h3>
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl font-bold">
                    {booking.confirmationProbability}%
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          booking.confirmationProbability >= 90 ? 'bg-green-600' :
                          booking.confirmationProbability >= 75 ? 'bg-blue-600' : 'bg-orange-600'
                        }`}
                        style={{ width: `${booking.confirmationProbability}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                {getPredictionMessage(booking.confirmationProbability)}
              </p>
              <div className="mt-3 text-xs opacity-75">
                <p>Based on historical data including:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Current seat availability patterns</li>
                  <li>Booking lead time ({Math.ceil((new Date(booking.searchData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days in advance)</li>
                  <li>Route demand analytics</li>
                  <li>Seasonal trends and historical confirmation rates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-indigo-600" />
            Journey Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin size={20} className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold">{booking.searchData.from} → {booking.searchData.to}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar size={20} className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">
                  {new Date(booking.searchData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
          
          {/* Route Visualization */}
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Journey Route ({distance} km)</p>
              <p className="text-xs text-gray-600">{routeStations.length} stops</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {routeStations.map((station, index) => (
                <div key={station} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 || index === routeStations.length - 1 
                        ? 'bg-indigo-600' 
                        : 'bg-gray-400'
                    }`}></div>
                    <p className={`text-xs mt-2 whitespace-nowrap ${
                      index === 0 || index === routeStations.length - 1 
                        ? 'font-semibold text-gray-900' 
                        : 'text-gray-600'
                    }`}>
                      {station}
                    </p>
                  </div>
                  {index < routeStations.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-400 mx-1 mb-5"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seat Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            Seat & Passenger Details
          </h3>
          <div className="space-y-3">
            {booking.passengerData.passengers.map((passenger, index) => {
              const seatId = booking.seatData.selectedSeats[index];
              const mealId = booking.mealData.selectedMeals[seatId];
              const mealNames: { [key: string]: string } = {
                'none': 'No Meal',
                'veg-thali': 'Vegetarian Thali',
                'punjabi-meal': 'Punjabi Meal',
                'south-indian': 'South Indian Combo',
                'chicken-biryani': 'Chicken Biryani',
                'sandwich-combo': 'Sandwich Combo',
              };
              
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{passenger.name}</p>
                      <p className="text-sm text-gray-600">
                        {passenger.age} years • {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Seat</p>
                      <p className="font-semibold text-indigo-600">{seatId}</p>
                    </div>
                  </div>
                  {mealId !== 'none' && (
                    <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-2 text-sm">
                      <Utensils size={16} className="text-gray-600" />
                      <span className="text-gray-700">{mealNames[mealId]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{booking.passengerData.contact.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{booking.passengerData.contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Seat Charges ({booking.seatData.selectedSeats.length} seats)</span>
              <span>₹{booking.seatData.totalPrice}</span>
            </div>
            {booking.mealData.totalMealPrice > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Meal Charges</span>
                <span>₹{booking.mealData.totalMealPrice}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-indigo-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onNewBooking}
            className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            New Booking
          </button>
          <button
            onClick={onViewBookings}
            className="bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            My Bookings
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            <Download size={20} />
            Download Ticket
          </button>
        </div>

        {/* Important Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Please arrive at the boarding point 15 minutes before departure. Carry a valid ID proof for verification.
          </p>
        </div>
      </div>
    </div>
  );
}