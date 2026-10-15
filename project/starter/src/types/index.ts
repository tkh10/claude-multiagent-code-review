import { z } from 'zod';

export const IssueSchema = z.object({
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.string(),
  file: z.string(),
  line: z.number().optional(),
  message: z.string(),
  recommendation: z.string()
});

export const TestRecommendationSchema = z.object({
  file: z.string(),
  suggestedCases: z.array(z.string())
});

export const RefactoringSuggestionSchema = z.object({
  file: z.string(),
  suggestion: z.string()
});

export const ReviewReportSchema = z.object({
  prNumber: z.number(),
  repository: z.string(),
  summary: z.string(),
  overallScore: z.number(),
  qualityScore: z.number(),
  testCoverageScore: z.number(),
  maintainabilityScore: z.number(),
  filesReviewed: z.array(z.object({
    path: z.string(),
    issuesCount: z.number(),
    summary: z.string()
  })),
  issues: z.array(IssueSchema),
  testRecommendations: z.array(TestRecommendationSchema),
  refactoringSuggestions: z.array(RefactoringSuggestionSchema)
});

export type ReviewReport = z.infer<typeof ReviewReportSchema>;
