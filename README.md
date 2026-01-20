# Sleeper Ticket Booking System
This project focuses on designing a web-based sleeper bus ticket booking flow using Figma. The system allows users to book sleeper bus tickets between Ahmedabad and Mumbai, select seats, optionally add meals during checkout, enter passenger details, and view booking confirmation.

## ⭐ Core Features

View available seats

Select seat(s)

Passenger details form

Optional meal booking

Checkout + booking confirmation

View booking status

Cancel booking

## 🧪 Test Cases

### ✔ Functional Test Cases

| Test Case ID | Description                     | Expected Result                      |
|-------------|---------------------------------|--------------------------------------|
| TC01        | User selects a seat             | Seat becomes unavailable             |
| TC02        | User selects multiple seats     | Total price updates                  |
| TC03        | User books meals                | Meal cost added to final bill        |
| TC04        | User submits valid details      | Booking confirmed                    |
| TC05        | User skips meal                 | Booking continues without meal       |

### ⚠ Edge Test Cases

| Scenario                     | Expected Behavior              |
|------------------------------|--------------------------------|
| Already booked seat selected | Error shown / seat disabled    |
| Zero seats selected          | Continue button disabled       |
| Invalid meal quantity        | Validation error displayed     |
| Empty passenger form         | Submission blocked             |
