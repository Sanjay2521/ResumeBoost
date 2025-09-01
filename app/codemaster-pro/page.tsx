'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { leetcodeProblems, Problem } from '../../data/leetcode-problems'

export default function CodeMasterPro() {
  const { user } = useUser()
  const [selectedCategory, setSelectedCategory] = useState('Array')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const markSolved = useMutation(api.problems.markSolved)
  const unmarkSolved = useMutation(api.problems.unmarkSolved)
  const solvedProblemsData = useQuery(api.problems.getSolvedProblems, 
    user ? { userId: user.id } : "skip"
  )
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (solvedProblemsData) {
      setSolvedProblems(new Set(solvedProblemsData))
    }
  }, [solvedProblemsData])
  const [difficulty, setDifficulty] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPremium, setShowPremium] = useState(true)
  const [sortBy, setSortBy] = useState('id')

  const categories = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting',
    'Greedy', 'Depth-First Search', 'Binary Search', 'Database', 'Breadth-First Search',
    'Tree', 'Matrix', 'Two Pointers', 'Binary Tree', 'Bit Manipulation', 'Heap (Priority Queue)',
    'Stack', 'Graph', 'Prefix Sum', 'Simulation', 'Counting', 'Sliding Window',
    'Union Find', 'Linked List', 'Ordered Set', 'Monotonic Stack', 'Trie',
    'Number Theory', 'Topological Sort', 'Binary Indexed Tree', 'Segment Tree',
    'Binary Search Tree', 'Hash Function', 'Rolling Hash', 'Shortest Path',
    'Game Theory', 'Interactive', 'Data Stream', 'Brainteaser', 'Randomized',
    'Iterator', 'Concurrency', 'Doubly-Linked List', 'Geometry', 'Design'
  ]

  const problems: Problem[] = leetcodeProblems

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'All' || problem.tags.includes(selectedCategory)
    const matchesDifficulty = difficulty === 'All' || problem.difficulty === difficulty
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPremium = showPremium || !problem.premium
    return matchesCategory && matchesDifficulty && matchesSearch && matchesPremium
  })

  const sortedProblems = [...filteredProblems].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'difficulty':
        const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
        return diffOrder[a.difficulty] - diffOrder[b.difficulty]
      case 'acceptance':
        return parseFloat(b.acceptance) - parseFloat(a.acceptance)
      case 'frequency':
        return b.frequency - a.frequency
      default:
        return a.id - b.id
    }
  })

  const toggleSolved = async (problemId: number) => {
    if (!user) return
    
    const newSolved = new Set(solvedProblems)
    if (newSolved.has(problemId)) {
      newSolved.delete(problemId)
      await unmarkSolved({ userId: user.id, problemId })
    } else {
      newSolved.add(problemId)
      await markSolved({ userId: user.id, problemId })
    }
    setSolvedProblems(newSolved)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Hard': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">CodeMaster Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Solved: {solvedProblems.size}/{problems.length}
              </span>
              <UserButton />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    selectedCategory === 'All' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Problems ({problems.length})
                </button>
                {categories.map(category => {
                  const count = problems.filter(p => p.tags.includes(category)).length
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory === category 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="id">Problem ID</option>
                    <option value="title">Title</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="acceptance">Acceptance Rate</option>
                    <option value="frequency">Frequency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search problems..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showPremium}
                      onChange={(e) => setShowPremium(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show Premium</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Problems List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Problems ({sortedProblems.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {sortedProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSolved(problem.id)
                          }}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            solvedProblems.has(problem.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {solvedProblems.has(problem.id) && '✓'}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">#{problem.id}</span>
                            <h3 className="text-sm font-medium text-gray-900">{problem.title}</h3>
                            {problem.premium && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                Premium
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {problem.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{problem.tags.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{problem.acceptance}</span>
                        <div className="flex items-center">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${problem.frequency}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    #{selectedProblem.id}. {selectedProblem.title}
                  </h2>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                    {selectedProblem.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedProblem.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
                  {selectedProblem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="font-medium text-gray-900">Example {index + 1}:</p>
                      <p className="text-gray-700 mt-1"><strong>Input:</strong> {example.input}</p>
                      <p className="text-gray-700"><strong>Output:</strong> {example.output}</p>
                      {example.explanation && (
                        <p className="text-gray-700"><strong>Explanation:</strong> {example.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index} className="text-gray-700">{constraint}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProblem.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Companies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProblem.companies.map((company, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hints</h3>
                  {selectedProblem.hints.map((hint, index) => (
                    <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2">
                      <p className="text-yellow-800">{hint}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Acceptance Rate: {selectedProblem.acceptance}</span>
                    <span className="text-sm text-gray-600">Frequency: {selectedProblem.frequency}%</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => toggleSolved(selectedProblem.id)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        solvedProblems.has(selectedProblem.id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {solvedProblems.has(selectedProblem.id) ? '✓ Solved' : 'Mark as Solved'}
                    </button>
                    <button
                      onClick={() => window.location.href = '/code-editor'}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                    >
                      Solve Problem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}