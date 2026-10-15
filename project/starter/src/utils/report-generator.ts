import fs from 'fs';
import path from 'path';
import { ReviewReport } from '../types/index.js';

export class ReportGenerator {
  async generateJSON(report: ReviewReport, outputPath: string): Promise<void> {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }

  async generateMarkdown(report: ReviewReport, outputPath: string): Promise<void> {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const md = `# PR Review Report: PR #${report.prNumber} (${report.repository})

## Summary
${report.summary}

## Scores
- **Overall Score:** ${report.overallScore}/100
- **Code Quality:** ${report.qualityScore}/100
- **Test Coverage:** ${report.testCoverageScore}/100
- **Maintainability:** ${report.maintainabilityScore}/100

## Issues Found
${report.issues.map(i => `- **[${i.severity.toUpperCase()}]**${i.category} in \`${i.file}\`: ${i.message}`).join('\n')}
`;
    fs.writeFileSync(outputPath, md);
  }

  async generateHTML(report: ReviewReport, outputPath: string): Promise<void> {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>PR #${report.prNumber} Review Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; background: #f4f4f9; color: #333; }
    h1, h2 { color: #0066cc; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>PR Review Report: PR #${report.prNumber}</h1>
    <p><strong>Repository:</strong> ${report.repository}</p>
    <h2>Summary</h2>
    <p>${report.summary}</p>
    <h2>Scores</h2>
    <ul>
      <li>Overall Score: ${report.overallScore}/100</li>
      <li>Code Quality: ${report.qualityScore}/100</li>
      <li>Test Coverage: ${report.testCoverageScore}/100</li>
      <li>Maintainability: ${report.maintainabilityScore}/100</li>
    </ul>
  </div>
</body>
</html>`;
    fs.writeFileSync(outputPath, html);
  }
}
