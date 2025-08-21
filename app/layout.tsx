import { ClerkProvider } from '@clerk/nextjs'
import Providers from '../components/Providers'
import './globals.css'

export const metadata = {
  title: 'Clerk + Convex App',
  description: 'Full-stack app with authentication and database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}