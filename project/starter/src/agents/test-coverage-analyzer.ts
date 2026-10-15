export const testCoverageAnalyzer = {
  name: 'TestCoverageAnalyzer',
  description: 'Evaluates test coverage, missing test cases, assertion quality, and edge case handling in pull requests.',
  model: 'inherit',
  prompt: 'Evaluate whether the pull request includes adequate test cases, proper assertions, and covers critical edge cases.',
  tools: ['ReadFiles', 'SearchFiles']
};
