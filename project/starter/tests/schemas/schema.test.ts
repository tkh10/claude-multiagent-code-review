import { describe, it, expect } from 'vitest';
import { ReviewReportSchema } from '../../src/types/index.js';

describe('ReviewReport Schema', () => {
  it('should accept valid review report data', () => {
    const validData = {
      prNumber: 1,
      repository: 'udacity/cd14715-simple-todo-app',
      summary: 'Good PR',
      overallScore: 90,
      qualityScore: 90,
      testCoverageScore: 90,
      maintainabilityScore: 90,
      filesReviewed: [{ path: 'src/index.js', issuesCount: 0, summary: 'Clean' }],
      issues: [],
      testRecommendations: [],
      refactoringSuggestions: []
    };
    expect(() => ReviewReportSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid data missing required fields', () => {
    const invalidData = {
      prNumber: 'one'
    };
    expect(() => ReviewReportSchema.parse(invalidData)).toThrow();
  });
});
