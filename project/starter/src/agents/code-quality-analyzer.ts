export const codeQualityAnalyzer = {
  name: 'CodeQualityAnalyzer',
  description: 'Analyzes pull request code changes for security vulnerabilities, code smells, and adherence to best practices.',
  model: 'inherit',
  prompt: 'Analyze code changes for maintainability, potential security vulnerabilities, bugs, and overall code quality. Leverage skills when appropriate.',
  tools: ['ReadFiles', 'SearchFiles', 'Skill']
};
