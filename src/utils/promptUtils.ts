interface PromptOptions {
  includeErrorHandling: boolean;
  includeFileManagement: boolean;
  includeDocumentation: boolean;
  includeChangeLog: boolean;
}

export const generatePrompt = (
  projectName: string,
  context: string,
  errors: string[],
  solutions: string[],
  options: PromptOptions
): string => {
  let prompt = `Project: ${projectName}\n\nContext:\n${context}\n\nInstructions for AI:\n`;

  if (options.includeChangeLog) {
    prompt += '1. Maintain a detailed changelog in CHANGELOG.md\n';
  }

  if (options.includeFileManagement) {
    prompt += '2. Keep files under 200 lines when possible\n';
  }

  if (options.includeDocumentation) {
    prompt += '3. Add clear comments explaining code functionality\n';
    prompt += '4. Document all changes and decisions\n';
  }

  if (options.includeErrorHandling && errors.length > 0) {
    prompt += '\nError History and Solutions:\n';
    errors.forEach((error, i) => {
      prompt += `Error ${i + 1}: ${error}\nSolution: ${solutions[i]}\n\n`;
    });
  }

  prompt += '\nCurrent Status:\n[AI should list current status and progress here]\n\n';
  prompt += 'Next Steps:\n[AI should outline planned next steps here]';

  if (options.includeErrorHandling) {
    prompt += '\n\nPrevious Solutions Summary:\n[AI should reference relevant past solutions when encountering similar issues]';
  }

  return prompt;
};