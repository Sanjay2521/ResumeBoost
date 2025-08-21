'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function RecruiterDashboard() {
  const { user } = useUser()
  const [candidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      atsScore: 92,
      status: 'pending',
      resumeText: 'Experienced software developer with 5+ years in React, Node.js, and AWS...'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      atsScore: 65,
      status: 'pending',
      resumeText: 'Full-stack developer proficient in Python, Django, and PostgreSQL...'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      atsScore: 45,
      status: 'pending',
      resumeText: 'Junior developer with basic HTML, CSS knowledge and some JavaScript experience...'
    }
  ])

  const [candidateStatuses, setCandidateStatuses] = useState<{[key: number]: string}>({})

  const handleDecision = (candidateId: number, decision: 'accept' | 'reject') => {
    setCandidateStatuses(prev => ({
      ...prev,
      [candidateId]: decision
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Recruiter Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/80">Welcome, {user?.firstName}!</span>
            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Candidate Review</h2>
          <p className="text-xl text-white/80">Review ATS-qualified candidates for interview</p>
        </div>

        <div className="grid gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-pulse-glow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{candidate.name}</h3>
                  <p className="text-white/70">{candidate.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white/70">ATS Score:</span>
                    <div className={`px-4 py-2 rounded-full font-bold ${
                      candidate.atsScore >= 90 ? 'bg-green-500' : 
                      candidate.atsScore >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {candidate.atsScore}/100
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    📋 Pending Review
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 mb-6">
                <h4 className="text-white font-semibold mb-3">Resume Preview:</h4>
                <p className="text-white/80 text-sm leading-relaxed">{candidate.resumeText}</p>
              </div>

              {candidateStatuses[candidate.id] ? (
                <div className={`text-center py-4 rounded-2xl font-semibold text-lg ${
                  candidateStatuses[candidate.id] === 'accept' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {candidateStatuses[candidate.id] === 'accept' 
                    ? '✅ Accepted for Interview - Candidate Notified' 
                    : '❌ Rejected - Candidate Notified'}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDecision(candidate.id, 'accept')}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                      Accept for Interview
                    </div>
                  </button>
                  <button
                    onClick={() => handleDecision(candidate.id, 'reject')}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                      </svg>
                      Reject Candidate
                    </div>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}