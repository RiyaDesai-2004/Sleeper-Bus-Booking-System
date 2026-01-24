import { ArrowLeft, Calendar, MapPin, Users, Utensils, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import type { Booking } from '../App';

interface MyBookingsProps {
  bookings: Booking[];
  onCancel: (bookingId: string) => void;
  onBack: () => void;
}

export function MyBookings({ bookings, onCancel, onBack }: MyBookingsProps) {
  const handleCancel = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      onCancel(bookingId);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          </div>

          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <AlertCircle size={48} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
            <button
              onClick={onBack}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Book Your First Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <p className="text-gray-600">Manage your bus reservations</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-indigo-600">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => {
            const totalAmount = booking.seatData.totalPrice + booking.mealData.totalMealPrice;
            const journeyDate = new Date(booking.searchData.date);
            const isUpcoming = journeyDate > new Date();

            return (
              <div
                key={booking.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  booking.status === 'cancelled' ? 'opacity-60' : ''
                }`}
              >
                {/* Status Banner */}
                <div
                  className={`px-6 py-2 flex items-center justify-between ${
                    booking.status === 'cancelled'
                      ? 'bg-red-50'
                      : isUpcoming
                      ? 'bg-green-50'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {booking.status === 'cancelled' ? (
                      <>
                        <XCircle size={18} className="text-red-600" />
                        <span className="font-semibold text-red-600">Cancelled</span>
                      </>
                    ) : isUpcoming ? (
                      <>
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="font-semibold text-green-600">Confirmed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} className="text-gray-600" />
                        <span className="font-semibold text-gray-600">Completed</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Booking ID: <span className="font-mono font-semibold">{booking.id}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Journey Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <MapPin size={20} className="text-indigo-600" />
                            <div>
                              <p className="font-bold text-xl text-gray-900">
                                {booking.searchData.from} → {booking.searchData.to}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar size={18} className="text-gray-600" />
                            <p className="text-gray-700">
                              {journeyDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Passengers */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Users size={18} className="text-indigo-600" />
                          Passengers & Seats
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {booking.passengerData.passengers.map((passenger, index) => {
                            const seatId = booking.seatData.selectedSeats[index];
                            const mealId = booking.mealData.selectedMeals[seatId];
                            
                            return (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="font-semibold text-gray-900">{passenger.name}</p>
                                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                                    {seatId}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-xs">
                                  {passenger.age} years • {passenger.gender}
                                </p>
                                {mealId !== 'none' && (
                                  <div className="flex items-center gap-1 mt-1 text-gray-600">
                                    <Utensils size={12} />
                                    <span className="text-xs">Meal included</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Contact:</strong> {booking.passengerData.contact.email} •{' '}
                          {booking.passengerData.contact.phone}
                        </p>
                      </div>
                    </div>

                    {/* Summary & Actions */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                        <div className="space-y-2 text-sm mb-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Seats</span>
                            <span>₹{booking.seatData.totalPrice}</span>
                          </div>
                          {booking.mealData.totalMealPrice > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Meals</span>
                              <span>₹{booking.mealData.totalMealPrice}</span>
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-indigo-600">₹{totalAmount}</span>
                        </div>
                      </div>

                      {/* Prediction Badge */}
                      <div className={`p-3 rounded-lg mb-4 text-center ${
                        booking.confirmationProbability >= 90
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <p className="text-xs text-gray-600 mb-1">Confirmation Probability</p>
                        <p className={`text-2xl font-bold ${
                          booking.confirmationProbability >= 90 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {booking.confirmationProbability}%
                        </p>
                      </div>

                      {/* Actions */}
                      {booking.status === 'confirmed' && isUpcoming && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle size={18} />
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
