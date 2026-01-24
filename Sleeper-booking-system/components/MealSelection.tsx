import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import type { SeatData, MealData } from '../App';

interface MealSelectionProps {
  seatData: SeatData;
  onNext: (data: MealData) => void;
  onBack: () => void;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'veg' | 'non-veg';
  image: string;
}

const meals: Meal[] = [
  {
    id: 'none',
    name: 'No Meal',
    description: 'Skip meal service',
    price: 0,
    type: 'veg',
    image: '🚫',
  },
  {
    id: 'veg-thali',
    name: 'Vegetarian Thali',
    description: 'Dal, Roti, Rice, Sabzi, Pickle & Sweet',
    price: 150,
    type: 'veg',
    image: '🥗',
  },
  {
    id: 'punjabi-meal',
    name: 'Punjabi Meal',
    description: 'Paneer Butter Masala, Naan, Rice & Raita',
    price: 180,
    type: 'veg',
    image: '🍛',
  },
  {
    id: 'south-indian',
    name: 'South Indian Combo',
    description: 'Idli, Dosa, Sambhar & Chutney',
    price: 140,
    type: 'veg',
    image: '🥞',
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Aromatic chicken biryani with raita',
    price: 220,
    type: 'non-veg',
    image: '🍗',
  },
  {
    id: 'sandwich-combo',
    name: 'Sandwich Combo',
    description: 'Grilled sandwich with chips & drink',
    price: 120,
    type: 'veg',
    image: '🥪',
  },
];

export function MealSelection({ seatData, onNext, onBack }: MealSelectionProps) {
  const [selectedMeals, setSelectedMeals] = useState<{ [key: string]: string }>(
    Object.fromEntries(seatData.selectedSeats.map(seat => [seat, 'none']))
  );

  const handleMealSelect = (seatId: string, mealId: string) => {
    setSelectedMeals({
      ...selectedMeals,
      [seatId]: mealId,
    });
  };

  const getTotalMealPrice = () => {
    return Object.values(selectedMeals).reduce((total, mealId) => {
      const meal = meals.find(m => m.id === mealId);
      return total + (meal?.price || 0);
    }, 0);
  };

  const handleContinue = () => {
    onNext({
      selectedMeals,
      totalMealPrice: getTotalMealPrice(),
    });
  };

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
            Back to Seats
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Meals</h2>
          <p className="text-gray-600">
            Choose a meal for each passenger
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meal Selection */}
          <div className="lg:col-span-2 space-y-6">
            {seatData.selectedSeats.map((seatId, index) => (
              <div key={seatId} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Passenger {index + 1} - Seat {seatId}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meals.map((meal) => (
                    <button
                      key={meal.id}
                      onClick={() => handleMealSelect(seatId, meal.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                        selectedMeals[seatId] === meal.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {selectedMeals[seatId] === meal.id && (
                        <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{meal.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{meal.name}</h4>
                            {meal.type === 'veg' && meal.id !== 'none' && (
                              <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                              </span>
                            )}
                            {meal.type === 'non-veg' && (
                              <span className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                          <p className="font-semibold text-indigo-600">
                            {meal.price === 0 ? 'Free' : `₹${meal.price}`}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {/* Seat Summary */}
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-2">Seats</p>
                  <div className="flex justify-between">
                    <span>{seatData.selectedSeats.join(', ')}</span>
                    <span className="font-semibold">₹{seatData.totalPrice}</span>
                  </div>
                </div>

                {/* Meal Summary */}
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-3">Meals</p>
                  <div className="space-y-2">
                    {Object.entries(selectedMeals).map(([seatId, mealId]) => {
                      const meal = meals.find(m => m.id === mealId);
                      if (!meal || meal.price === 0) return null;
                      return (
                        <div key={seatId} className="flex justify-between text-sm">
                          <span className="text-gray-700">{meal.name}</span>
                          <span>₹{meal.price}</span>
                        </div>
                      );
                    })}
                    {getTotalMealPrice() === 0 && (
                      <p className="text-sm text-gray-500">No meals selected</p>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Grand Total</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{seatData.totalPrice + getTotalMealPrice()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Continue to Details
              </button>

              <button
                onClick={() => {
                  const noMeals = Object.fromEntries(
                    seatData.selectedSeats.map(seat => [seat, 'none'])
                  );
                  setSelectedMeals({ ...noMeals });
                  // Force a re-render and show visual feedback
                }}
                className="w-full mt-3 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Skip All Meals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}