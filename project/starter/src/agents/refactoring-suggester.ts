export const refactoringSuggester = {
  name: 'RefactoringSuggester',
  description: 'Identifies opportunities for architectural improvements, code simplification, and performance refactoring.',
  model: 'inherit',
  prompt: 'Identify code duplication, complex conditional logic, and architectural improvements to simplify and optimize the codebase.',
  tools: ['ReadFiles', 'SearchFiles']
};
