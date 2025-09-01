'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const createUser = useMutation(api.users.createUser)
  const createResumeAnalysis = useMutation(api.resumeAnalyses.createResumeAnalysis)
  const latestAnalysis = useQuery(api.resumeAnalyses.getLatestResumeAnalysis, 
    user ? { userId: user.id } : "skip"
  )

  useEffect(() => {
    if (user && isLoaded) {
      createUser({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.fullName || '',
      }).catch(() => {})
    }
  }, [user, isLoaded, createUser])
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const hasExistingAnalysis = latestAnalysis !== null

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const analyzeResume = async () => {
    if (!resumeFile) return
    
    setIsProcessing(true)
    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: await resumeFile.text(),
          fileName: resumeFile.name
        })
      })
      const data = await response.json()
      
      // Save to Convex database
      if (user) {
        await createResumeAnalysis({
          userId: user.id,
          fileName: resumeFile.name,
          score: data.score,
          improvements: data.improvements,
          suggestedRoles: data.suggestedRoles.map((role: any) => 
            typeof role === 'string' ? role : role.title
          ),
        })
      }
      
      // Also save to localStorage as backup
      localStorage.setItem('resumeAnalysis', JSON.stringify(data))
      
      // Redirect to feedback page
      router.push('/resume-feedback')
    } catch (error) {
      console.error('Error:', error)
    }
    setIsProcessing(false)
  }

  const ScoreCircle = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (score / 100) * circumference
    
    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{score}</span>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeBoost
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hi, {user?.firstName}! 👋</span>
            <UserButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Show existing analysis option if available */}
        {hasExistingAnalysis && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Previous Analysis Available</h3>
                  <p className="text-blue-600">
                    Score: {latestAnalysis?.score}/100 • {latestAnalysis?.fileName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/resume-feedback')}
                className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        )}
        
        {/* Upload Section */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Boost Your Resume 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your resume and get instant AI-powered insights to land your dream job
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.413V13H5.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Drop your resume here
                </h3>
                <p className="text-gray-500">or click to browse files</p>
                <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX supported</p>
              </label>
            </div>
            
            {resumeFile && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">{resumeFile.name}</p>
                    <p className="text-sm text-green-600">Ready to analyze</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={!resumeFile || isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                  Analyzing Resume...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                  Analyze My Resume
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">CodeMaster Pro</h4>
              <p className="text-gray-600 text-sm mb-4">Master coding interviews with 500+ curated problems</p>
              <button
                onClick={() => router.push('/codemaster-pro')}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-green-500 hover:to-blue-600 transition-colors"
              >
                Start Practicing
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v8a1 1 0 102 0V6a1 1 0 10-2 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">AI Interview</h4>
              <p className="text-gray-600 text-sm mb-4">Practice interviews with AI-powered questions</p>
              <button
                onClick={() => router.push('/ai-interview')}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-pink-600 transition-colors"
              >
                Start Interview
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Technical Assessment</h4>
              <p className="text-gray-600 text-sm mb-4">Test your coding skills with comprehensive assessments</p>
              <button
                onClick={() => router.push('/technical-assessment')}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-colors"
              >
                Take Assessment
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Learning Roadmaps</h4>
              <p className="text-gray-600 text-sm mb-4">Follow structured learning paths for skill development</p>
              <button
                onClick={() => router.push('/roadmap')}
                className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-600 transition-colors"
              >
                Explore Roadmaps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}