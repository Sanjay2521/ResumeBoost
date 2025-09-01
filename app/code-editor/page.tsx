'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export default function CodeEditor() {
  const { user } = useUser()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [selectedProblem, setSelectedProblem] = useState(0)
  const [customInput, setCustomInput] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [mode, setMode] = useState<'problem' | 'compiler'>('problem')
  const [showSolution, setShowSolution] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
        { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
        { input: { nums: [3, 3], target: 6 }, expected: [0, 1] }
      ],
      starterCode: {
        javascript: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
        python: `def two_sum(nums, target):\n    # Write your solution here\n    pass`,
        java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
        cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`
      },
      solution: {
        javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
        python: `def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []`,
        java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (map.find(complement) != map.end()) {\n            return {map[complement], i};\n        }\n        map[nums[i]] = i;\n    }\n    return {};\n}`
      }
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Example:
Input: s = "()"
Output: true`,
      testCases: [
        { input: { s: "()" }, expected: true },
        { input: { s: "()[]{}" }, expected: true },
        { input: { s: "(]" }, expected: false }
      ],
      starterCode: {
        javascript: `function isValid(s) {\n    // Write your solution here\n    \n}`,
        python: `def is_valid(s):\n    # Write your solution here\n    pass`,
        java: `public class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        \n    }\n}`,
        cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        \n    }\n};`
      },
      solution: {
        javascript: `function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    \n    for (let char of s) {\n        if (char in map) {\n            if (stack.length === 0 || stack.pop() !== map[char]) {\n                return false;\n            }\n        } else {\n            stack.push(char);\n        }\n    }\n    \n    return stack.length === 0;\n}`,
        python: `def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    \n    for char in s:\n        if char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n        else:\n            stack.append(char)\n    \n    return len(stack) == 0`,
        java: `public class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put(')', '(');\n        map.put('}', '{');\n        map.put(']', '[');\n        \n        for (char c : s.toCharArray()) {\n            if (map.containsKey(c)) {\n                if (stack.isEmpty() || stack.pop() != map.get(c)) {\n                    return false;\n                }\n            } else {\n                stack.push(c);\n            }\n        }\n        \n        return stack.isEmpty();\n    }\n}`,
        cpp: `bool isValid(string s) {\n    stack<char> st;\n    unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};\n    \n    for (char c : s) {\n        if (map.count(c)) {\n            if (st.empty() || st.top() != map[c]) {\n                return false;\n            }\n            st.pop();\n        } else {\n            st.push(c);\n        }\n    }\n    \n    return st.empty();\n}`
      }
    }
  ]

  const compilerTemplates = {
    javascript: `// JavaScript Playground\nconsole.log("Hello, World!");\n\n// Your code here`,
    python: `# Python Playground\nprint("Hello, World!")\n\n# Your code here`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        // Your code here\n    }\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    // Your code here\n    return 0;\n}`
  }

  const currentProblem = problems[selectedProblem]

  useEffect(() => {
    if (mode === 'problem') {
      setCode(currentProblem.starterCode[language as keyof typeof currentProblem.starterCode] || '')
    } else {
      setCode(compilerTemplates[language as keyof typeof compilerTemplates] || '')
    }
  }, [language, selectedProblem, mode])

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          mode,
          customInput: showCustomInput ? customInput : undefined,
          problemId: mode === 'problem' ? currentProblem.id : undefined,
          testCases: mode === 'problem' ? currentProblem.testCases : undefined
        })
      })
      
      const result = await response.json()
      setOutput(result.output)
      setTestResults(result.testResults || [])
    } catch (error) {
      setOutput('Error: Failed to execute code')
    }
    
    setIsRunning(false)
  }

  const submitCode = async () => {
    if (mode === 'compiler') {
      runCode()
      return
    }

    setIsRunning(true)
    
    try {
      const response = await fetch('/api/submit-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          problemId: currentProblem.id,
          testCases: currentProblem.testCases
        })
      })
      
      const result = await response.json()
      setTestResults(result.testResults || [])
      setSubmissionResult(result)
      
      if (result.allPassed) {
        setOutput('🎉 All test cases passed! Solution accepted.')
      } else {
        setOutput(`❌ ${result.passedCount}/${result.totalCount} test cases passed.`)
      }
      
      // Always show solution after submission
      setShowSolution(true)
    } catch (error) {
      setOutput('Error: Failed to submit code')
    }
    
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-white">CodeStudio Pro</h1>
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setMode('problem')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'problem' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Problem Solver
              </button>
              <button
                onClick={() => setMode('compiler')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === 'compiler' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Code Compiler
              </button>
            </div>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="flex h-screen">
        {/* Problem List Sidebar - Only show in problem mode */}
        {mode === 'problem' && (
          <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Problems</h2>
              <div className="space-y-2">
                {problems.map((problem, index) => (
                  <div
                    key={problem.id}
                    onClick={() => setSelectedProblem(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedProblem === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{problem.title}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        problem.difficulty === 'Easy' ? 'bg-green-600' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Problem Description - Only show in problem mode */}
          {mode === 'problem' && (
            <div className="h-1/3 bg-gray-800 border-b border-gray-700 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{currentProblem.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    currentProblem.difficulty === 'Easy' ? 'bg-green-600' :
                    currentProblem.difficulty === 'Medium' ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {currentProblem.description}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div className="flex-1 flex">
            {/* Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:border-blue-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                  
                  {mode === 'compiler' && (
                    <button
                      onClick={() => setShowCustomInput(!showCustomInput)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        showCustomInput ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:text-white'
                      }`}
                    >
                      Custom Input
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors"
                  >
                    {isRunning ? 'Running...' : '▶ Run'}
                  </button>
                  {mode === 'problem' && (
                    <>
                      <button
                        onClick={submitCode}
                        disabled={isRunning}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors"
                      >
                        {isRunning ? 'Submitting...' : '✓ Submit'}
                      </button>
                      {submissionResult && (
                        <>
                          <button
                            onClick={() => setShowSolution(!showSolution)}
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded text-sm font-medium transition-colors"
                          >
                            {showSolution ? '🙈 Hide Solution' : '💡 Show Solution'}
                          </button>
                          <button
                            onClick={() => {
                              setSubmissionResult(null)
                              setShowSolution(false)
                              setTestResults([])
                              setOutput('')
                              setCode(currentProblem.starterCode[language as keyof typeof currentProblem.starterCode] || '')
                            }}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-sm font-medium transition-colors"
                          >
                            🔄 Try Again
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-gray-900 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold">Output</h3>
                {mode === 'compiler' && showCustomInput && (
                  <span className="text-xs text-gray-400">Custom Input Mode</span>
                )}
              </div>
              
              {/* Custom Input Area */}
              {mode === 'compiler' && showCustomInput && (
                <div className="border-b border-gray-700 p-4">
                  <h4 className="text-sm font-medium mb-2">Input:</h4>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full h-20 bg-gray-900 text-white p-2 text-sm rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your input here..."
                  />
                </div>
              )}
              
              <div className="flex-1 p-4 overflow-y-auto">
                {output && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Console Output:</h4>
                    <pre className={`bg-gray-900 p-3 rounded text-sm whitespace-pre-wrap ${
                      output.includes('Error') || output.includes('❌') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {output}
                    </pre>
                  </div>
                )}
                
                {mode === 'problem' && testResults.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Test Results:</h4>
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded text-sm ${
                            result.passed 
                              ? 'bg-green-900 border border-green-600' 
                              : 'bg-red-900 border border-red-600'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">Test Case {index + 1}</span>
                            <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                              {result.passed ? '✓ PASS' : '✗ FAIL'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            <div>Input: {JSON.stringify(result.input)}</div>
                            <div>Expected: {JSON.stringify(result.expected)}</div>
                            {!result.passed && (
                              <div className="text-red-400">Got: {JSON.stringify(result.actual)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {mode === 'problem' && submissionResult && showSolution && currentProblem.solution && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2 text-yellow-400">💡 Optimal Solution:</h4>
                    <pre className="bg-gray-900 p-3 rounded text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                      {currentProblem.solution[language as keyof typeof currentProblem.solution] || 'Solution not available for this language'}
                    </pre>
                    <div className="mt-2 space-y-2">
                      <div className="p-2 bg-blue-900 rounded text-xs text-blue-300">
                        📝 <strong>Explanation:</strong> This is an optimal solution with efficient time and space complexity. Study the approach and try to understand the algorithm.
                      </div>
                      {submissionResult.allPassed ? (
                        <div className="p-2 bg-green-900 rounded text-xs text-green-300">
                          🎉 <strong>Great job!</strong> Your solution passed all test cases. Compare it with the optimal solution to learn different approaches.
                        </div>
                      ) : (
                        <div className="p-2 bg-orange-900 rounded text-xs text-orange-300">
                          📚 <strong>Keep learning!</strong> Your solution passed {submissionResult.passedCount}/{submissionResult.totalCount} test cases. Study this optimal solution and try again.
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {!output && testResults.length === 0 && (
                  <div className="text-gray-500 text-center py-8">
                    <div className="text-4xl mb-2">💻</div>
                    <p>{mode === 'problem' ? 'Run your code to see test results' : 'Run your code to see output'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}