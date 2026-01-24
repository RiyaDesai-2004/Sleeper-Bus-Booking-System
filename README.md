# Sleeper Ticket Booking System
This project focuses on designing a web-based sleeper bus ticket booking flow using Figma. The system allows users to book sleeper bus tickets between Ahmedabad and Mumbai, select seats, optionally add meals during checkout, enter passenger details, and view booking confirmation.
The design and flow are inspired by real-world bus booking platforms and include multiple steps like Search → Seat Selection → Meal Add-on → Passenger Details → Booking Confirmation → My Bookings.

## 🔗Prototype link
🌐 Live Prototype Preview

👉 https://press-grape-42622279.figma.site/

## ✨Core Features

### ✅ 1. View Available Seats

Displays seat layout (Sleeper / Semi-sleeper)

Shows available & booked seats

### ✅ 2. Seat Selection

Select one or multiple seats

Live seat count + total price update

### ✅ 3. Passenger Details Form

Full Name

Age

Phone Number

Email ID

### ✅ 4. Optional Meal Booking

Add meal option during booking

Adds meal cost to final bill

### ✅ 5. Checkout + Booking Confirmation

Confirms booking

Generates unique Booking ID

Shows total cost breakdown

### ✅ 6. View Booking Status

Fetch booking using bookingId

Shows seats + passenger + meal details

### ✅ 7. Cancel Booking

Cancel booking with bookingId

Frees seats automatically


## 🧪 Test Cases
| Test Case ID | Scenario                    | Input            | Expected Output                       |
| ------------ | --------------------------- | ---------------- | ------------------------------------- |
| TC-01        | Select available seat       | Seat A1          | Seat selected successfully            |
| TC-02        | Select already booked seat  | Seat B2 (booked) | Show error: Seat not available        |
| TC-03        | Submit passenger form empty | Empty name/phone | Validation error                      |
| TC-04        | Invalid phone/email         | `123` / `abc@`   | Format validation error               |
| TC-05        | Meal add-on selected        | Meal = Yes       | Total price increases                 |
| TC-06        | Booking confirmation        | Valid data       | Booking ID generated + success screen |
| TC-07        | Cancel booking              | bookingId        | Booking cancelled + seats released    |

## 🧩 Tech Stack
### Frontend (UI/UX)

Figma (Prototype + UI flow)

### Backend API (Implementation)

Node.js / Express 

MongoDB / PostgreSQL

REST API architecture

### Optional (Prediction)

Python (ML Model)

Logistic Regression / Random Forest (simple & effective)

## ✅3. PREDICTION_APPROACH.md

Includes:

Prediction logic

Model choice

Mock dataset

Training methodology

Booking probability output (%)
## 📁 Project Structure
```bash
sleeper-bus-booking/
│
├── README.md
├── PREDICTION_APPROACH.md
├── Attributions.md
├── FEATURES_AND_TESTS.md
│
├── src/
│   ├── components/
│   │   ├── BookingConfirmation.tsx
│   │   ├── MealSelection.tsx
│   │   ├── MyBookings.tsx
│   │   ├── PassengerDetails.tsx
│   │   ├── SearchFlow.tsx
│   │   └── SeatSelection.tsx
│   │
│   ├── guidelines/
│   │   └── Guidelines.md
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── utils/
│   │   └── pricing.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
└── docs/
    ├── api-documentation.md
    └── test-cases.md
```

## 👩‍💻 Author

Riya Desai

📌 Project: Sleeper Bus Booking System
    
