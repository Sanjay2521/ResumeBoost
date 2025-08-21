import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { questions, answers } = await request.json()

    let totalScore = 0
    let attempted = 0
    let correct = 0
    const categoryScores: { [key: string]: number[] } = {}
    const questionAnalysis = []

    // Evaluate each answer
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      const userAnswer = answers[i] || ''
      
      if (userAnswer.trim().length > 0) {
        attempted++
      }

      // Calculate score for this question
      let questionScore = 0
      const keywordsFound = []
      const missingKeywords = []

      if (userAnswer.trim().length > 0) {
        const answerLower = userAnswer.toLowerCase()
        
        // Check for expected keywords
        for (const keyword of question.expectedKeywords) {
          if (answerLower.includes(keyword.toLowerCase())) {
            keywordsFound.push(keyword)
            questionScore += 20 // Each keyword worth 20 points (max 100)
          } else {
            missingKeywords.push(keyword)
          }
        }

        // Bonus points for structure and completeness
        if (answerLower.includes('begin') || answerLower.includes('start') || answerLower.includes('function')) {
          questionScore += 10
        }
        if (answerLower.includes('end') || answerLower.includes('return')) {
          questionScore += 10
        }
        if (userAnswer.length > 50) {
          questionScore += 10 // Detailed answer bonus
        }
        if (answerLower.includes('if') || answerLower.includes('while') || answerLower.includes('for')) {
          questionScore += 10 // Control structure bonus
        }

        questionScore = Math.min(questionScore, 100) // Cap at 100
      }

      if (questionScore >= 70) {
        correct++
      }

      totalScore += questionScore

      // Track category scores
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = []
      }
      categoryScores[question.category].push(questionScore)

      questionAnalysis.push({
        question: question.question,
        category: question.category,
        difficulty: question.difficulty,
        userAnswer: userAnswer,
        score: questionScore,
        keywordsFound: keywordsFound,
        missingKeywords: missingKeywords
      })
    }

    // Calculate category averages
    const categoryAverages: { [key: string]: number } = {}
    for (const [category, scores] of Object.entries(categoryScores)) {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
      categoryAverages[category] = Math.round(average)
    }

    const overallScore = Math.round(totalScore / questions.length)

    // Generate strengths and improvements
    const strengths = []
    const improvements = []

    if (attempted >= 18) {
      strengths.push("Completed most questions - shows persistence")
    }
    if (correct >= 10) {
      strengths.push("Strong algorithmic thinking")
    }
    if (categoryAverages['Data Structures'] >= 70) {
      strengths.push("Good understanding of data structures")
    }
    if (categoryAverages['Algorithms'] >= 70) {
      strengths.push("Solid grasp of algorithmic concepts")
    }

    if (attempted < 15) {
      improvements.push("Try to attempt more questions - practice time management")
    }
    if (correct < 8) {
      improvements.push("Focus on understanding core algorithmic patterns")
    }
    if (categoryAverages['Data Structures'] < 50) {
      improvements.push("Study fundamental data structures (arrays, linked lists, stacks, queues)")
    }
    if (categoryAverages['Algorithms'] < 50) {
      improvements.push("Practice basic sorting and searching algorithms")
    }
    if (categoryAverages['Graph Algorithms'] < 50) {
      improvements.push("Learn graph traversal algorithms (BFS, DFS)")
    }
    if (categoryAverages['Dynamic Programming'] < 50) {
      improvements.push("Study dynamic programming concepts and patterns")
    }

    // Default messages if arrays are empty
    if (strengths.length === 0) {
      strengths.push("Shows willingness to attempt technical challenges")
      strengths.push("Demonstrates basic programming knowledge")
    }

    if (improvements.length === 0) {
      improvements.push("Continue practicing algorithmic problem solving")
      improvements.push("Focus on writing clear, structured pseudo-code")
    }

    return NextResponse.json({
      overallScore,
      attempted,
      correct,
      categoryScores: categoryAverages,
      questionAnalysis,
      strengths,
      improvements,
      totalQuestions: questions.length
    })

  } catch (error) {
    console.error('Technical evaluation error:', error)
    return NextResponse.json(
      { error: 'Failed to evaluate technical assessment' },
      { status: 500 }
    )
  }
}