'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export default function PracticeInterface() {
  const { user } = useUser()
  const [selectedSkill, setSelectedSkill] = useState('Data Structures')
  const [currentProblem, setCurrentProblem] = useState(0)
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())
  const [difficulty, setDifficulty] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const skillData = {
    'Data Structures': {
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      problems: [
        { id: 1, title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/', tags: ['Array', 'Hash Table'] },
        { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/add-two-numbers/', tags: ['Linked List'] },
        { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', tags: ['Hash Table', 'String'] },
        { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', tags: ['Array', 'Binary Search'] },
        { id: 5, title: 'Reverse Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/', tags: ['Linked List'] },
        { id: 6, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', tags: ['Tree', 'DFS'] },
        { id: 7, title: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', tags: ['Stack', 'String'] },
        { id: 8, title: 'Merge Two Sorted Lists', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', tags: ['Linked List'] },
        { id: 9, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', tags: ['Tree', 'Stack'] },
        { id: 10, title: 'Same Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/same-tree/', tags: ['Tree', 'DFS'] },
        // Add more problems here - this is just a sample
      ]
    },
    'Algorithms': {
      icon: '⚡',
      color: 'from-purple-500 to-pink-500',
      problems: [
        { id: 1, title: 'Binary Search', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-search/', tags: ['Binary Search'] },
        { id: 2, title: 'Merge Sort Implementation', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/merge-sort/', tags: ['Sorting', 'Divide and Conquer'] },
        { id: 3, title: 'Quick Sort Implementation', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/quick-sort/', tags: ['Sorting', 'Divide and Conquer'] },
        { id: 4, title: 'Kth Largest Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', tags: ['Heap', 'Sorting'] },
        { id: 5, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', tags: ['Binary Search'] },
        // Add more algorithm problems
      ]
    }
    // Add other skills with their respective problems
  }

  const currentSkillData = skillData[selectedSkill as keyof typeof skillData] || skillData['Data Structures']
  
  const filteredProblems = currentSkillData.problems.filter(problem => {
    const matchesDifficulty = difficulty === 'All' || problem.difficulty === difficulty
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesDifficulty && matchesSearch
  })

  const toggleSolved = (problemId: number) => {
    const newSolved = new Set(solvedProblems)
    if (newSolved.has(problemId)) {
      newSolved.delete(problemId)
    } else {
      newSolved.add(problemId)
    }
    setSolvedProblems(newSolved)
  }

  const progressPercentage = (solvedProblems.size / currentSkillData.problems.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/roadmap'}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Roadmap
              </button>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${currentSkillData.color} rounded-xl flex items-center justify-center text-xl`}>
                  {currentSkillData.icon}
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedSkill} Practice</h1>
              </div>
            </div>
            <UserButton />
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {solvedProblems.size}/{currentSkillData.problems.length} problems solved
              </span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${currentSkillData.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Ultra">Ultra</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search problems or tags..."
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Problem List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Problems ({filteredProblems.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProblems.map((problem, index) => (
                  <div
                    key={problem.id}
                    onClick={() => setCurrentProblem(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      currentProblem === index 
                        ? 'bg-blue-100 border-2 border-blue-300' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {problem.title}
                      </span>
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
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        problem.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{problem.platform}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Problem Details */}
          <div className="lg:col-span-3">
            {filteredProblems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {filteredProblems[currentProblem]?.title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        filteredProblems[currentProblem]?.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        filteredProblems[currentProblem]?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        filteredProblems[currentProblem]?.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {filteredProblems[currentProblem]?.difficulty}
                      </span>
                      <span className="text-gray-600">{filteredProblems[currentProblem]?.platform}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSolved(filteredProblems[currentProblem]?.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      solvedProblems.has(filteredProblems[currentProblem]?.id)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {solvedProblems.has(filteredProblems[currentProblem]?.id) ? '✓ Solved' : 'Mark as Solved'}
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {filteredProblems[currentProblem]?.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Practice Links:</h3>
                    <div className="space-y-3">
                      <a
                        href={filteredProblems[currentProblem]?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">LC</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Solve on {filteredProblems[currentProblem]?.platform}</p>
                            <p className="text-sm text-gray-600">Practice this problem online</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Practice Tips:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Read the problem statement carefully and understand the constraints
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Think about the time and space complexity of your solution
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Start with a brute force approach, then optimize
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Test your solution with edge cases
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentProblem(Math.max(0, currentProblem - 1))}
                    disabled={currentProblem === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>
                  
                  <span className="text-gray-600">
                    {currentProblem + 1} of {filteredProblems.length}
                  </span>
                  
                  <button
                    onClick={() => setCurrentProblem(Math.min(filteredProblems.length - 1, currentProblem + 1))}
                    disabled={currentProblem === filteredProblems.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}