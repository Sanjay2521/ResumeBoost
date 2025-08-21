'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

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
      setAnalysisResult(data)
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
        {!analysisResult ? (
          /* Upload Section */
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
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Header with Score */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Resume Analysis</h2>
              <p className="text-gray-600">Here's how your resume performs</p>
            </div>

            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
              <div className="flex items-center justify-center space-x-8">
                <div>
                  <ScoreCircle score={analysisResult.score} />
                  <p className="mt-4 text-lg font-semibold text-gray-800">Overall Score</p>
                </div>
                <div className="text-left">
                  <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                    analysisResult.score >= 80 ? 'bg-green-100 text-green-800' :
                    analysisResult.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {analysisResult.score >= 80 ? '🎉 Excellent' :
                     analysisResult.score >= 60 ? '👍 Good' : '📈 Needs Work'}
                  </div>
                  <p className="mt-2 text-gray-600 max-w-xs">
                    {analysisResult.score >= 80 ? 'Your resume is ready to impress recruiters!' :
                     analysisResult.score >= 60 ? 'Good foundation, but room for improvement.' :
                     'Let\'s work together to boost your resume!'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Improvements */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Areas to Improve</h3>
                </div>
                <div className="space-y-4">
                  {analysisResult.improvements.map((improvement: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Roles */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Best Fit Roles</h3>
                </div>
                <div className="space-y-3">
                  {analysisResult.suggestedRoles.map((role: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">{role.title}</h4>
                        <span className="text-sm font-medium text-green-600">{role.match}% match</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{role.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Interview Preparation */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12a1 1 0 102 0V7a1 1 0 10-2 0v5zM6 12a1 1 0 102 0V7a1 1 0 10-2 0v5zM13 12a1 1 0 102 0V7a1 1 0 10-2 0v5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Core Interview Preparation</h3>
                <p className="text-gray-600 mb-6">Specialized preparation tracks for hardware and embedded systems roles</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Embedded Systems */}
                <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/embedded-roadmap'}>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Embedded Systems</h4>
                  <p className="text-gray-600 mb-4">Complete roadmap for embedded development including C/C++, microcontrollers, RTOS, and hardware interfacing</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">C/C++</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">Microcontrollers</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">RTOS</span>
                  </div>
                </div>

                {/* VLSI */}
                <div className="p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/vlsi-roadmap'}>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">VLSI Design</h4>
                  <p className="text-gray-600 mb-4">Comprehensive VLSI roadmap covering Verilog, SystemVerilog, digital design, and verification</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs">Verilog</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs">SystemVerilog</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs">RTL Design</span>
                  </div>
                </div>
              </div>

              {/* General Interview Options */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">General Interview Preparation</h4>
                <div className="flex justify-center space-x-4 flex-wrap gap-4">
                  <button
                    onClick={() => window.location.href = '/ai-interview'}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🎤 AI Interview
                  </button>
                  <button
                    onClick={() => window.location.href = '/technical-assessment'}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    💻 Technical Test
                  </button>
                  <button
                    onClick={() => window.location.href = '/verilog-compiler'}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    ⚡ Verilog Compiler
                  </button>
                  <button
                    onClick={() => window.location.href = '/roadmap'}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📚 Learning Roadmap
                  </button>
                  <button
                    onClick={() => window.location.href = '/code-editor'}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    💻 Code Editor
                  </button>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setAnalysisResult(null)
                    setResumeFile(null)
                  }}
                  className="bg-gray-200 text-gray-700 py-3 px-8 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  📄 Analyze Another Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}