import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { resumeText, fileName } = await request.json()

    // Calculate comprehensive score
    let score = 0
    const improvements = []
    
    // Contact Information (20 points)
    const hasEmail = resumeText.includes('@')
    const hasPhone = /\d{3}[-.\\s]?\d{3}[-.\\s]?\d{4}/.test(resumeText)
    if (hasEmail) score += 10
    if (hasPhone) score += 10
    if (!hasEmail) improvements.push("Add a professional email address")
    if (!hasPhone) improvements.push("Include your phone number")

    // Skills Section (25 points)
    const hasSkills = /skills?|technologies|proficient|experience/i.test(resumeText)
    const techKeywords = /javascript|python|react|node|sql|aws|docker|git|java|css|html/i.test(resumeText)
    if (hasSkills) score += 15
    if (techKeywords) score += 10
    if (!hasSkills) improvements.push("Add a dedicated skills section")
    if (!techKeywords) improvements.push("Include relevant technical keywords")

    // Experience Section (25 points)
    const hasExperience = /experience|worked|employed|position|role/i.test(resumeText)
    const hasQuantifiableResults = /\d+%|\d+\+|increased|improved|reduced|managed \d+/i.test(resumeText)
    if (hasExperience) score += 15
    if (hasQuantifiableResults) score += 10
    if (!hasExperience) improvements.push("Add work experience or projects")
    if (!hasQuantifiableResults) improvements.push("Include quantifiable achievements (numbers, percentages)")

    // Education (15 points)
    const hasEducation = /education|degree|university|college|bachelor|master/i.test(resumeText)
    if (hasEducation) score += 15
    else improvements.push("Include your educational background")

    // Format & Length (15 points)
    const wordCount = resumeText.split(' ').length
    if (wordCount >= 200 && wordCount <= 600) score += 10
    if (fileName.toLowerCase().includes('resume') || fileName.toLowerCase().includes('cv')) score += 5
    if (wordCount < 200) improvements.push("Expand your resume with more details")
    if (wordCount > 600) improvements.push("Make your resume more concise")

    // Determine suggested roles based on content
    const suggestedRoles = []
    
    if (/javascript|react|frontend|web development/i.test(resumeText)) {
      suggestedRoles.push({
        title: "Frontend Developer",
        match: Math.min(95, score + 10),
        reason: "Strong match based on web development skills"
      })
    }
    
    if (/python|data|analytics|machine learning/i.test(resumeText)) {
      suggestedRoles.push({
        title: "Data Analyst",
        match: Math.min(90, score + 5),
        reason: "Good fit for data-related skills mentioned"
      })
    }
    
    if (/aws|cloud|devops|docker|kubernetes/i.test(resumeText)) {
      suggestedRoles.push({
        title: "Cloud Engineer",
        match: Math.min(88, score + 3),
        reason: "Cloud technologies align with this role"
      })
    }
    
    if (/java|backend|api|database/i.test(resumeText)) {
      suggestedRoles.push({
        title: "Backend Developer",
        match: Math.min(85, score),
        reason: "Backend development skills detected"
      })
    }

    // Default roles if no specific match
    if (suggestedRoles.length === 0) {
      suggestedRoles.push(
        {
          title: "Software Developer",
          match: Math.max(60, score - 10),
          reason: "General programming skills suitable for development roles"
        },
        {
          title: "IT Support Specialist",
          match: Math.max(55, score - 15),
          reason: "Technical background fits support roles"
        }
      )
    }

    // Ensure we have at least 2-3 roles
    if (suggestedRoles.length < 3) {
      suggestedRoles.push({
        title: "Junior Developer",
        match: Math.max(50, score - 20),
        reason: "Entry-level position to build experience"
      })
    }

    // Add some default improvements if list is short
    if (improvements.length < 3) {
      improvements.push("Use action verbs (developed, managed, implemented)")
      improvements.push("Add relevant certifications or courses")
      improvements.push("Include links to portfolio or GitHub")
    }

    return NextResponse.json({
      score: Math.min(100, score),
      improvements: improvements.slice(0, 5), // Limit to 5 improvements
      suggestedRoles: suggestedRoles.slice(0, 3), // Top 3 roles
      analysis: `Resume analyzed successfully. Score: ${score}/100`
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}