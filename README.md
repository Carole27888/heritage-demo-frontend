# Frontend Demo - Cars Management System

This is a Next.js application for managing a list of cars. It provides a user interface to view, add, edit, and delete cars. The app uses shadcn/ui components for styling and interacts with a backend API for data operations.

## Features

- View a list of cars in a table format
- Add new cars with make, model, year, and color
- Edit existing cars
- Delete cars
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **API:** Fetch API (expects backend at http://localhost:7078/ssp/cars)

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Backend API running on http://localhost:7078 (not included in this repo)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-demo-cars
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install shadcn/ui components:
   ```bash
   npx shadcn@latest add button input table card dialog
   ```

4. Install additional dependencies if needed:
   ```bash
   npm install next-intl
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Navigate to `/en/cars` or `/es/cars` for the cars page (assuming locale setup).

## Project Structure

- `src/app/` - Next.js app router pages
- `src/features/cars/` - Cars feature module
  - `hooks/` - Custom hooks for data fetching
  - `pages/` - Page components
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions

## API Endpoints

The app expects the following API endpoints from the backend:

- `GET /ssp/cars` - Fetch all cars
- `POST /ssp/cars` - Add a new car
- `PUT /ssp/cars/:id` - Update a car
- `DELETE /ssp/cars/:id` - Delete a car

## Development

- The app uses TypeScript for type safety.
- Tailwind CSS for styling.
- shadcn/ui for consistent UI components.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
