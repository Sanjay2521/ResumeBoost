import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code, language, problemId, testCases } = await request.json()

    // Simulate comprehensive testing with hidden test cases
    const allTestCases = [
      ...testCases,
      // Add hidden test cases for more thorough testing
      ...getHiddenTestCases(problemId)
    ]

    let testResults: any[] = []
    let passedCount = 0

    // Simulate execution for all test cases
    for (let i = 0; i < allTestCases.length; i++) {
      const testCase = allTestCases[i]
      let passed = false
      let actual = null

      // Enhanced simulation based on code quality
      const codeQuality = analyzeCodeQuality(code, problemId)
      
      if (problemId === 1) { // Two Sum
        if (codeQuality.hasOptimalSolution) {
          passed = Math.random() > 0.1 // 90% pass rate for good solutions
        } else if (codeQuality.hasBasicSolution) {
          passed = Math.random() > 0.4 // 60% pass rate for basic solutions
        } else {
          passed = Math.random() > 0.8 // 20% pass rate for incomplete
        }
        actual = passed ? testCase.expected : [0, 0]
      } else if (problemId === 2) { // Reverse String
        if (codeQuality.hasOptimalSolution) {
          passed = Math.random() > 0.05
        } else if (codeQuality.hasBasicSolution) {
          passed = Math.random() > 0.3
        } else {
          passed = Math.random() > 0.7
        }
        actual = passed ? testCase.expected : testCase.input.s
      } else if (problemId === 3) { // Valid Parentheses
        if (codeQuality.hasOptimalSolution) {
          passed = Math.random() > 0.1
        } else if (codeQuality.hasBasicSolution) {
          passed = Math.random() > 0.4
        } else {
          passed = Math.random() > 0.8
        }
        actual = passed ? testCase.expected : !testCase.expected
      }

      if (passed) passedCount++

      testResults.push({
        testCase: i + 1,
        input: testCase.input,
        expected: testCase.expected,
        actual: actual,
        passed: passed,
        hidden: i >= testCases.length // Mark hidden test cases
      })
    }

    const allPassed = passedCount === allTestCases.length
    const acceptance = (passedCount / allTestCases.length) * 100

    return NextResponse.json({
      testResults: testResults.slice(0, testCases.length), // Only show visible test cases
      allPassed,
      passedCount,
      totalCount: allTestCases.length,
      acceptance: Math.round(acceptance),
      hiddenTestsPassed: testResults.slice(testCases.length).filter(t => t.passed).length,
      hiddenTestsTotal: allTestCases.length - testCases.length,
      success: true
    })

  } catch (error) {
    console.error('Code submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit code' },
      { status: 500 }
    )
  }
}

function analyzeCodeQuality(code: string, problemId: number) {
  const analysis = {
    hasOptimalSolution: false,
    hasBasicSolution: false,
    timeComplexity: 'Unknown',
    spaceComplexity: 'Unknown'
  }

  if (problemId === 1) { // Two Sum
    if (code.includes('Map') || code.includes('{}') || code.includes('hash')) {
      analysis.hasOptimalSolution = true
      analysis.timeComplexity = 'O(n)'
      analysis.spaceComplexity = 'O(n)'
    } else if (code.includes('for') && code.includes('for')) {
      analysis.hasBasicSolution = true
      analysis.timeComplexity = 'O(n²)'
      analysis.spaceComplexity = 'O(1)'
    }
  } else if (problemId === 2) { // Reverse String
    if (code.includes('two pointer') || (code.includes('left') && code.includes('right'))) {
      analysis.hasOptimalSolution = true
      analysis.timeComplexity = 'O(n)'
      analysis.spaceComplexity = 'O(1)'
    } else if (code.includes('reverse') || code.includes('for')) {
      analysis.hasBasicSolution = true
    }
  } else if (problemId === 3) { // Valid Parentheses
    if (code.includes('stack') || code.includes('push') && code.includes('pop')) {
      analysis.hasOptimalSolution = true
      analysis.timeComplexity = 'O(n)'
      analysis.spaceComplexity = 'O(n)'
    } else if (code.includes('for') || code.includes('while')) {
      analysis.hasBasicSolution = true
    }
  }

  return analysis
}

function getHiddenTestCases(problemId: number) {
  switch (problemId) {
    case 1: // Two Sum
      return [
        { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expected: [3, 4] },
        { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4] },
        { input: { nums: [0, 4, 3, 0], target: 0 }, expected: [0, 3] }
      ]
    case 2: // Reverse String
      return [
        { input: { s: ["A"] }, expected: ["A"] },
        { input: { s: ["a","b"] }, expected: ["b","a"] },
        { input: { s: ["r","a","c","e","c","a","r"] }, expected: ["r","a","c","e","c","a","r"] }
      ]
    case 3: // Valid Parentheses
      return [
        { input: { s: "" }, expected: true },
        { input: { s: "(((" }, expected: false },
        { input: { s: ")))" }, expected: false },
        { input: { s: "{[()]}" }, expected: true }
      ]
    default:
      return []
  }
}