import { useState } from 'react';
import { ArrowLeft, Info, MapPin } from 'lucide-react';
import type { SearchData, SeatData } from '../App';
import { calculateSeatPrice, getIntermediateStations, getDistance } from '../utils/pricing';

interface SeatSelectionProps {
  searchData: SearchData;
  onNext: (data: SeatData) => void;
  onBack: () => void;
}

type SeatStatus = 'available' | 'selected' | 'booked' | 'female';

interface Seat {
  id: string;
  status: SeatStatus;
  price: number;
  level: 'lower' | 'upper';
}

export function SeatSelection({ searchData, onNext, onBack }: SeatSelectionProps) {
  const seatPrice = calculateSeatPrice(searchData.from, searchData.to);
  const [seats] = useState<Seat[]>(generateSeats(seatPrice));
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  function generateSeats(price: number): Seat[] {
    const seatLayout: Seat[] = [];
    const bookedSeats = ['L1', 'L5', 'U3', 'U8', 'L12', 'U15'];
    const femaleSeats = ['L3', 'U4'];

    // Lower berths (16 seats)
    for (let i = 1; i <= 16; i++) {
      const seatId = `L${i}`;
      seatLayout.push({
        id: seatId,
        status: bookedSeats.includes(seatId) ? 'booked' : femaleSeats.includes(seatId) ? 'female' : 'available',
        price: price,
        level: 'lower',
      });
    }

    // Upper berths (16 seats)
    for (let i = 1; i <= 16; i++) {
      const seatId = `U${i}`;
      seatLayout.push({
        id: seatId,
        status: bookedSeats.includes(seatId) ? 'booked' : femaleSeats.includes(seatId) ? 'female' : 'available',
        price: price,
        level: 'upper',
      });
    }

    return seatLayout;
  }

  const handleSeatClick = (seatId: string, status: SeatStatus) => {
    if (status === 'booked') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < searchData.passengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === searchData.passengers) {
      onNext({
        selectedSeats,
        totalPrice: selectedSeats.length * seatPrice,
      });
    }
  };

  const getSeatStyle = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) {
      return 'bg-green-500 text-white border-green-600 cursor-pointer hover:bg-green-600';
    }
    if (seat.status === 'booked') {
      return 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed';
    }
    if (seat.status === 'female') {
      return 'bg-pink-100 text-pink-700 border-pink-300 cursor-pointer hover:bg-pink-200';
    }
    return 'bg-white text-gray-700 border-gray-300 cursor-pointer hover:bg-gray-50';
  };

  const lowerSeats = seats.filter(s => s.level === 'lower');
  const upperSeats = seats.filter(s => s.level === 'upper');
  const routeStations = getIntermediateStations(searchData.from, searchData.to);
  const distance = getDistance(searchData.from, searchData.to);

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
            Back to Search
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Seats</h2>
              <p className="text-gray-600">
                {searchData.from} → {searchData.to} | {new Date(searchData.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="text-2xl font-bold text-indigo-600">{searchData.passengers}</p>
            </div>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Your Journey Route</h3>
            <span className="ml-auto text-sm text-gray-600">{distance} km</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {routeStations.map((station, index) => (
              <div key={station} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 || index === routeStations.length - 1 
                      ? 'bg-indigo-600' 
                      : 'bg-gray-300'
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
                  <div className="w-12 h-0.5 bg-gray-300 mx-1 mb-5"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Layout */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6 bg-blue-50 p-3 rounded-lg">
              <Info size={20} className="text-blue-600" />
              <p className="text-sm text-gray-700">
                Select {searchData.passengers} seat{searchData.passengers > 1 ? 's' : ''} to continue
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 border-2 border-green-600 rounded"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded"></div>
                <span className="text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 border-2 border-pink-300 rounded"></div>
                <span className="text-sm">Female Reserved</span>
              </div>
            </div>

            {/* Lower Berths */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Lower Berths</h3>
              <div className="grid grid-cols-4 gap-3">
                {lowerSeats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.status)}
                    disabled={seat.status === 'booked'}
                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${getSeatStyle(seat)}`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Upper Berths */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Upper Berths</h3>
              <div className="grid grid-cols-4 gap-3">
                {upperSeats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.status)}
                    disabled={seat.status === 'booked'}
                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${getSeatStyle(seat)}`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected Seats:</span>
                  <span className="font-semibold">
                    {selectedSeats.length}/{searchData.passengers}
                  </span>
                </div>
                
                {selectedSeats.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Your Seats:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seatId => (
                        <span key={seatId} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                          {seatId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Seat Price:</span>
                    <span>₹{seatPrice} × {selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-indigo-600">₹{selectedSeats.length * seatPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={selectedSeats.length !== searchData.passengers}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue to Meals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}