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
        javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
        python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
        java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`
      }
    },
    {
      id: 2,
      title: 'Reverse String',
      difficulty: 'Easy',
      description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]`,
      testCases: [
        { input: { s: ["h","e","l","l","o"] }, expected: ["o","l","l","e","h"] },
        { input: { s: ["H","a","n","n","a","h"] }, expected: ["h","a","n","n","a","H"] }
      ],
      starterCode: {
        javascript: `function reverseString(s) {
    // Write your solution here
    
}`,
        python: `def reverse_string(s):
    # Write your solution here
    pass`,
        java: `public class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
        
    }
};`
      }
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Example:
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false`,
      testCases: [
        { input: { s: "()" }, expected: true },
        { input: { s: "()[]{}" }, expected: true },
        { input: { s: "(]" }, expected: false },
        { input: { s: "([)]" }, expected: false }
      ],
      starterCode: {
        javascript: `function isValid(s) {
    // Write your solution here
    
}`,
        python: `def is_valid(s):
    # Write your solution here
    pass`,
        java: `public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,
        cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`
      }
    }
  ]

  const currentProblem = problems[selectedProblem]

  useEffect(() => {
    setCode(currentProblem.starterCode[language as keyof typeof currentProblem.starterCode] || '')
  }, [language, selectedProblem])

  const loadSolution = () => {
    const solutions = {
      1: {
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`
      },
      2: {
        javascript: `function reverseString(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++; right--;
    }
    return s;
}`
      },
      3: {
        javascript: `function isValid(s) {
    const stack = [];
    const mapping = {')': '(', '}': '{', ']': '['};
    for (let char of s) {
        if (char in mapping) {
            const top = stack.length === 0 ? '#' : stack.pop();
            if (mapping[char] !== top) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`
      }
    }
    
    const solution = solutions[currentProblem.id as keyof typeof solutions]
    if (solution && solution[language as keyof typeof solution]) {
      setCode(solution[language as keyof typeof solution])
      setOutput('💡 Solution loaded! This is an optimal approach.')
      setTestResults([])
    }
  }

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
          problemId: currentProblem.id,
          testCases: currentProblem.testCases
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
      
      if (result.allPassed) {
        setOutput('🎉 All test cases passed! Solution accepted.')
      } else {
        setOutput(`❌ ${result.passedCount}/${result.totalCount} test cases passed.`)
      }
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
              onClick={() => window.location.href = '/roadmap'}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Roadmap
            </button>
            <h1 className="text-xl font-bold text-white">Code Editor</h1>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="flex h-screen">
        {/* Problem List Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Problem Description */}
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

          {/* Code Editor */}
          <div className="flex-1 flex">
            {/* Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
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
                
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors"
                  >
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  <button
                    onClick={submitCode}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors"
                  >
                    {isRunning ? 'Submitting...' : 'Submit'}
                  </button>
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
              <div className="bg-gray-700 px-4 py-2">
                <h3 className="font-semibold">Output</h3>
              </div>
              
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
                
                {testResults.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Test Results:</h4>
                      {testResults.some(r => !r.passed) && (
                        <button
                          onClick={() => loadSolution()}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          💡 Show Solution
                        </button>
                      )}
                    </div>
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
                              <div>
                                <div className="text-red-400">Got: {JSON.stringify(result.actual)}</div>
                                {result.error && (
                                  <div className="text-red-300 mt-1">Error: {result.error}</div>
                                )}
                                {result.hint && (
                                  <div className="text-yellow-300 mt-1">💡 Hint: {result.hint}</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {!output && testResults.length === 0 && (
                  <div className="text-gray-500 text-center py-8">
                    <div className="text-4xl mb-2">💻</div>
                    <p>Run your code to see output here</p>
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