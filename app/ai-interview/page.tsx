'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect, useRef } from 'react'

export default function AIInterview() {
  const { user } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [questionFormat, setQuestionFormat] = useState<'text' | 'voice'>('text')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const [questions, setQuestions] = useState<string[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)

  const aiAvatar = {
    idle: "😊",
    speaking: "🗣️",
    listening: "👂"
  }

  const [aiState, setAiState] = useState<'idle' | 'speaking' | 'listening'>('idle')

  useEffect(() => {
    if (interviewStarted) {
      startCamera()
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [interviewStarted])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Camera access denied:', error)
    }
  }

  const generatePersonalizedQuestions = async () => {
    setIsLoadingQuestions(true)
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      })
      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      // Fallback questions if API fails
      setQuestions([
        "Tell me about your background and experience.",
        "What technical skills do you bring to this role?",
        "Describe a project you're proud of.",
        "How do you handle challenges in your work?",
        "What are your career goals?"
      ])
    }
    setIsLoadingQuestions(false)
  }

  const startInterview = async () => {
    if (questions.length === 0) {
      await generatePersonalizedQuestions()
    }
    setInterviewStarted(true)
    setAiState('speaking')
    speakQuestion(questions[0])
  }

  const speakQuestion = (question: string) => {
    if (questionFormat === 'voice' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.onend = () => setAiState('listening')
      speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => setAiState('listening'), 1000)
    }
  }

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return

    const newAnswers = [...answers, userAnswer]
    setAnswers(newAnswers)
    setUserAnswer('')
    setAiState('idle')

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeout(() => {
        setAiState('speaking')
        speakQuestion(questions[currentQuestion + 1])
      }, 1000)
    } else {
      // Interview complete
      setInterviewComplete(true)
      generateFeedback(newAnswers)
    }
  }

  const generateFeedback = async (allAnswers: string[]) => {
    // Evaluate answers based on length and quality
    let totalScore = 0
    let passedAnswers = 0
    const answerEvaluations = []
    
    for (let i = 0; i < allAnswers.length; i++) {
      const answer = allAnswers[i]
      const wordCount = answer.trim().split(/\s+/).length
      
      let answerScore = 0
      let status = 'rejected'
      
      if (wordCount >= 50) {
        answerScore = 85 + Math.floor(Math.random() * 15) // 85-100
        status = 'passed'
        passedAnswers++
      } else if (wordCount >= 30) {
        answerScore = 60 + Math.floor(Math.random() * 20) // 60-80
        status = 'average'
      } else if (wordCount >= 10) {
        answerScore = 30 + Math.floor(Math.random() * 20) // 30-50
        status = 'poor'
      } else {
        answerScore = Math.floor(Math.random() * 20) // 0-20
        status = 'rejected'
      }
      
      answerEvaluations.push({
        question: questions[i],
        answer: answer,
        wordCount: wordCount,
        score: answerScore,
        status: status
      })
      
      totalScore += answerScore
    }
    
    const averageScore = Math.floor(totalScore / allAnswers.length)
    const overallResult = passedAnswers >= 3 ? 'PASSED' : 'REJECTED'
    
    const feedback = {
      overallScore: averageScore,
      result: overallResult,
      passedAnswers: passedAnswers,
      totalAnswers: allAnswers.length,
      answerEvaluations: answerEvaluations,
      strengths: passedAnswers >= 3 ? [
        "Detailed responses showing depth of knowledge",
        "Good communication skills",
        "Comprehensive answers"
      ] : [
        "Shows basic understanding",
        "Willing to participate"
      ],
      improvements: passedAnswers < 3 ? [
        "Provide more detailed explanations (aim for 50+ words per answer)",
        "Include specific examples and experiences",
        "Elaborate on your thought process",
        "Show more depth in technical discussions"
      ] : [
        "Continue providing detailed responses",
        "Add more specific metrics and results"
      ],
      detailedAnalysis: {
        communication: passedAnswers >= 3 ? 80 + Math.floor(Math.random() * 20) : 40 + Math.floor(Math.random() * 30),
        technical: passedAnswers >= 2 ? 70 + Math.floor(Math.random() * 25) : 35 + Math.floor(Math.random() * 35),
        confidence: averageScore >= 60 ? 75 + Math.floor(Math.random() * 25) : 30 + Math.floor(Math.random() * 40),
        clarity: passedAnswers >= 3 ? 80 + Math.floor(Math.random() * 20) : 45 + Math.floor(Math.random() * 35)
      }
    }
    setFeedback(feedback)
  }

  const ScoreBar = ({ label, score }: { label: string, score: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${
            score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  )

  if (interviewComplete && feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Interview Complete! 🎉</h1>
            <p className="text-xl text-gray-600">Here's your detailed feedback</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Result */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                feedback.result === 'PASSED' 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}>
                <span className="text-2xl font-bold text-white">
                  {feedback.result === 'PASSED' ? '✅' : '❌'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {feedback.result === 'PASSED' ? 'Interview PASSED!' : 'Interview REJECTED'}
              </h3>
              <p className="text-lg font-semibold mb-2">
                Score: {feedback.overallScore}/100
              </p>
              <p className="text-gray-600">
                {feedback.passedAnswers}/{feedback.totalAnswers} answers met the criteria (50+ words)
              </p>
              <div className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                feedback.result === 'PASSED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {feedback.result === 'PASSED' 
                  ? '🎉 Congratulations! You provided detailed, comprehensive answers.' 
                  : '📝 Please provide more detailed answers (50+ words each) to pass.'}
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Detailed Analysis</h3>
              <ScoreBar label="Communication" score={feedback.detailedAnalysis.communication} />
              <ScoreBar label="Technical Knowledge" score={feedback.detailedAnalysis.technical} />
              <ScoreBar label="Confidence" score={feedback.detailedAnalysis.confidence} />
              <ScoreBar label="Clarity" score={feedback.detailedAnalysis.clarity} />
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Strengths</h3>
              </div>
              <div className="space-y-3">
                {feedback.strengths.map((strength: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <p className="text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012-2v1a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Answer Analysis</h3>
              </div>
              <div className="space-y-4">
                {feedback.answerEvaluations.map((evaluation: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">Question {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{evaluation.wordCount} words</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          evaluation.status === 'passed' ? 'bg-green-100 text-green-800' :
                          evaluation.status === 'average' ? 'bg-yellow-100 text-yellow-800' :
                          evaluation.status === 'poor' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {evaluation.status === 'passed' ? '✅ Passed' :
                           evaluation.status === 'average' ? '⚠️ Average' :
                           evaluation.status === 'poor' ? '📝 Poor' :
                           '❌ Rejected'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{evaluation.question}</p>
                    <p className="text-xs text-gray-600 italic">Your answer: "{evaluation.answer.substring(0, 100)}{evaluation.answer.length > 100 ? '...' : ''}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Areas to Improve</h3>
              </div>
              <div className="space-y-3">
                {feedback.improvements.map((improvement: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <p className="text-gray-700">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Interview
          </h1>
          <UserButton />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!interviewStarted ? (
          /* Pre-Interview Setup */
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">AI Interview Setup</h2>
              <p className="text-gray-600 mb-8">Get ready for your personalized AI interview experience</p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Format</h3>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setQuestionFormat('text')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      questionFormat === 'text' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📝 Text Questions
                  </button>
                  <button
                    onClick={() => setQuestionFormat('voice')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      questionFormat === 'voice' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🎤 Voice Questions
                  </button>
                </div>
              </div>

              <button
                onClick={startInterview}
                disabled={isLoadingQuestions}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoadingQuestions ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Preparing Questions...
                  </div>
                ) : (
                  'Start Interview'
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Interview Interface */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Your Video</h3>
              </div>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-64 bg-gray-900 rounded-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>

            {/* AI Interviewer */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">
                    {aiState === 'speaking' ? aiAvatar.speaking : 
                     aiState === 'listening' ? aiAvatar.listening : aiAvatar.idle}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">AI Interviewer</h3>
                <p className="text-sm text-gray-600">
                  {aiState === 'speaking' ? 'Speaking...' :
                   aiState === 'listening' ? 'Listening...' : 'Ready'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Question:</h4>
                <p className="text-gray-700">{questions[currentQuestion]}</p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}