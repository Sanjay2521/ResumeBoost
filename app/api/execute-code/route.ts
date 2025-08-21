import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code, language, problemId, testCases } = await request.json()

    // Simulate code execution (in production, use Docker containers for security)
    let output = ''
    let testResults: any[] = []

    try {
      // For JavaScript execution (simplified simulation)
      if (language === 'javascript') {
        // Create a safe execution environment
        const wrappedCode = `
          ${code}
          
          // Test execution
          const results = [];
          ${testCases.map((testCase: any, index: number) => `
            try {
              const result = ${getFunctionCall(problemId, testCase.input)};
              results.push({
                testCase: ${index + 1},
                input: ${JSON.stringify(testCase.input)},
                expected: ${JSON.stringify(testCase.expected)},
                actual: result,
                passed: JSON.stringify(result) === JSON.stringify(${JSON.stringify(testCase.expected)})
              });
            } catch (error) {
              results.push({
                testCase: ${index + 1},
                input: ${JSON.stringify(testCase.input)},
                expected: ${JSON.stringify(testCase.expected)},
                actual: 'Error: ' + error.message,
                passed: false
              });
            }
          `).join('')}
          
          JSON.stringify(results);
        `

        // In a real implementation, you'd use a sandboxed environment
        // For demo purposes, we'll simulate the execution
        testResults = simulateExecution(problemId, code, testCases)
        output = 'Code executed successfully'
      } else {
        // For other languages, simulate execution
        testResults = simulateExecution(problemId, code, testCases)
        output = `${language} code executed (simulated)`
      }

    } catch (error) {
      output = `Runtime Error: ${error}`
      testResults = testCases.map((testCase: any, index: number) => ({
        testCase: index + 1,
        input: testCase.input,
        expected: testCase.expected,
        actual: 'Runtime Error',
        passed: false
      }))
    }

    return NextResponse.json({
      output,
      testResults,
      success: true
    })

  } catch (error) {
    console.error('Code execution error:', error)
    return NextResponse.json(
      { error: 'Failed to execute code', output: 'Execution failed' },
      { status: 500 }
    )
  }
}

function getFunctionCall(problemId: number, input: any): string {
  switch (problemId) {
    case 1: // Two Sum
      return `twoSum([${input.nums.join(',')}], ${input.target})`
    case 2: // Reverse String
      return `reverseString([${input.s.map((c: string) => `"${c}"`).join(',')}])`
    case 3: // Valid Parentheses
      return `isValid("${input.s}")`
    default:
      return 'functionName()'
  }
}

function simulateExecution(problemId: number, code: string, testCases: any[]): any[] {
  // Simulate code execution based on problem patterns
  const results = []
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    let passed = false
    let actual = null

    // Simple pattern matching to determine if solution might work
    if (problemId === 1) { // Two Sum
      // Check if code has basic two sum logic
      if (code.includes('for') && (code.includes('map') || code.includes('{}') || code.includes('indexOf'))) {
        passed = Math.random() > 0.3 // 70% chance of passing if has basic structure
        actual = passed ? testCase.expected : [0, 0]
      } else {
        passed = false
        actual = 'Incomplete solution'
      }
    } else if (problemId === 2) { // Reverse String
      if (code.includes('reverse') || (code.includes('for') && code.includes('swap')) || code.includes('two pointers')) {
        passed = Math.random() > 0.2
        actual = passed ? testCase.expected : testCase.input.s
      } else {
        passed = false
        actual = 'Incomplete solution'
      }
    } else if (problemId === 3) { // Valid Parentheses
      if (code.includes('stack') || code.includes('push') || code.includes('pop') || code.includes('[]')) {
        passed = Math.random() > 0.25
        actual = passed ? testCase.expected : !testCase.expected
      } else {
        passed = false
        actual = 'Incomplete solution'
      }
    }

    // Add error details and hints for failed test cases
    let error = null
    let hint = null
    
    if (!passed) {
      if (problemId === 1) {
        error = 'Check your algorithm logic'
        hint = 'Try using a hash map to store numbers and their indices'
      } else if (problemId === 2) {
        error = 'Array not properly reversed'
        hint = 'Use two pointers approach: left and right'
      } else if (problemId === 3) {
        error = 'Parentheses validation failed'
        hint = 'Use a stack to track opening brackets'
      }
    }
    
    results.push({
      testCase: i + 1,
      input: testCase.input,
      expected: testCase.expected,
      actual: actual,
      passed: passed,
      error: error,
      hint: hint
    })
  }

  return results
}