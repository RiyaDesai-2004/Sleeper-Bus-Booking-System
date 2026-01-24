import { useState } from 'react';
import { SearchFlow } from './components/SearchFlow';
import { SeatSelection } from './components/SeatSelection';
import { MealSelection } from './components/MealSelection';
import { PassengerDetails } from './components/PassengerDetails';
import { BookingConfirmation } from './components/BookingConfirmation';
import { MyBookings } from './components/MyBookings';

export type BookingStep = 'search' | 'seats' | 'meals' | 'details' | 'confirmation' | 'mybookings';

export interface SearchData {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface SeatData {
  selectedSeats: string[];
  totalPrice: number;
}

export interface MealData {
  selectedMeals: { [key: string]: string };
  totalMealPrice: number;
}

export interface PassengerData {
  passengers: Array<{
    name: string;
    age: string;
    gender: string;
  }>;
  contact: {
    email: string;
    phone: string;
  };
}

export interface Booking {
  id: string;
  searchData: SearchData;
  seatData: SeatData;
  mealData: MealData;
  passengerData: PassengerData;
  confirmationProbability: number;
  status: 'confirmed' | 'cancelled';
  bookingDate: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('search');
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [seatData, setSeatData] = useState<SeatData | null>(null);
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const handleSearchSubmit = (data: SearchData) => {
    setSearchData(data);
    setCurrentStep('seats');
  };

  const handleSeatSelection = (data: SeatData) => {
    setSeatData(data);
    setCurrentStep('meals');
  };

  const handleMealSelection = (data: MealData) => {
    setMealData(data);
    setCurrentStep('details');
  };

  const handlePassengerDetails = (data: PassengerData) => {
    setPassengerData(data);
    
    // Calculate confirmation probability (mock prediction logic)
    const probability = calculateConfirmationProbability();
    
    const newBooking: Booking = {
      id: `BKG${Date.now()}`,
      searchData: searchData!,
      seatData: seatData!,
      mealData: mealData!,
      passengerData: data,
      confirmationProbability: probability,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
    };
    
    setCurrentBooking(newBooking);
    setBookings([...bookings, newBooking]);
    setCurrentStep('confirmation');
  };

  const calculateConfirmationProbability = (): number => {
    // Mock prediction based on various factors
    const baseProb = 85;
    const dateBonus = searchData ? (new Date(searchData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24) > 7 ? 10 : 5 : 0;
    const seatBonus = seatData && seatData.selectedSeats.length <= 2 ? 5 : 0;
    
    return Math.min(baseProb + dateBonus + seatBonus, 98);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    ));
  };

  const handleNewBooking = () => {
    setCurrentStep('search');
    setSearchData(null);
    setSeatData(null);
    setMealData(null);
    setPassengerData(null);
    setCurrentBooking(null);
  };

  const handleViewBookings = () => {
    setCurrentStep('mybookings');
  };

  const handleBackToHome = () => {
    setCurrentStep('search');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentStep === 'search' && (
        <SearchFlow 
          onSubmit={handleSearchSubmit} 
          onViewBookings={handleViewBookings}
        />
      )}
      {currentStep === 'seats' && searchData && (
        <SeatSelection
          searchData={searchData}
          onNext={handleSeatSelection}
          onBack={handleBackToHome}
        />
      )}
      {currentStep === 'meals' && seatData && (
        <MealSelection
          seatData={seatData}
          onNext={handleMealSelection}
          onBack={() => setCurrentStep('seats')}
        />
      )}
      {currentStep === 'details' && (
        <PassengerDetails
          numberOfPassengers={searchData?.passengers || 1}
          onNext={handlePassengerDetails}
          onBack={() => setCurrentStep('meals')}
        />
      )}
      {currentStep === 'confirmation' && currentBooking && (
        <BookingConfirmation
          booking={currentBooking}
          onNewBooking={handleNewBooking}
          onViewBookings={handleViewBookings}
        />
      )}
      {currentStep === 'mybookings' && (
        <MyBookings
          bookings={bookings}
          onCancel={handleCancelBooking}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
