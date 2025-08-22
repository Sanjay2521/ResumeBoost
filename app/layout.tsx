import { ClerkProvider } from '@clerk/nextjs'
import Providers from '../components/Providers'
import './globals.css'

export const metadata = {
  title: 'Resume Boost',
  description: 'AI-powered career acceleration platform with resume analysis, personalized interviews, technical assessments, and 3000+ coding problems across 9 specialized tracks.',
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