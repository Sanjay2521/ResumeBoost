# Full-Stack Web Application

A complete web application built with Next.js, Clerk authentication, and Convex database.

## Features

- **Authentication**: Clerk-powered sign up/sign in with email/password
- **Database**: Convex backend for user profiles
- **UI**: Tailwind CSS for responsive design
- **Protection**: Middleware-protected routes
- **TypeScript**: Full type safety

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Clerk**:
   - Create a Clerk account at https://clerk.com
   - Get your publishable and secret keys
   - Update `.env.local` with your Clerk keys

3. **Configure Convex**:
   - Install Convex CLI: `npm install -g convex`
   - Run: `npx convex dev`
   - Update `.env.local` with your Convex URL

4. **Run the application**:
   ```bash
   npm run dev
   ```

## Routes

- `/` - Landing page with "Get Started" button
- `/sign-in` - Clerk sign-in page
- `/sign-up` - Clerk sign-up page  
- `/dashboard` - Protected user dashboard

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Clerk
- **Database**: Convex
- **Styling**: Tailwind CSS
- **Language**: TypeScript