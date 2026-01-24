# Core Features & Test Cases

## 7 Core Features

### 1. Multi-Station Route Search System
**Description:** Comprehensive search interface allowing users to select routes between Ahmedabad and Mumbai with 6 intermediate stations.

**Key Functionality:**
- Source and destination station selection
- Future date validation with date picker
- Passenger count (1-6)
- Visual feature highlights
- Responsive navigation

**User Value:** Easy route planning with flexibility to board/alight at intermediate stations

---

### 2. Interactive Sleeper Seat Selection
**Description:** Visual seat layout representing actual bus configuration with 32 berths (16 lower, 16 upper).

**Key Functionality:**
- Real-time seat availability visualization
- Seat status indicators (available, booked, female-reserved, selected)
- Dynamic seat selection with passenger count validation
- Price calculation per seat
- Booking summary with seat details

**User Value:** Clear visual representation helps users choose preferred seats (lower/upper berth)

---

### 3. Integrated Meal Booking Service
**Description:** Unique meal selection feature integrated into checkout flow with per-passenger customization.

**Key Functionality:**
- 6 meal options including vegetarian and non-vegetarian
- Per-passenger meal selection
- Dietary preference indicators (veg/non-veg symbols)
- Price breakdown
- Option to skip meals
- Order summary with meal details

**User Value:** Convenience of pre-ordering meals, dietary preference accommodation, clear pricing

---

### 4. Comprehensive Passenger Management
**Description:** Detailed information collection system for all passengers with validation.

**Key Functionality:**
- Individual passenger forms (name, age, gender)
- Contact information (email, phone)
- Form validation for all fields
- Terms and conditions acceptance
- Responsive form layout

**User Value:** Organized data collection ensures booking accuracy and communication

---

### 5. AI-Powered Confirmation Prediction
**Description:** Intelligent prediction system using historical data to estimate booking confirmation probability.

**Key Functionality:**
- Multi-factor analysis (lead time, seat count, route demand, seasonality, availability)
- Percentage-based probability (70-98%)
- Confidence levels (High/Good/Moderate)
- Visual representation with color coding
- Factor breakdown explanation
- Historical data integration

**User Value:** Transparency in booking process, informed decision-making, trust building

---

### 6. Smart Booking Confirmation System
**Description:** Comprehensive confirmation page with complete booking details and actionable next steps.

**Key Functionality:**
- Unique booking ID generation
- Journey details display
- Passenger-seat-meal mapping
- Payment breakdown
- Prediction display
- Quick actions (new booking, view bookings, download ticket)
- Important travel information

**User Value:** Complete booking overview, easy reference, clear next steps

---

### 7. Advanced Booking Management
**Description:** Central hub for managing all bookings with status tracking and cancellation.

**Key Functionality:**
- Complete booking history
- Status indicators (confirmed, completed, cancelled)
- Booking cancellation with confirmation dialog
- Detailed view of each booking
- Empty state handling
- Booking count statistics

**User Value:** Easy booking tracking, flexibility to cancel, organized travel history

---

## Critical Test Cases

### Functional Test Cases

#### 1. Search Flow Validation
**Test Case ID:** TC-SEARCH-001  
**Description:** User completes search with valid inputs  
**Steps:**
1. Select "Ahmedabad" as source
2. Select "Mumbai" as destination
3. Choose a future date
4. Select 2 passengers
5. Click "Search Buses"

**Expected Result:** System navigates to seat selection with correct parameters  
**Priority:** High

**Edge Cases:**
- Same source and destination (should show validation error)
- Past date selection (should be blocked by date picker)
- Today's date (should be allowed)

---

#### 2. Seat Selection Validation
**Test Case ID:** TC-SEAT-001  
**Description:** User selects correct number of seats matching passenger count  
**Steps:**
1. Navigate to seat selection (2 passengers)
2. Click on 2 available seats (L2, L4)
3. Verify seats are highlighted
4. Click "Continue to Meals"

**Expected Result:** System accepts selection and proceeds to meal selection  
**Priority:** High

**Edge Cases:**
- Clicking booked seats (should not select)
- Selecting more than passenger count (should limit)
- Deselecting and reselecting seats
- Attempting to continue with wrong seat count (button disabled)

---

#### 3. Meal Selection Validation
**Test Case ID:** TC-MEAL-001  
**Description:** User selects meals for each passenger  
**Steps:**
1. For Passenger 1 (Seat L2), select "Vegetarian Thali" (₹150)
2. For Passenger 2 (Seat L4), select "Chicken Biryani" (₹220)
3. Verify total meal price shows ₹370
4. Verify grand total includes seat price + meal price
5. Click "Continue to Details"

**Expected Result:** System proceeds with correct meal selections and pricing  
**Priority:** High

**Edge Cases:**
- Selecting "No Meal" for all passengers (₹0 meal cost)
- Changing meal selection multiple times
- Using "Skip All Meals" button

---

#### 4. Passenger Details Validation
**Test Case ID:** TC-PASSENGER-001  
**Description:** User enters valid passenger information  
**Steps:**
1. Enter name "John Doe" for Passenger 1
2. Enter age "30"
3. Select gender "Male"
4. Repeat for Passenger 2: "Jane Doe", "28", "Female"
5. Enter email "john@example.com"
6. Enter phone "+91 98765 43210"
7. Check terms and conditions
8. Click "Proceed to Confirmation"

**Expected Result:** Form validates and proceeds to confirmation  
**Priority:** High

**Edge Cases:**
- Invalid email format (should show validation error)
- Non-numeric age
- Age < 1 or > 120
- Empty required fields (button should be disabled)
- Phone number with various formats

---

#### 5. Booking Confirmation and Prediction
**Test Case ID:** TC-CONFIRM-001  
**Description:** System generates booking confirmation with prediction  
**Steps:**
1. Complete entire booking flow
2. Verify booking ID is generated (format: BKG + timestamp)
3. Check prediction percentage is between 70-98%
4. Verify all booking details match selections
5. Check total amount calculation

**Expected Result:** Confirmation displays with accurate details and valid prediction  
**Priority:** Critical

**Validation Points:**
- Booking ID is unique
- Prediction has color-coded confidence level
- Journey details match search
- Seat-passenger mapping is correct
- Meal selections are accurate
- Total price = (seats × ₹1200) + meal prices

---

#### 6. Booking Cancellation
**Test Case ID:** TC-CANCEL-001  
**Description:** User cancels an upcoming booking  
**Steps:**
1. Navigate to "My Bookings"
2. Find upcoming booking
3. Click "Cancel Booking"
4. Confirm in dialog
5. Verify status changes to "Cancelled"

**Expected Result:** Booking status updated, cancel button no longer visible  
**Priority:** High

**Edge Cases:**
- Attempting to cancel past bookings (button should not appear)
- Cancelled booking should remain in list with cancelled status

---

#### 7. Navigation Flow
**Test Case ID:** TC-NAV-001  
**Description:** Test back navigation preserves data  
**Steps:**
1. Complete search flow
2. Select seats
3. Click "Back to Seats"
4. Verify selected seats are preserved
5. Select different seats
6. Proceed to meals

**Expected Result:** Navigation maintains state, allows modifications  
**Priority:** Medium

---

### UI/UX Validation Test Cases

#### 8. Responsive Design
**Test Case ID:** TC-UI-001  
**Description:** Application renders correctly on different screen sizes  
**Test Scenarios:**
- Desktop (>1024px): Multi-column layouts, sidebar visible
- Tablet (768-1024px): Adjusted layouts, some stacking
- Mobile (<768px): Single column, full-width components

**Expected Result:** All features accessible and readable on all devices  
**Priority:** High

---

#### 9. Visual Feedback
**Test Case ID:** TC-UI-002  
**Description:** User receives appropriate visual feedback  
**Test Points:**
- Hover effects on buttons and seats
- Selected state styling (green seats)
- Disabled state (gray, cursor-not-allowed)
- Loading states during operations
- Error messages are visible and clear

**Expected Result:** All interactive elements provide clear visual feedback  
**Priority:** Medium

---

#### 10. Accessibility
**Test Case ID:** TC-A11Y-001  
**Description:** Application meets accessibility standards  
**Test Points:**
- Form labels properly associated with inputs
- Required fields marked with asterisk
- Color contrast meets WCAG AA standards
- Keyboard navigation works
- Focus indicators visible

**Expected Result:** Application is usable with keyboard and screen readers  
**Priority:** Medium

---

### Edge Cases & Error Handling

#### 11. Data Validation Edge Cases
**Test Case ID:** TC-EDGE-001  
**Scenarios:**
- Empty form submissions
- Special characters in names (O'Brien, José)
- Very long names (>100 characters)
- Emails: missing @, multiple @, invalid domain
- Phone: letters, special chars, different formats
- Ages: 0, negative, >120, decimal values

**Expected Result:** Appropriate validation messages, form prevents submission  
**Priority:** High

---

#### 12. Seat Selection Edge Cases
**Test Case ID:** TC-EDGE-002  
**Scenarios:**
- All seats booked (empty state)
- Only female-reserved seats available
- Rapid clicking on same seat
- Clicking seats in rapid succession
- Browser refresh during selection

**Expected Result:** System handles gracefully, shows appropriate messages  
**Priority:** Medium

---

#### 13. Empty States
**Test Case ID:** TC-EDGE-003  
**Scenarios:**
- My Bookings with no bookings
- All meals selected as "No Meal"
- Minimum passenger count (1)
- Maximum passenger count (6)

**Expected Result:** Appropriate empty state messages, guidance provided  
**Priority:** Low

---

#### 14. Prediction Accuracy Validation
**Test Case ID:** TC-PRED-001  
**Description:** Verify prediction calculation accuracy  
**Test Scenarios:**

**Scenario A: High Confidence**
- Lead time: 15 days
- Seat count: 2
- Expected: 90-98%

**Scenario B: Moderate Confidence**
- Lead time: 2 days
- Seat count: 6
- Expected: 70-80%

**Scenario C: Good Confidence**
- Lead time: 7 days
- Seat count: 3
- Expected: 80-90%

**Expected Result:** Predictions fall within expected ranges, factors properly weighted  
**Priority:** High

---

#### 15. Price Calculation Accuracy
**Test Case ID:** TC-PRICE-001  
**Description:** Verify all price calculations are correct  
**Test Scenarios:**
- 1 seat (₹1200) + no meal = ₹1200
- 2 seats (₹2400) + 1 veg thali (₹150) + 1 no meal (₹0) = ₹2550
- 6 seats (₹7200) + 6 most expensive meals (₹220×6 = ₹1320) = ₹8520

**Expected Result:** All calculations accurate to the rupee  
**Priority:** Critical

---

## Performance Test Cases

#### 16. Load Time Testing
**Test Case ID:** TC-PERF-001  
**Metrics:**
- Initial page load: <2 seconds
- Navigation between steps: <500ms
- Seat selection response: <100ms

**Priority:** Medium

---

#### 17. Concurrent User Simulation
**Test Case ID:** TC-PERF-002  
**Description:** Multiple users booking simultaneously  
**Expected Result:** No race conditions, seat locking works  
**Priority:** High (Backend)

---

## Security Test Cases

#### 18. Input Sanitization
**Test Case ID:** TC-SEC-001  
**Description:** Test XSS and injection prevention  
**Test Inputs:**
- `<script>alert('XSS')</script>` in name field
- SQL injection patterns in text fields
- HTML tags in textarea

**Expected Result:** All malicious input sanitized or rejected  
**Priority:** Critical

---

#### 19. API Security
**Test Case ID:** TC-SEC-002  
**Description:** Test API endpoint security  
**Tests:**
- Rate limiting on booking endpoint
- Authentication required for booking history
- CORS configuration correct

**Expected Result:** Unauthorized access prevented  
**Priority:** Critical (Backend)

---

## Integration Test Cases

#### 20. End-to-End Booking Flow
**Test Case ID:** TC-INT-001  
**Description:** Complete booking flow from search to confirmation  
**Steps:**
1. Search: Ahmedabad → Mumbai, tomorrow, 2 passengers
2. Select seats: L2, L4
3. Select meals: Veg Thali, Punjabi Meal
4. Enter passenger details with valid info
5. Verify confirmation displays
6. Check booking appears in "My Bookings"

**Expected Result:** Complete flow works seamlessly, data persists correctly  
**Priority:** Critical

---

## Test Summary

**Total Test Cases:** 20
- **Critical Priority:** 6
- **High Priority:** 10
- **Medium Priority:** 3
- **Low Priority:** 1

**Coverage Areas:**
- Functional: 7 test cases
- UI/UX: 3 test cases
- Edge Cases: 5 test cases
- Performance: 2 test cases
- Security: 2 test cases
- Integration: 1 test case

**Recommended Testing Tools:**
- Unit Testing: Jest, React Testing Library
- E2E Testing: Cypress, Playwright
- Performance: Lighthouse, WebPageTest
- Accessibility: axe DevTools, WAVE
- Security: OWASP ZAP, Burp Suite
