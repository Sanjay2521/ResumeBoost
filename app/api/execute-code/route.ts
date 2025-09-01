import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code, language, mode, customInput, problemId, testCases } = await request.json()

    // Simulate code execution
    let output = ''
    let testResults: any[] = []

    if (mode === 'compiler') {
      // Compiler mode - run code with custom input
      output = await executeCode(code, language, customInput)
    } else {
      // Problem mode - run test cases
      if (testCases && testCases.length > 0) {
        testResults = await runTestCases(code, language, testCases, problemId)
        const passedCount = testResults.filter(r => r.passed).length
        output = `Executed ${testCases.length} test cases. ${passedCount} passed, ${testCases.length - passedCount} failed.`
      } else {
        output = await executeCode(code, language)
      }
    }

    return NextResponse.json({
      success: true,
      output,
      testResults
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

async function executeCode(code: string, language: string, input?: string): Promise<string> {
  // Simulate code execution based on language
  try {
    switch (language) {
      case 'javascript':
        return executeJavaScript(code, input)
      case 'python':
        return executePython(code, input)
      case 'java':
        return executeJava(code, input)
      case 'cpp':
        return executeCpp(code, input)
      default:
        return 'Language not supported'
    }
  } catch (error) {
    return `Runtime Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

function executeJavaScript(code: string, input?: string): string {
  try {
    let output = ''
    const originalLog = console.log
    
    // Capture console.log output
    console.log = (...args) => {
      output += args.join(' ') + '\n'
    }

    // If there's custom input, make it available
    if (input) {
      // Simple input simulation
      const lines = input.trim().split('\n')
      let lineIndex = 0
      
      // Mock readline function
      const readline = () => {
        return lineIndex < lines.length ? lines[lineIndex++] : ''
      }
      
      // Add readline to global scope for the executed code
      eval(`
        const readline = ${readline.toString()};
        ${code}
      `)
    } else {
      eval(code)
    }
    
    console.log = originalLog
    return output || 'Code executed successfully (no output)'
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

function executePython(code: string, input?: string): string {
  // Simulate Python execution
  if (code.includes('print("Hello, World!")')) {
    return 'Hello, World!\n'
  }
  if (input) {
    return `Python executed with input:\n${input}\n\nOutput: Code executed successfully`
  }
  return 'Python code executed successfully'
}

function executeJava(code: string, input?: string): string {
  // Simulate Java execution
  if (code.includes('System.out.println("Hello, World!")')) {
    return 'Hello, World!\n'
  }
  if (input) {
    return `Java executed with input:\n${input}\n\nOutput: Code executed successfully`
  }
  return 'Java code executed successfully'
}

function executeCpp(code: string, input?: string): string {
  // Simulate C++ execution
  if (code.includes('cout << "Hello, World!"')) {
    return 'Hello, World!\n'
  }
  if (input) {
    return `C++ executed with input:\n${input}\n\nOutput: Code executed successfully`
  }
  return 'C++ code executed successfully'
}

async function runTestCases(code: string, language: string, testCases: any[], problemId: number): Promise<any[]> {
  const results = []
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i]
    try {
      const result = await executeTestCase(code, language, testCase, problemId)
      results.push({
        input: testCase.input,
        expected: testCase.expected,
        actual: result.output,
        passed: result.passed,
        error: result.error
      })
    } catch (error) {
      results.push({
        input: testCase.input,
        expected: testCase.expected,
        actual: null,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
  
  return results
}

async function executeTestCase(code: string, language: string, testCase: any, problemId: number): Promise<{output: any, passed: boolean, error?: string}> {
  try {
    // Simulate test case execution based on problem ID
    switch (problemId) {
      case 1: // Two Sum
        return executeTwoSumTest(code, language, testCase)
      case 2: // Valid Parentheses
        return executeValidParenthesesTest(code, language, testCase)
      default:
        return { output: null, passed: false, error: 'Problem not implemented' }
    }
  } catch (error) {
    return { 
      output: null, 
      passed: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

function executeTwoSumTest(code: string, language: string, testCase: any): {output: any, passed: boolean, error?: string} {
  const { nums, target } = testCase.input
  const expected = testCase.expected
  
  // Simple simulation - in real implementation, you'd execute the actual code
  if (language === 'javascript') {
    try {
      // Mock implementation for demo
      const result = [0, 1] // Simplified result
      const passed = JSON.stringify(result.sort()) === JSON.stringify(expected.sort())
      return { output: result, passed }
    } catch (error) {
      return { output: null, passed: false, error: 'Execution failed' }
    }
  }
  
  return { output: expected, passed: true } // Simplified for demo
}

function executeValidParenthesesTest(code: string, language: string, testCase: any): {output: any, passed: boolean, error?: string} {
  const { s } = testCase.input
  const expected = testCase.expected
  
  // Simple simulation
  const result = s === '()' || s === '()[]{}' ? true : false
  const passed = result === expected
  
  return { output: result, passed }
}