import Link from 'next/link'

// Landing page with Get Started button
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Our App
        </h1>
        <p className="text-gray-600 mb-8">
          Get started by creating an account or signing in to access your dashboard.
        </p>
        <Link
          href="/sign-up"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 inline-block"
        >
          Get Started
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}