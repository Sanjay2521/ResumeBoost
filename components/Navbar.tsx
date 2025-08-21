'use client'

import { UserButton, useUser } from '@clerk/nextjs'

// Navigation bar with user button and sign out
export default function Navbar() {
  const { user } = useUser()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-600">
                Welcome, {user.firstName}!
              </span>
            )}
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8'
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}