# SleepRide - Sleeper Bus Booking System

## Project Overview
SleepRide is a comprehensive web-based sleeper bus booking service operating between Ahmedabad and Mumbai with multiple intermediate stations. The system features an integrated meal booking service as part of the checkout process and includes an AI-powered booking confirmation prediction system.

## Prototype Link
**Live Prototype:** This is a fully functional web application built with React, TypeScript, and Tailwind CSS. Deploy this codebase to view the interactive prototype.

---

## Part 1: Product & Quality Assurance

### Core Features

#### 1. **Multi-Station Route Search**
- Search functionality with source and destination selection
- Date picker with future date validation
- Passenger count selection (1-6 passengers)
- Support for intermediate stations: Ahmedabad → Nadiad → Anand → Vadodara → Bharuch → Surat → Vapi → Mumbai

#### 2. **Interactive Seat Selection**
- Visual seat layout with lower and upper berths (32 total seats: 16 lower, 16 upper)
- Real-time seat availability display
- Different seat categories:
  - Available seats
  - Booked seats (disabled)
  - Female-reserved seats
  - Selected seats
- Dynamic pricing based on seat selection
- Validation to match passenger count with seat selection

#### 3. **Integrated Meal Booking Service**
- Per-passenger meal selection
- Variety of meal options:
  - No Meal (Free)
  - Vegetarian Thali (₹150)
  - Punjabi Meal (₹180)
  - South Indian Combo (₹140)
  - Chicken Biryani (₹220)
  - Sandwich Combo (₹120)
- Vegetarian and Non-vegetarian indicators
- Option to skip meals
- Real-time price calculation

#### 4. **Passenger Management**
- Detailed passenger information collection:
  - Full name
  - Age (with validation)
  - Gender (Male/Female/Other)
- Contact information:
  - Email address
  - Phone number
- Terms and conditions acceptance

#### 5. **AI-Powered Confirmation Prediction**
- Machine learning-based booking confirmation probability
- Factors considered:
  - Booking lead time
  - Seat availability patterns
  - Number of seats selected
  - Historical confirmation rates
  - Route demand analytics
  - Seasonal trends
- Visual probability display with color-coded confidence levels:
  - 90%+: High confidence (Green)
  - 75-89%: Good confidence (Blue)
  - <75%: Moderate confidence (Orange)

#### 6. **Booking Confirmation System**
- Unique booking ID generation
- Comprehensive booking summary
- Journey details display
- Passenger and seat mapping
- Meal selections per passenger
- Payment breakdown
- Download ticket option (UI ready)

#### 7. **Booking Management**
- View all bookings
- Booking status indicators:
  - Confirmed (Upcoming journeys)
  - Completed (Past journeys)
  - Cancelled
- Cancel booking functionality with confirmation dialog
- Booking history with complete details

### Test Cases

#### Functional Test Cases

1. **Search Flow**
   - ✓ Test case: User selects source, destination, date, and passenger count
   - Expected: System accepts valid inputs and navigates to seat selection
   - Edge case: Same source and destination
   - Edge case: Past date selection (should be blocked)
   - Edge case: More than 6 passengers (should be limited)

2. **Seat Selection**
   - ✓ Test case: User selects seats equal to passenger count
   - Expected: Continue button enables and proceeds to meal selection
   - Edge case: Clicking on already booked seats (should not select)
   - Edge case: Trying to select more seats than passenger count (should limit)
   - Edge case: Deselecting seats and reselecting
   - Validation: User must select exact number of seats matching passenger count

3. **Meal Selection**
   - ✓ Test case: User selects different meals for each passenger
   - Expected: Total price updates correctly, proceeds to details
   - Edge case: Skipping all meals (₹0 meal cost)
   - Edge case: Selecting most expensive meal for all passengers
   - Validation: Each passenger must have a meal option selected (including "No Meal")

4. **Passenger Details**
   - ✓ Test case: User enters valid passenger information
   - Expected: Form accepts input and proceeds to confirmation
   - Edge case: Invalid email format (should show validation)
   - Edge case: Invalid phone number
   - Edge case: Age out of reasonable range (1-120)
   - Edge case: Empty required fields (should prevent submission)

5. **Booking Confirmation**
   - ✓ Test case: Complete booking flow
   - Expected: Unique booking ID generated, confirmation shown with prediction
   - Validation: All booking details match user selections
   - Validation: Total amount calculated correctly
   - Validation: Prediction percentage between 0-100%

6. **Booking Management**
   - ✓ Test case: View all bookings
   - Expected: All bookings displayed with correct status
   - ✓ Test case: Cancel upcoming booking
   - Expected: Booking status changes to cancelled
   - Edge case: Attempting to cancel past booking (option should not appear)
   - Edge case: Cancelled booking should show cancelled status

7. **Navigation Flow**
   - ✓ Test case: Back button functionality at each step
   - Expected: Previous step data retained, user can modify
   - ✓ Test case: Starting new booking from confirmation
   - Expected: All form data reset

#### UI/UX Validation Test Cases

1. **Responsive Design**
   - Desktop view (>1024px): Multi-column layouts
   - Tablet view (768-1024px): Adjusted grid layouts
   - Mobile view (<768px): Single column stack

2. **Visual Feedback**
   - Loading states for data operations
   - Hover effects on interactive elements
   - Active/selected state indicators
   - Disabled state styling
   - Error message display

3. **Accessibility**
   - Form labels properly associated
   - Required field indicators
   - Color contrast compliance
   - Keyboard navigation support
   - Screen reader compatibility

4. **User Flow**
   - Clear progress indication
   - Consistent navigation patterns
   - Helpful placeholder text
   - Informative error messages
   - Confirmation dialogs for destructive actions

#### Edge Cases

1. **Data Validation**
   - Empty form submissions
   - Special characters in names
   - Very long input strings
   - Phone numbers with various formats (+91, spaces, dashes)
   - Email validation (format check)

2. **Seat Selection**
   - All seats booked scenario
   - Single seat available for multiple passengers
   - Female-reserved seats for male passengers
   - Rapid clicking on seats

3. **Date Selection**
   - Selecting today's date (should work)
   - Selecting date far in future (affects prediction)
   - Date in the past (should be blocked)

4. **Booking Management**
   - No bookings yet (empty state)
   - Multiple bookings on same date
   - Booking after cancellation

5. **Price Calculation**
   - Zero meals selected
   - All expensive meals
   - Multiple passengers with different meals
   - Floating point precision in calculations

---

## Part 2: UI/UX Design

### Design System

#### Color Palette
- **Primary:** Indigo (#4F46E5)
- **Secondary:** Gray shades
- **Success:** Green (#10B981)
- **Warning:** Orange (#F59E0B)
- **Error:** Red (#EF4444)
- **Background:** Blue-Indigo gradient

#### Typography
- Font Family: System fonts (optimized for performance)
- Headings: Bold weights
- Body: Regular weight
- Labels: Medium weight

#### Components
- **Cards:** White background with shadow and rounded corners
- **Buttons:** Solid primary color with hover states
- **Forms:** Clean input fields with focus states
- **Icons:** Lucide React icon library

#### Layout
- Maximum content width: 1280px
- Consistent spacing: 4px, 8px, 16px, 24px, 32px
- Grid-based layouts for responsive design

### User Flow
1. **Landing Page** → Search form with route, date, passengers
2. **Seat Selection** → Visual seat map with availability
3. **Meal Selection** → Per-passenger meal options
4. **Passenger Details** → Information collection
5. **Confirmation** → Booking summary with AI prediction
6. **My Bookings** → Booking management

---

## Part 3: Backend Development (API Design)

### API Endpoints

#### 1. GET /api/stations
**Description:** Retrieve list of all stations

**Response:**
```json
{
  "stations": [
    { "id": "AHM", "name": "Ahmedabad", "order": 1 },
    { "id": "NAD", "name": "Nadiad", "order": 2 },
    { "id": "ANA", "name": "Anand", "order": 3 },
    { "id": "VAD", "name": "Vadodara", "order": 4 },
    { "id": "BHA", "name": "Bharuch", "order": 5 },
    { "id": "SUR", "name": "Surat", "order": 6 },
    { "id": "VAP", "name": "Vapi", "order": 7 },
    { "id": "MUM", "name": "Mumbai", "order": 8 }
  ]
}
```

#### 2. GET /api/seats
**Description:** Retrieve seat availability for a specific route and date

**Query Parameters:**
- `from` (string, required): Source station code
- `to` (string, required): Destination station code
- `date` (string, required): Journey date (YYYY-MM-DD)

**Response:**
```json
{
  "busId": "BUS001",
  "route": {
    "from": "AHM",
    "to": "MUM",
    "date": "2026-02-01"
  },
  "seats": [
    {
      "id": "L1",
      "level": "lower",
      "status": "booked",
      "price": 1200,
      "reservedFor": null
    },
    {
      "id": "L2",
      "level": "lower",
      "status": "available",
      "price": 1200,
      "reservedFor": null
    },
    {
      "id": "L3",
      "level": "lower",
      "status": "available",
      "price": 1200,
      "reservedFor": "female"
    }
  ],
  "availableCount": 26,
  "totalSeats": 32
}
```

#### 3. GET /api/meals
**Description:** Retrieve available meal options

**Response:**
```json
{
  "meals": [
    {
      "id": "veg-thali",
      "name": "Vegetarian Thali",
      "description": "Dal, Roti, Rice, Sabzi, Pickle & Sweet",
      "price": 150,
      "type": "veg",
      "available": true
    },
    {
      "id": "chicken-biryani",
      "name": "Chicken Biryani",
      "description": "Aromatic chicken biryani with raita",
      "price": 220,
      "type": "non-veg",
      "available": true
    }
  ]
}
```

#### 4. POST /api/bookings
**Description:** Create a new booking

**Request Body:**
```json
{
  "route": {
    "from": "AHM",
    "to": "MUM",
    "date": "2026-02-01"
  },
  "seats": ["L2", "L4"],
  "passengers": [
    {
      "name": "John Doe",
      "age": 30,
      "gender": "male",
      "seatId": "L2",
      "mealId": "veg-thali"
    },
    {
      "name": "Jane Doe",
      "age": 28,
      "gender": "female",
      "seatId": "L4",
      "mealId": "punjabi-meal"
    }
  ],
  "contact": {
    "email": "john@example.com",
    "phone": "+91 98765 43210"
  }
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "BKG1737456789012",
  "status": "confirmed",
  "confirmationProbability": 92,
  "totalAmount": 2730,
  "breakdown": {
    "seatCharges": 2400,
    "mealCharges": 330,
    "taxes": 0
  },
  "message": "Booking confirmed successfully"
}
```

#### 5. GET /api/bookings/:bookingId
**Description:** Retrieve booking details

**Response:**
```json
{
  "bookingId": "BKG1737456789012",
  "status": "confirmed",
  "route": {
    "from": "AHM",
    "to": "MUM",
    "date": "2026-02-01"
  },
  "seats": ["L2", "L4"],
  "passengers": [...],
  "totalAmount": 2730,
  "bookingDate": "2026-01-21T10:30:00Z",
  "confirmationProbability": 92
}
```

#### 6. PUT /api/bookings/:bookingId/cancel
**Description:** Cancel an existing booking

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "BKG1737456789012",
  "status": "cancelled",
  "refundAmount": 2457,
  "refundPercentage": 90,
  "message": "Booking cancelled successfully"
}
```

#### 7. GET /api/bookings/user/:email
**Description:** Retrieve all bookings for a user

**Query Parameters:**
- `status` (string, optional): Filter by status (confirmed, cancelled, completed)

**Response:**
```json
{
  "bookings": [
    {
      "bookingId": "BKG1737456789012",
      "status": "confirmed",
      "route": {...},
      "date": "2026-02-01",
      "totalAmount": 2730
    }
  ],
  "total": 1
}
```

#### 8. GET /api/availability/check
**Description:** Check seat availability before booking

**Query Parameters:**
- `from` (string, required)
- `to` (string, required)
- `date` (string, required)
- `seats` (array of strings, required): Seat IDs to check

**Response:**
```json
{
  "available": true,
  "seats": {
    "L2": { "available": true, "price": 1200 },
    "L4": { "available": true, "price": 1200 }
  },
  "lockedUntil": "2026-01-21T10:45:00Z"
}
```

#### 9. POST /api/prediction/confirmation
**Description:** Get confirmation probability prediction

**Request Body:**
```json
{
  "route": {
    "from": "AHM",
    "to": "MUM",
    "date": "2026-02-01"
  },
  "seatCount": 2,
  "bookingLeadDays": 11
}
```

**Response:**
```json
{
  "probability": 92,
  "confidence": "high",
  "factors": {
    "leadTime": 10,
    "seatCount": 5,
    "routeDemand": 3,
    "seasonalTrend": 2
  },
  "message": "High confidence - Your booking is highly likely to be confirmed"
}
```

### Database Schema

#### Tables

**1. stations**
```sql
CREATE TABLE stations (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**2. buses**
```sql
CREATE TABLE buses (
  id VARCHAR(20) PRIMARY KEY,
  registration_number VARCHAR(50) NOT NULL,
  total_seats INT NOT NULL,
  type VARCHAR(20) DEFAULT 'sleeper',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**3. seats**
```sql
CREATE TABLE seats (
  id VARCHAR(10) PRIMARY KEY,
  bus_id VARCHAR(20) NOT NULL,
  seat_number VARCHAR(10) NOT NULL,
  level VARCHAR(10) NOT NULL, -- 'lower' or 'upper'
  reserved_for VARCHAR(20), -- 'female' or NULL
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (bus_id) REFERENCES buses(id)
);
```

**4. bookings**
```sql
CREATE TABLE bookings (
  id VARCHAR(50) PRIMARY KEY,
  bus_id VARCHAR(20) NOT NULL,
  from_station VARCHAR(10) NOT NULL,
  to_station VARCHAR(10) NOT NULL,
  journey_date DATE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed',
  contact_email VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  confirmation_probability INT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bus_id) REFERENCES buses(id),
  FOREIGN KEY (from_station) REFERENCES stations(id),
  FOREIGN KEY (to_station) REFERENCES stations(id)
);
```

**5. passengers**
```sql
CREATE TABLE passengers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  seat_id VARCHAR(10) NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

**6. meals**
```sql
CREATE TABLE meals (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'veg' or 'non-veg'
  available BOOLEAN DEFAULT TRUE
);
```

**7. passenger_meals**
```sql
CREATE TABLE passenger_meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  passenger_id INT NOT NULL,
  meal_id VARCHAR(50) NOT NULL,
  FOREIGN KEY (passenger_id) REFERENCES passengers(id),
  FOREIGN KEY (meal_id) REFERENCES meals(id)
);
```

**8. booking_history**
```sql
CREATE TABLE booking_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason TEXT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

---

## Part 4: Data Science & Prediction

### Confirmation Booking Prediction

#### Approach
The confirmation prediction system uses a **weighted scoring model** based on historical booking data and real-time factors. This approach is chosen for its:
- Interpretability and transparency
- Real-time performance
- Ability to incorporate domain knowledge
- Ease of updating with new factors

#### Model Details

**Algorithm:** Weighted Multi-Factor Scoring Model

**Factors and Weights:**

1. **Booking Lead Time (40% weight)**
   - Definition: Days between booking and journey date
   - Impact: More advance booking = higher confirmation probability
   - Scoring:
     - 0-3 days: +0 points
     - 4-7 days: +5 points
     - 8-14 days: +10 points
     - 15+ days: +15 points

2. **Seat Count (20% weight)**
   - Definition: Number of seats in booking
   - Impact: Fewer seats = higher confirmation probability
   - Scoring:
     - 1-2 seats: +5 points
     - 3-4 seats: +3 points
     - 5-6 seats: +1 point

3. **Route Demand (20% weight)**
   - Definition: Historical booking density for route
   - Impact: Based on historical confirmation rates
   - Scoring:
     - Low demand routes: +5 points
     - Medium demand routes: +3 points
     - High demand routes: +1 point

4. **Seasonal Trends (10% weight)**
   - Definition: Time of year and holiday proximity
   - Impact: Off-season bookings have higher confirmation
   - Scoring:
     - Off-season: +3 points
     - Regular season: +2 points
     - Peak season: +1 point

5. **Current Seat Availability (10% weight)**
   - Definition: Percentage of seats already booked
   - Impact: More availability = higher confirmation
   - Scoring:
     - <50% booked: +3 points
     - 50-75% booked: +2 points
     - 75-90% booked: +1 point
     - >90% booked: +0 points

**Base Probability:** 85%

**Formula:**
```
Final Probability = Base Probability + (Total Weighted Score)
Maximum Probability = 98%
Minimum Probability = 70%
```

#### Mock Training Dataset

```json
{
  "historical_bookings": [
    {
      "booking_id": "BKG001",
      "route": "AHM-MUM",
      "lead_days": 15,
      "seat_count": 2,
      "season": "regular",
      "availability": 45,
      "confirmed": true,
      "confirmation_probability_predicted": 95,
      "actual_confirmed": true
    },
    {
      "booking_id": "BKG002",
      "route": "AHM-SUR",
      "lead_days": 3,
      "seat_count": 5,
      "season": "peak",
      "availability": 85,
      "confirmed": true,
      "confirmation_probability_predicted": 78,
      "actual_confirmed": true
    },
    {
      "booking_id": "BKG003",
      "route": "VAD-MUM",
      "lead_days": 10,
      "seat_count": 1,
      "season": "off",
      "availability": 30,
      "confirmed": true,
      "confirmation_probability_predicted": 97,
      "actual_confirmed": true
    },
    {
      "booking_id": "BKG004",
      "route": "AHM-MUM",
      "lead_days": 2,
      "seat_count": 6,
      "season": "peak",
      "availability": 92,
      "confirmed": false,
      "confirmation_probability_predicted": 72,
      "actual_confirmed": false
    },
    {
      "booking_id": "BKG005",
      "route": "SUR-MUM",
      "lead_days": 20,
      "seat_count": 3,
      "season": "regular",
      "availability": 55,
      "confirmed": true,
      "confirmation_probability_predicted": 91,
      "actual_confirmed": true
    }
  ],
  "model_accuracy": 0.89,
  "total_samples": 1000,
  "training_period": "2024-01-01 to 2026-01-01"
}
```

#### Implementation Example (Python)

```python
def calculate_confirmation_probability(
    lead_days: int,
    seat_count: int,
    route: str,
    booking_date: date,
    availability_percentage: float
) -> dict:
    """
    Calculate booking confirmation probability
    
    Args:
        lead_days: Days between booking and journey
        seat_count: Number of seats in booking
        route: Route code (e.g., 'AHM-MUM')
        booking_date: Date of journey
        availability_percentage: Current seat availability
    
    Returns:
        dict with probability and breakdown
    """
    base_probability = 85
    total_score = 0
    factors = {}
    
    # Factor 1: Booking Lead Time (40% weight)
    if lead_days >= 15:
        lead_score = 15
    elif lead_days >= 8:
        lead_score = 10
    elif lead_days >= 4:
        lead_score = 5
    else:
        lead_score = 0
    factors['lead_time'] = lead_score
    total_score += lead_score
    
    # Factor 2: Seat Count (20% weight)
    if seat_count <= 2:
        seat_score = 5
    elif seat_count <= 4:
        seat_score = 3
    else:
        seat_score = 1
    factors['seat_count'] = seat_score
    total_score += seat_score
    
    # Factor 3: Route Demand (20% weight)
    route_demand = get_route_demand(route)
    if route_demand == 'low':
        route_score = 5
    elif route_demand == 'medium':
        route_score = 3
    else:
        route_score = 1
    factors['route_demand'] = route_score
    total_score += route_score
    
    # Factor 4: Seasonal Trends (10% weight)
    season = get_season(booking_date)
    if season == 'off':
        season_score = 3
    elif season == 'regular':
        season_score = 2
    else:
        season_score = 1
    factors['seasonal'] = season_score
    total_score += season_score
    
    # Factor 5: Current Availability (10% weight)
    if availability_percentage < 50:
        avail_score = 3
    elif availability_percentage < 75:
        avail_score = 2
    elif availability_percentage < 90:
        avail_score = 1
    else:
        avail_score = 0
    factors['availability'] = avail_score
    total_score += avail_score
    
    # Calculate final probability
    final_probability = min(base_probability + total_score, 98)
    final_probability = max(final_probability, 70)
    
    # Determine confidence level
    if final_probability >= 90:
        confidence = 'high'
    elif final_probability >= 75:
        confidence = 'good'
    else:
        confidence = 'moderate'
    
    return {
        'probability': final_probability,
        'confidence': confidence,
        'factors': factors,
        'total_score': total_score
    }
```

#### Prediction Output Example

```json
{
  "booking_id": "BKG1737456789012",
  "prediction": {
    "probability": 92,
    "confidence": "high",
    "confidence_interval": [88, 96],
    "factors": {
      "lead_time_score": 10,
      "seat_count_score": 5,
      "route_demand_score": 3,
      "seasonal_score": 2,
      "availability_score": 2
    },
    "total_score": 22,
    "base_probability": 85,
    "model_version": "v1.0",
    "predicted_at": "2026-01-21T10:30:00Z"
  },
  "recommendation": "High confidence - Your booking is highly likely to be confirmed",
  "factors_explanation": {
    "lead_time": "Booking 11 days in advance increases confirmation probability",
    "seat_count": "Requesting 2 seats has favorable confirmation rates",
    "route_demand": "This route has moderate demand based on historical data",
    "seasonal": "Current season shows regular booking patterns",
    "availability": "Good seat availability (45% booked)"
  }
}
```

#### Future Enhancements

1. **Machine Learning Models:**
   - Random Forest Classifier
   - Gradient Boosting (XGBoost)
   - Neural Networks for complex pattern recognition

2. **Additional Features:**
   - Day of week patterns
   - Time of day booking was made
   - User booking history
   - Payment method
   - Cancellation patterns
   - Weather forecasts

3. **Real-time Learning:**
   - Online learning to adapt to new patterns
   - A/B testing of prediction models
   - Feedback loop from actual confirmations

4. **Personalization:**
   - User-specific predictions based on history
   - Loyalty program integration
   - Price sensitivity analysis

---

## Technology Stack

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite

### Recommended Backend Stack
- **Runtime:** Node.js 18+ or Python 3.9+
- **Framework:** Express.js (Node) or FastAPI (Python)
- **Database:** PostgreSQL or MySQL
- **ORM:** Prisma (Node) or SQLAlchemy (Python)
- **Authentication:** JWT
- **API Documentation:** Swagger/OpenAPI

### Deployment
- **Frontend:** Vercel, Netlify, or AWS S3 + CloudFront
- **Backend:** AWS EC2, Heroku, or DigitalOcean
- **Database:** AWS RDS or managed PostgreSQL
- **CDN:** CloudFlare

---

## Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sleepride-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Project Structure

```
/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── components/
│   │   ├── SearchFlow.tsx      # Search and route selection
│   │   ├── SeatSelection.tsx   # Seat layout and selection
│   │   ├── MealSelection.tsx   # Meal booking interface
│   │   ├── PassengerDetails.tsx# Passenger information form
│   │   ├── BookingConfirmation.tsx # Confirmation with prediction
│   │   └── MyBookings.tsx      # Booking management
│   ├── styles/
│   │   └── globals.css         # Global styles and Tailwind config
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
├── README.md                   # This file
└── package.json                # Project dependencies
```

---

## Features Demonstration

### 1. Search Flow
- Intuitive search interface with route selection
- Date picker with validation
- Passenger count selection
- Feature highlights display

### 2. Seat Selection
- Interactive seat map with 32 seats (16 lower, 16 upper berths)
- Visual indicators for seat status
- Real-time availability
- Price calculation
- Booking summary sidebar

### 3. Meal Selection
- Grid layout of meal options
- Vegetarian/Non-vegetarian indicators
- Per-passenger meal selection
- Skip meal option
- Running total with seat charges

### 4. Passenger Details
- Dynamic form based on passenger count
- Validation for all fields
- Contact information collection
- Terms acceptance

### 5. Booking Confirmation
- AI prediction display with visual indicators
- Comprehensive booking summary
- Factor breakdown explanation
- Journey and passenger details
- Payment summary
- Action buttons (New booking, View bookings, Download)

### 6. My Bookings
- List of all bookings
- Status-based filtering (upcoming, completed, cancelled)
- Detailed booking information
- Cancel functionality with confirmation
- Empty state handling

---

## Security Considerations

1. **Data Validation:**
   - Server-side validation for all inputs
   - Sanitization of user inputs
   - Prevention of SQL injection

2. **Authentication:**
   - JWT-based authentication (for backend)
   - Secure session management
   - Password hashing with bcrypt

3. **API Security:**
   - Rate limiting
   - CORS configuration
   - API key authentication

4. **Payment Security:**
   - PCI DSS compliance (when integrating payment gateway)
   - Secure payment data handling
   - Transaction logging

---

## Performance Optimization

1. **Frontend:**
   - Code splitting
   - Lazy loading components
   - Optimized bundle size
   - Memoization of expensive calculations

2. **Backend:**
   - Database query optimization
   - Caching frequently accessed data
   - Connection pooling
   - Response compression

3. **Network:**
   - CDN for static assets
   - Image optimization
   - Gzip compression
   - HTTP/2 support

---

## Future Enhancements

1. **User Account System:**
   - User registration and login
   - Saved preferences
   - Booking history
   - Frequent traveler benefits

2. **Payment Integration:**
   - Multiple payment gateways
   - Wallet integration
   - EMI options
   - Promotional codes

3. **Advanced Features:**
   - Real-time seat availability updates (WebSocket)
   - Push notifications
   - Mobile app (React Native)
   - Multi-language support

4. **Analytics:**
   - Booking analytics dashboard
   - Revenue reports
   - User behavior tracking
   - A/B testing framework

5. **Customer Support:**
   - Live chat integration
   - FAQ section
   - Ticket system
   - Phone support integration

---

## License

This project is developed as a demonstration for a sleeper bus booking system.

---

## Contact

For questions or support, please contact the development team.

---

## Acknowledgments

- Design inspired by modern booking platforms
- Icons by Lucide
- Built with React and Tailwind CSS
