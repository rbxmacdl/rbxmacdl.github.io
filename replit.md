# Overview

This is a React-based Roblox Mac Downloader application that helps users download the official Roblox macOS client. The app fetches the current Roblox version from the official API and provides a simple interface to download the client with proper error handling and progress indication.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses React with TypeScript in a client-server architecture:
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for consistent design
- **Styling**: Tailwind CSS with dark theme support and custom CSS variables
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state

## Component Structure
- **Pages**: Home page displays the downloader interface, 404 page for unknown routes  
- **Components**: Modular UI components including DownloadButton with progress tracking and ErrorModal for error handling
- **Hooks**: Custom hooks for Roblox version fetching and mobile detection
- **UI Components**: Comprehensive shadcn/ui component library with consistent theming

## API Integration
- **External API**: Fetches current Roblox macOS version from `clientsettingscdn.roblox.com`
- **Query Management**: Uses TanStack Query for caching, retry logic, and background refetching
- **Error Handling**: Graceful error handling with user-friendly error messages and retry functionality

## Backend Architecture  
The backend uses Express.js with TypeScript:
- **Server Framework**: Express.js with middleware for JSON parsing and request logging
- **Database**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Route Structure**: Centralized route registration with `/api` prefix for all endpoints

## Development Architecture
- **Build System**: Vite for fast development with hot module replacement
- **TypeScript**: Strict type checking across frontend and backend
- **Path Aliases**: Configured aliases for clean imports (`@/`, `@shared/`)
- **Monorepo Structure**: Shared code between client and server in `shared/` directory

# External Dependencies

## Core Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

## Backend Dependencies
- **Server**: Express.js with TypeScript support via tsx
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless driver
- **Session Management**: PostgreSQL session store for Express sessions
- **Utilities**: date-fns for date handling, nanoid for ID generation

## Development Tools
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript setup with strict configuration
- **Replit Integration**: Vite plugin for runtime error overlay and development banner

## Third-Party Services
- **Roblox API**: `clientsettingscdn.roblox.com` for fetching current macOS client version
- **Neon Database**: Serverless PostgreSQL database hosting
- **CDN**: Roblox CDN for downloading client files (`setup.rbxcdn.com`)