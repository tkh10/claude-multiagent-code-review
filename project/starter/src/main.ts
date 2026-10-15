import { validateEnv } from './config/env.js';
import { Orchestrator } from './orchestrator.js';
import { ReportGenerator } from './utils/report-generator.js';

async function main() {
  validateEnv();

  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.error('Usage: npm run dev <owner> <repo> <pr-number>');
    console.error('Example: npm run dev udacity cd14715-simple-todo-app 1');
    process.exit(1);
  }

  const owner = args[0] as string;
  const repo = args[1] as string;
  const prNumberStr = args[2] as string;
  const prNumber = parseInt(prNumberStr, 10);

  if (isNaN(prNumber) || prNumber <= 0) {
    console.error(`Error: PR number must be a positive integer, got: "${prNumberStr}"`);
    process.exit(1);
  }

  try {
    console.log(`[info]: Starting code review for ${owner}/${repo} PR #${prNumber}...`);
    const orchestrator = new Orchestrator();
    const result = await orchestrator.reviewPullRequest(owner, repo, prNumber);

    const generator = new ReportGenerator();
    const baseName = `reports/pr-${prNumber}-report`;
    await generator.generateJSON(result, `${baseName}.json`);
    await generator.generateMarkdown(result, `${baseName}.md`);
    await generator.generateHTML(result, `${baseName}.html`);

    console.log(`[info]: ✓ Review complete. Reports saved to reports/ directory.`);
  } catch (error) {
    console.error('[error]: Failed to complete pull request review:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred during execution.');
    }
    process.exit(1);
  }
}

main();
