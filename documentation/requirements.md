# Go Home - Functional Requirements

## 1. Core Features

### 1.1 Journey Search
- **FR1.1.1:** Users must be able to search for train journeys between two locations
- **FR1.1.2:** Search must support station name autocomplete
- **FR1.1.3:** Search must be optimized for quick access and minimal interaction
- **FR1.1.4:** System must validate both origin and destination stations before search

### 1.2 Journey Results
- **FR1.2.1:** Display train journeys sorted by arrival time (earliest first)
- **FR1.2.2:** Each journey result must show:
  - Departure time and station
  - Arrival time and station
  - Journey duration
  - Number of changes (if any)
  - Platform information (when available)
- **FR1.2.3:** Results must auto-refresh periodically to maintain accuracy
- **FR1.2.4:** Results must clearly indicate real-time status and delays

### 1.3 Search History
- **FR1.3.1:** System must automatically save the last search parameters
- **FR1.3.2:** Last search must be automatically executed on application launch
- **FR1.3.3:** Search history must persist across browser sessions
- **FR1.3.4:** System must store:
  - Origin station
  - Destination station
  - Last search timestamp

### 1.4 Quick Journey Reversal
- **FR1.4.1:** Provide one-click functionality to swap origin and destination
- **FR1.4.2:** Journey reversal must:
  - Swap station inputs
  - Automatically trigger new search
  - Maintain all other preferences

## 2. User Interface Requirements

### 2.1 Layout
- **FR2.1.1:** Single-page application with focus on quick access
- **FR2.1.2:** Search interface must be immediately visible on load
- **FR2.1.3:** Results must be clearly readable at a glance
- **FR2.1.4:** Mobile-first, responsive design

### 2.2 Interactions
- **FR2.2.1:** Maximum 3 clicks/taps to perform a new search
- **FR2.2.2:** Station selection must support both keyboard and touch input
- **FR2.2.3:** Provide visual feedback for all user actions
- **FR2.2.4:** Support keyboard shortcuts for common actions

## 3. Performance Requirements

### 3.1 Response Times
- **FR3.1.1:** Station search autocomplete must respond within 200ms
- **FR3.1.2:** Journey search results must load within 2 seconds
- **FR3.1.3:** Journey reversal must execute within 1 second
- **FR3.1.4:** Automatic refresh must not interrupt user interaction

### 3.2 Offline Capability
- **FR3.2.1:** Application must cache last successful search
- **FR3.2.2:** Station list must be available offline
- **FR3.2.3:** Must indicate online/offline status clearly
- **FR3.2.4:** Must sync automatically when connection is restored

## 4. Data Requirements

### 4.1 Station Data
- **FR4.1.1:** Must maintain current list of all SNCF stations
- **FR4.1.2:** Station data must include:
  - Station ID
  - Station name
  - Geographic coordinates
  - Station type/category

### 4.2 Journey Data
- **FR4.2.1:** Must display real-time journey information
- **FR4.2.2:** Must handle service disruptions and cancellations
- **FR4.2.3:** Must update journey status automatically
- **FR4.2.4:** Must retain journey history for quick access

## 5. Error Handling

### 5.1 Input Validation
- **FR5.1.1:** Validate station inputs before search
- **FR5.1.2:** Provide clear error messages for invalid inputs
- **FR5.1.3:** Suggest corrections for common input errors
- **FR5.1.4:** Prevent submission of invalid searches

### 5.2 Connection Handling
- **FR5.2.1:** Handle API connection failures gracefully
- **FR5.2.2:** Provide retry options for failed requests
- **FR5.2.3:** Cache last known good data
- **FR5.2.4:** Display connection status indicators 