'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function TechnicalAssessment() {
  const { user } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(20).fill(''))
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes

  const questions = [
    {
      id: 1,
      question: "Write pseudo-code to find the maximum element in an array.",
      category: "Data Structures",
      difficulty: "Easy",
      expectedKeywords: ["loop", "max", "compare", "array", "iterate"]
    },
    {
      id: 2,
      question: "Write pseudo-code for binary search algorithm.",
      category: "Algorithms",
      difficulty: "Medium",
      expectedKeywords: ["binary", "middle", "divide", "compare", "recursive"]
    },
    {
      id: 3,
      question: "Write pseudo-code to reverse a linked list.",
      category: "Data Structures",
      difficulty: "Medium",
      expectedKeywords: ["pointer", "next", "previous", "reverse", "node"]
    },
    {
      id: 4,
      question: "Write pseudo-code for bubble sort algorithm.",
      category: "Algorithms",
      difficulty: "Easy",
      expectedKeywords: ["swap", "compare", "nested", "loop", "adjacent"]
    },
    {
      id: 5,
      question: "Write pseudo-code to check if a string is a palindrome.",
      category: "String Manipulation",
      difficulty: "Easy",
      expectedKeywords: ["reverse", "compare", "string", "equal", "loop"]
    },
    {
      id: 6,
      question: "Write pseudo-code for depth-first search (DFS) in a graph.",
      category: "Graph Algorithms",
      difficulty: "Hard",
      expectedKeywords: ["stack", "visited", "recursive", "neighbors", "mark"]
    },
    {
      id: 7,
      question: "Write pseudo-code to find factorial of a number using recursion.",
      category: "Recursion",
      difficulty: "Easy",
      expectedKeywords: ["recursive", "base", "factorial", "multiply", "return"]
    },
    {
      id: 8,
      question: "Write pseudo-code for merge sort algorithm.",
      category: "Algorithms",
      difficulty: "Hard",
      expectedKeywords: ["divide", "merge", "recursive", "sort", "conquer"]
    },
    {
      id: 9,
      question: "Write pseudo-code to detect cycle in a linked list.",
      category: "Data Structures",
      difficulty: "Medium",
      expectedKeywords: ["slow", "fast", "pointer", "cycle", "tortoise"]
    },
    {
      id: 10,
      question: "Write pseudo-code for breadth-first search (BFS) in a graph.",
      category: "Graph Algorithms",
      difficulty: "Medium",
      expectedKeywords: ["queue", "visited", "level", "neighbors", "dequeue"]
    },
    {
      id: 11,
      question: "Write pseudo-code to find the nth Fibonacci number.",
      category: "Dynamic Programming",
      difficulty: "Medium",
      expectedKeywords: ["fibonacci", "previous", "sum", "sequence", "iterate"]
    },
    {
      id: 12,
      question: "Write pseudo-code for quick sort algorithm.",
      category: "Algorithms",
      difficulty: "Hard",
      expectedKeywords: ["pivot", "partition", "recursive", "divide", "sort"]
    },
    {
      id: 13,
      question: "Write pseudo-code to validate balanced parentheses.",
      category: "Stack",
      difficulty: "Medium",
      expectedKeywords: ["stack", "push", "pop", "balanced", "parentheses"]
    },
    {
      id: 14,
      question: "Write pseudo-code to find two numbers that sum to a target.",
      category: "Hash Table",
      difficulty: "Easy",
      expectedKeywords: ["hash", "target", "complement", "sum", "lookup"]
    },
    {
      id: 15,
      question: "Write pseudo-code for implementing a queue using stacks.",
      category: "Data Structures",
      difficulty: "Medium",
      expectedKeywords: ["stack", "queue", "enqueue", "dequeue", "transfer"]
    },
    {
      id: 16,
      question: "Write pseudo-code to find longest common subsequence.",
      category: "Dynamic Programming",
      difficulty: "Hard",
      expectedKeywords: ["dp", "matrix", "subsequence", "common", "longest"]
    },
    {
      id: 17,
      question: "Write pseudo-code for heap sort algorithm.",
      category: "Algorithms",
      difficulty: "Hard",
      expectedKeywords: ["heap", "heapify", "extract", "max", "sort"]
    },
    {
      id: 18,
      question: "Write pseudo-code to implement LRU cache.",
      category: "System Design",
      difficulty: "Hard",
      expectedKeywords: ["cache", "lru", "doubly", "linked", "hash"]
    },
    {
      id: 19,
      question: "Write pseudo-code for counting sort algorithm.",
      category: "Algorithms",
      difficulty: "Medium",
      expectedKeywords: ["count", "frequency", "range", "stable", "sort"]
    },
    {
      id: 20,
      question: "Write pseudo-code to find shortest path in weighted graph (Dijkstra).",
      category: "Graph Algorithms",
      difficulty: "Hard",
      expectedKeywords: ["dijkstra", "priority", "queue", "distance", "shortest"]
    }
  ]

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitAssessment = async () => {
    const response = await fetch('/api/evaluate-technical', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions, answers })
    })
    const data = await response.json()
    setResults(data)
    setAssessmentComplete(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (assessmentComplete && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Technical Assessment Results 📊</h1>
            <p className="text-xl text-gray-600">Detailed analysis of your performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Overall Score */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                results.overallScore >= 70 ? 'bg-green-500' : 
                results.overallScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                <span className="text-2xl font-bold text-white">{results.overallScore}%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Overall Score</h3>
              <p className="text-gray-600">
                {results.overallScore >= 70 ? '🎉 Excellent!' :
                 results.overallScore >= 50 ? '👍 Good Job!' : '📚 Keep Learning!'}
              </p>
            </div>

            {/* Questions Attempted */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{results.attempted}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Attempted</h3>
              <p className="text-gray-600">out of 20 questions</p>
            </div>

            {/* Correct Answers */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{results.correct}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Correct</h3>
              <p className="text-gray-600">well-structured answers</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Performance by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(results.categoryScores).map(([category, score]: [string, any]) => (
                <div key={category} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full ${
                        score >= 70 ? 'bg-green-500' : 
                        score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{score}% accuracy</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Question Analysis */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Question-by-Question Analysis</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.questionAnalysis.map((analysis: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">Q{index + 1}: {analysis.category}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        analysis.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.score >= 70 ? 'bg-green-100 text-green-800' :
                        analysis.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.score}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{analysis.question}</p>
                  <p className="text-xs text-gray-500">
                    Your answer: "{analysis.userAnswer.substring(0, 100)}{analysis.userAnswer.length > 100 ? '...' : ''}"
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      <strong>Keywords found:</strong> {analysis.keywordsFound.join(', ') || 'None'}
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Missing keywords:</strong> {analysis.missingKeywords.join(', ') || 'None'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">✅ Strengths</h4>
                <ul className="space-y-2">
                  {results.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-3">📚 Areas to Improve</h4>
                <ul className="space-y-2">
                  {results.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <button
                onClick={() => window.location.href = '/resume-feedback'}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📄 View Resume Analysis
              </button>
              <button
                onClick={() => window.location.href = '/roadmap'}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📚 Learning Roadmap
              </button>
              <button
                onClick={() => window.location.href = '/ai-interview'}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎤 Retake Interview
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🏠 Upload New Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technical Assessment
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              ⏰ {formatTime(timeLeft)}
            </div>
            <UserButton />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {questions[currentQuestion].category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  questions[currentQuestion].difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  questions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {questions[currentQuestion].difficulty}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Question {currentQuestion + 1}
              </h2>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {questions[currentQuestion].question}
            </p>
          </div>

          <textarea
            value={answers[currentQuestion]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Write your pseudo-code here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            ← Previous
          </button>

          <div className="flex space-x-4">
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitAssessment}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}