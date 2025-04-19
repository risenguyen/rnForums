# RN Forums

RN Forums is a modern, community-driven forum application built with React, TypeScript, and Vite. It provides a platform for users to connect, share, and engage in discussions on various topics.

## Features

- **Authentication**: Sign up, log in, and log out securely using Supabase.
- **Forums**: Explore and join discussions in categorized forums.
- **Threads**: Create and participate in threads within forums.
- **Replies**: Engage in conversations by replying to threads.
- **Pagination**: Infinite scrolling for threads.
- **Theme Support**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Backend**: Supabase (Database and Authentication)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/risenguyen/rnForums
   cd rnForums
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

```
src/
├── app/                # Application entry and routing
├── components/         # Reusable UI components
├── context/            # Context providers for global state
├── features/           # Feature-specific modules (auth, forums, threads, replies)
├── hooks/              # Custom React hooks
├── lib/                # Library utilities (e.g., API client)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── index.css           # Global styles
├── main.tsx            # Application entry point
```

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
