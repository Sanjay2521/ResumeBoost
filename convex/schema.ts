import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  resumeAnalyses: defineTable({
    userId: v.string(),
    fileName: v.string(),
    score: v.number(),
    improvements: v.array(v.string()),
    suggestedRoles: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  solvedProblems: defineTable({
    userId: v.string(),
    problemId: v.number(),
    solvedAt: v.number(),
  }).index("by_userId", ["userId"]),
});