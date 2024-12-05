export const generatePrompt = (projectName: string, context: string, errors: string[], solutions: string[]): string => {
  const errorHistory = errors.length > 0
    ? `\n\nError History and Solutions:\n${errors.map((error, i) => 
        `Error ${i + 1}: ${error}\nSolution: ${solutions[i]}\n`
      ).join('\n')}`
    : '';

  return `Project: ${projectName}

Context:
${context}

Instructions for AI:
1. Maintain a detailed changelog in CHANGELOG.md
2. Keep files under 200 lines when possible
3. Add clear comments explaining code functionality
4. Document all changes and decisions
5. Reference previous error solutions when encountering similar issues${errorHistory}

Current Status:
[AI should list current status and progress here]

Next Steps:
[AI should outline planned next steps here]

Previous Solutions Summary:
[AI should reference relevant past solutions when encountering similar issues]`;
};