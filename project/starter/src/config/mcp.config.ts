import { env } from './env.js';

export const mcpServersConfig = {
  github: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github@2025.4.8'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: env.GITHUB_TOKEN
    }
  },
  eslint: {
    command: 'npx',
    args: ['-y', '@eslint/mcp@latest']
  }
};
