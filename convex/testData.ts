import { mutation } from "./_generated/server";

export const insertTestData = mutation({
  args: {},
  handler: async (ctx) => {
    // Insert test user
    const userId = "test_user_123";
    await ctx.db.insert("users", {
      userId,
      email: "test@example.com",
      name: "Test User",
      createdAt: Date.now(),
    });

    // Insert test resume analysis
    await ctx.db.insert("resumeAnalyses", {
      userId,
      fileName: "test_resume.pdf",
      score: 85,
      improvements: [
        "Add more technical keywords",
        "Quantify achievements with numbers",
        "Include relevant certifications"
      ],
      suggestedRoles: [
        "Frontend Developer",
        "Full Stack Developer",
        "Software Engineer"
      ],
      createdAt: Date.now(),
    });

    // Insert test solved problems
    await ctx.db.insert("solvedProblems", {
      userId,
      problemId: 1,
      solvedAt: Date.now(),
    });

    await ctx.db.insert("solvedProblems", {
      userId,
      problemId: 2,
      solvedAt: Date.now() - 86400000, // 1 day ago
    });

    return "Test data inserted successfully";
  },
});