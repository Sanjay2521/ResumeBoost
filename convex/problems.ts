import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const markSolved = mutation({
  args: {
    userId: v.string(),
    problemId: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("solvedProblems")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("problemId"), args.problemId))
      .first();

    if (!existing) {
      await ctx.db.insert("solvedProblems", {
        ...args,
        solvedAt: Date.now(),
      });
    }
  },
});

export const unmarkSolved = mutation({
  args: {
    userId: v.string(),
    problemId: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("solvedProblems")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("problemId"), args.problemId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const getSolvedProblems = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const solved = await ctx.db
      .query("solvedProblems")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    
    return solved.map(s => s.problemId);
  },
});