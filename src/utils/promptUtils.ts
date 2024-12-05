export const generatePrompt = (projectName: string, context: string): string => {
  return `Project: ${projectName}

Context:
${context}

Instructions for AI:
1. Maintain a detailed changelog in CHANGELOG.md
2. Keep files under 200 lines when possible
3. Add clear comments explaining code functionality
4. Document all changes and decisions

Current Status:
[AI should list current status and progress here]

Next Steps:
[AI should outline planned next steps here]`;
};