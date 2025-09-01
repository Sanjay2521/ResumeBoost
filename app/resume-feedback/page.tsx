'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function ResumeFeedback() {
  const { user, isLoaded } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const latestAnalysis = useQuery(api.resumeAnalyses.getLatestResumeAnalysis, 
    user ? { userId: user.id } : "skip"
  )

  useEffect(() => {
    // First try to get from Convex
    if (latestAnalysis) {
      setAnalysisResult({
        score: latestAnalysis.score,
        improvements: latestAnalysis.improvements,
        suggestedRoles: latestAnalysis.suggestedRoles.map(role => ({
          title: role,
          match: Math.floor(Math.random() * 20) + 80, // Mock match percentage
          reason: `Good fit based on your skills and experience`
        }))
      })
      return
    }

    // Fallback to URL params or localStorage
    const scoreParam = searchParams.get('score')
    const improvementsParam = searchParams.get('improvements')
    const rolesParam = searchParams.get('roles')

    if (scoreParam && improvementsParam && rolesParam) {
      setAnalysisResult({
        score: parseInt(scoreParam),
        improvements: JSON.parse(decodeURIComponent(improvementsParam)),
        suggestedRoles: JSON.parse(decodeURIComponent(rolesParam))
      })
    } else {
      // Check localStorage as fallback
      const savedResult = localStorage.getItem('resumeAnalysis')
      if (savedResult) {
        setAnalysisResult(JSON.parse(savedResult))
      } else if (!latestAnalysis && user) {
        // No analysis found, redirect to dashboard
        router.push('/dashboard')
      }
    }
  }, [searchParams, router, latestAnalysis, user])

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

  if (!isLoaded || (!analysisResult && latestAnalysis === undefined)) {
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
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              ← Back
            </button>
            <span className="text-gray-600">Hi, {user?.firstName}! 👋</span>
            <UserButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header with Score */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Resume Analysis Results</h2>
          <p className="text-xl text-gray-600">Here's how your resume performs against ATS systems</p>
        </div>

        {/* Score Card */}
        {analysisResult && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div>
                <ScoreCircle score={analysisResult.score || 0} />
                <p className="mt-4 text-lg font-semibold text-gray-800">ATS Score</p>
              </div>
              <div className="text-left">
                <div className={`inline-flex px-6 py-3 rounded-full text-lg font-medium ${
                  (analysisResult.score || 0) >= 80 ? 'bg-green-100 text-green-800' :
                  (analysisResult.score || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {(analysisResult.score || 0) >= 80 ? '🎉 Excellent Resume!' :
                   (analysisResult.score || 0) >= 60 ? '👍 Good Foundation' : '📈 Needs Improvement'}
                </div>
                <p className="mt-3 text-gray-600 max-w-xs text-lg">
                  {(analysisResult.score || 0) >= 80 ? 'Your resume is ready to impress recruiters and pass ATS filters!' :
                   (analysisResult.score || 0) >= 60 ? 'Good foundation, but some improvements will boost your success rate.' :
                   'Let\'s work together to significantly boost your resume performance!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Improvements */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Key Improvements</h3>
              </div>
              <div className="space-y-4">
                {(analysisResult.improvements || []).map((improvement: string, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-orange-50 rounded-xl">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-700 text-lg">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Roles */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Best Fit Roles</h3>
              </div>
              <div className="space-y-4">
                {(analysisResult.suggestedRoles || []).map((role: any, index: number) => (
                  <div key={index} className="p-5 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-800 text-lg">{role.title || role}</h4>
                      <span className="text-lg font-bold text-green-600">{role.match || 85}% match</span>
                    </div>
                    <p className="text-gray-600">{role.reason || 'Good fit based on your skills'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next Steps - Learning Roadmap */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready for the Next Step?</h3>
            <p className="text-xl text-gray-600 mb-8">Choose your learning path to boost your career prospects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Embedded Systems */}
            <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => router.push('/embedded-roadmap')}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Embedded Systems</h4>
              <p className="text-gray-600 mb-4 text-lg">Master C/C++, microcontrollers, RTOS, and hardware interfacing for embedded development roles</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">C/C++</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">Arduino</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">RTOS</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">Hardware</span>
              </div>
            </div>

            {/* VLSI */}
            <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-400 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => router.push('/vlsi-roadmap')}>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">VLSI Design</h4>
              <p className="text-gray-600 mb-4 text-lg">Learn Verilog, SystemVerilog, digital design, and verification for VLSI engineering roles</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium">Verilog</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium">SystemVerilog</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium">RTL</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium">Verification</span>
              </div>
            </div>
          </div>

          {/* General Options */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6 text-center">General Preparation Options</h4>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <button
                onClick={() => router.push('/ai-interview')}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎤 AI Interview Practice
              </button>
              <button
                onClick={() => router.push('/technical-assessment')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                💻 Technical Assessment
              </button>
              <button
                onClick={() => router.push('/roadmap')}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📚 Learning Roadmaps
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-200 text-gray-700 py-4 px-10 rounded-2xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
            >
              📄 Analyze Another Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}