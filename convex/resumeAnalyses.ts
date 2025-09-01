import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createResumeAnalysis = mutation({
  args: {
    userId: v.string(),
    fileName: v.string(),
    score: v.number(),
    improvements: v.array(v.string()),
    suggestedRoles: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("resumeAnalyses", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getUserResumeAnalyses = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resumeAnalyses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getLatestResumeAnalysis = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const analyses = await ctx.db
      .query("resumeAnalyses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    
    return analyses.sort((a, b) => b.createdAt - a.createdAt)[0] || null;
  },
});