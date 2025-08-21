import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { type, resumeText, jobDescription } = await request.json()

    let prompt = ''
    
    if (type === 'resume') {
      prompt = `Analyze this resume and provide insights on:
1. Key strengths and skills
2. Areas for improvement
3. Career level assessment
4. Suggestions for enhancement

Resume: ${resumeText}`
    } else {
      prompt = `Analyze this job description and provide:
1. Key requirements and skills needed
2. Experience level required
3. Company culture insights
4. Tips for applying

Job Description: ${jobDescription}`
    }

    // Calculate ATS score and analysis
    let atsScore = 0
    let mockResult = ''
    
    if (type === 'resume') {
      const wordCount = resumeText.split(' ').length
      const hasEmail = resumeText.includes('@')
      const hasPhone = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText)
      const hasSkills = /skills?|experience|proficient/i.test(resumeText)
      const hasEducation = /education|degree|university|college/i.test(resumeText)
      const hasExperience = /experience|worked|employed|position/i.test(resumeText)
      const hasKeywords = /javascript|python|react|node|sql|aws|docker/i.test(resumeText)
      
      // Calculate ATS Score
      if (hasEmail) atsScore += 15
      if (hasPhone) atsScore += 15
      if (hasSkills) atsScore += 20
      if (hasEducation) atsScore += 15
      if (hasExperience) atsScore += 20
      if (hasKeywords) atsScore += 15
      if (wordCount >= 300 && wordCount <= 800) atsScore += 10
      
      const status = 'Forwarded to Recruiter'
      
      mockResult = `🎯 ATS SCORE: ${atsScore}/100\n\n📊 STATUS: ${status}\n\n📋 Analysis:\n\n✅ Strengths:\n${hasEmail ? '• Contact information present\n' : ''}${hasSkills ? '• Skills section detected\n' : ''}${hasExperience ? '• Work experience found\n' : ''}\n❌ Areas to Improve:\n${!hasEmail ? '• Add contact email\n' : ''}${!hasSkills ? '• Include skills section\n' : ''}${!hasKeywords ? '• Add relevant technical keywords\n' : ''}\n💡 Recommendations:\n• Use action verbs (managed, developed, implemented)\n• Quantify achievements with numbers\n• Match job description keywords`
    } else {
      const wordCount = jobDescription.split(' ').length
      const hasRequirements = /require|must|should|prefer/i.test(jobDescription)
      const hasSalary = /salary|\$|compensation|pay/i.test(jobDescription)
      const hasRemote = /remote|work from home|wfh/i.test(jobDescription)
      
      mockResult = `📋 Job Analysis (${wordCount} words):\n\n🔍 Key Details:\n${hasRequirements ? '✅' : '❌'} Requirements specified\n${hasSalary ? '✅' : '❌'} Salary information\n${hasRemote ? '✅' : '❌'} Remote work mentioned\n\n🎯 Application Strategy:\n• Competition: ${hasRequirements ? 'High (specific requirements)' : 'Moderate (general posting)'}\n• Focus: ${hasRemote ? 'Highlight remote experience' : 'Emphasize office collaboration'}\n\n💡 Tips:\n• Tailor resume to match keywords\n• Address specific requirements\n• Show measurable achievements`
    }

    return NextResponse.json({ 
      result: mockResult, 
      atsScore: type === 'resume' ? atsScore : null,
      passedToRecruiter: type === 'resume'
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}