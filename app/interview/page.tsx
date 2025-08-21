'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function InterviewPage() {
  const { user } = useUser()
  const [interviewStatus, setInterviewStatus] = useState('accepted') // accepted, not_accepted
  const [showJoinOptions, setShowJoinOptions] = useState(false)

  const handleJoinInterview = () => {
    setShowJoinOptions(true)
  }

  const joinInterview = (type: 'audio' | 'video') => {
    // Simulate joining interview
    alert(`Joining ${type} interview... (This would connect to a real interview platform)`)
  }

  if (interviewStatus !== 'accepted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">No Interview Scheduled</h2>
          <p className="text-white/70">You haven't been selected for an interview yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 animate-gradient">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Interview Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/80">Welcome, {user?.firstName}!</span>
            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10' } }} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!showJoinOptions ? (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl animate-pulse-glow">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
                <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">🎉 Congratulations!</h2>
              <p className="text-xl text-white/80 mb-8">You've been selected for an interview</p>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">Interview Details:</h3>
                <div className="space-y-2 text-white/80">
                  <p>📅 Date: Tomorrow, 2:00 PM</p>
                  <p>⏱️ Duration: 45 minutes</p>
                  <p>👥 Interviewer: Sarah Johnson (HR Manager)</p>
                  <p>📋 Type: Technical + Behavioral</p>
                </div>
              </div>

              <button
                onClick={handleJoinInterview}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                  Join Interview
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8">Choose Interview Mode</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                  onClick={() => joinInterview('audio')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30">
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Audio Only</h3>
                  <p className="text-white/70">Join with microphone only</p>
                </button>

                <button
                  onClick={() => joinInterview('video')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Video Call</h3>
                  <p className="text-white/70">Join with camera and microphone</p>
                </button>
              </div>

              <button
                onClick={() => setShowJoinOptions(false)}
                className="mt-8 text-white/70 hover:text-white transition-colors"
              >
                ← Back to Interview Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}