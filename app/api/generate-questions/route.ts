import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
    // In a real app, you'd fetch user's resume data from database
    // For now, we'll generate dynamic questions based on common scenarios
    
    const questionTemplates = [
      {
        category: 'experience',
        questions: [
          "Tell me about a specific project where you used [SKILL]. What was your role and what did you accomplish?",
          "Describe a time when you had to learn [TECHNOLOGY] quickly. How did you approach it?",
          "Walk me through your experience with [DOMAIN]. What challenges did you face?"
        ]
      },
      {
        category: 'technical',
        questions: [
          "How would you explain [CONCEPT] to someone without technical background?",
          "What's your approach to debugging when working with [TECHNOLOGY]?",
          "Tell me about a time you optimized performance in a [PROJECT_TYPE] project."
        ]
      },
      {
        category: 'behavioral',
        questions: [
          "Describe a situation where you had to work with a difficult team member. How did you handle it?",
          "Tell me about a time you missed a deadline. What happened and what did you learn?",
          "How do you stay updated with the latest trends in [FIELD]?"
        ]
      },
      {
        category: 'problem_solving',
        questions: [
          "Walk me through how you would approach solving [PROBLEM_TYPE].",
          "Describe a complex problem you solved recently. What was your thought process?",
          "How do you prioritize tasks when working on multiple projects?"
        ]
      },
      {
        category: 'future',
        questions: [
          "Where do you see yourself in 3 years in the [FIELD] industry?",
          "What type of projects excite you the most and why?",
          "How do you plan to develop your skills in [AREA]?"
        ]
      }
    ]

    // Simulate personalization based on common tech skills/roles
    const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker']
    const technologies = ['React', 'Angular', 'Vue.js', 'Express', 'Django', 'Spring Boot']
    const domains = ['web development', 'mobile development', 'data science', 'cloud computing']
    const concepts = ['REST APIs', 'microservices', 'database design', 'authentication']
    const fields = ['software development', 'data engineering', 'DevOps', 'frontend development']

    const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)]
    
    const personalizedQuestions = []
    
    // Generate 5 personalized questions
    for (let i = 0; i < 5; i++) {
      const category = questionTemplates[i % questionTemplates.length]
      const template = category.questions[Math.floor(Math.random() * category.questions.length)]
      
      // Replace placeholders with random relevant terms
      let question = template
        .replace('[SKILL]', getRandomItem(skills))
        .replace('[TECHNOLOGY]', getRandomItem(technologies))
        .replace('[DOMAIN]', getRandomItem(domains))
        .replace('[CONCEPT]', getRandomItem(concepts))
        .replace('[FIELD]', getRandomItem(fields))
        .replace('[PROJECT_TYPE]', getRandomItem(['web application', 'mobile app', 'API', 'dashboard']))
        .replace('[PROBLEM_TYPE]', getRandomItem(['a performance issue', 'a scalability challenge', 'a user experience problem']))
        .replace('[AREA]', getRandomItem(['frontend technologies', 'backend systems', 'cloud platforms', 'data analysis']))
      
      personalizedQuestions.push(question)
    }

    // Add some variety with completely custom questions
    const customQuestions = [
      "If you had to choose between writing clean code or meeting a tight deadline, how would you approach this dilemma?",
      "Describe your ideal development environment and tools. Why do these work best for you?",
      "Tell me about a time you had to explain a technical concept to a non-technical stakeholder.",
      "How do you approach code reviews? What do you look for when reviewing others' code?",
      "What's the most interesting technical challenge you've encountered recently?"
    ]

    // Mix personalized and custom questions
    const finalQuestions = [
      ...personalizedQuestions.slice(0, 3),
      ...customQuestions.slice(0, 2)
    ]

    return NextResponse.json({
      questions: finalQuestions,
      message: 'Personalized questions generated successfully'
    })

  } catch (error) {
    console.error('Question generation error:', error)
    
    // Fallback questions
    const fallbackQuestions = [
      "Tell me about your background and what led you to this field.",
      "Describe a challenging project you've worked on and how you approached it.",
      "What technologies are you most excited about and why?",
      "How do you handle working under pressure or tight deadlines?",
      "Where do you see your career heading in the next few years?"
    ]
    
    return NextResponse.json({
      questions: fallbackQuestions,
      message: 'Fallback questions provided'
    })
  }
}