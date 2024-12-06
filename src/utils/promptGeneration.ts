interface ErrorSolution {
  error: string;
  solution: string;
  context: string;
  prevention: string;
}

export interface ProjectMemory {
  currentState: string;
  previousErrors: ErrorSolution[];
  importantDecisions: string[];
  workingConstraints: string[];
}

export function generateEnhancedPrompt(
  projectName: string,
  context: string,
  config: any,
  memory: ProjectMemory
): string {
  const prompt = `Project: ${projectName}

Context:
${context}

=== Working Memory ===
Current State: ${memory.currentState}

Important Decisions:
${memory.importantDecisions.map(d => `- ${d}`).join('\n')}

Working Constraints:
${memory.workingConstraints.map(c => `- ${c}`).join('\n')}

=== Error Prevention Protocol ===
Previously Encountered Issues:
${memory.previousErrors.map(error => `
Issue: ${error.error}
Solution: ${error.solution}
Context: ${error.context}
Prevention Strategy: ${error.prevention}`).join('\n')}

=== Self-Correction Guidelines ===
1. Before executing any command or making changes:
   - Verify all dependencies are properly configured
   - Check for type safety in TypeScript code
   - Ensure all imports are available
   - Validate framework compatibility

2. When encountering errors:
   - Document the error immediately
   - Record the context and solution
   - Update working memory with prevention strategy
   - Apply solution systematically

3. Continuous Improvement:
   - Keep track of all major decisions
   - Document why certain approaches were chosen
   - Maintain a list of working constraints
   - Update prevention strategies based on new learnings

=== Project Configuration ===
Type: ${config.type}
${config.ui ? `UI Framework: ${config.ui.framework}` : ''}
${config.deployment ? `Deployment: ${config.deployment.type}` : ''}

=== Next Steps ===
1. Review working memory before making changes
2. Apply relevant error prevention strategies
3. Document any new decisions or constraints
4. Update memory with new learnings

=== Current Task ===
[AI should describe the immediate task while considering all previous context]`;

  return prompt;
}

export const defaultWorkingMemory: ProjectMemory = {
  currentState: 'Initializing project',
  previousErrors: [
    {
      error: 'TypeScript build errors due to missing types',
      solution: 'Properly define all types and interfaces before implementation',
      context: 'During initial setup of NextUI components',
      prevention: 'Always start with type definitions and interface declarations before implementing components'
    },
    {
      error: 'Dependency conflicts between UI libraries',
      solution: 'Use a single UI library consistently throughout the project',
      context: 'Mixing Radix UI with NextUI components',
      prevention: 'Decide on UI framework upfront and stick to it exclusively'
    },
    {
      error: 'Build failures in deployment',
      solution: 'Ensure proper build configuration and test locally first',
      context: 'Deployment to production environment',
      prevention: 'Maintain a pre-deployment checklist including all necessary configurations'
    }
  ],
  importantDecisions: [
    'Using NextUI for consistent component library',
    'Implementing wizard interface for better user experience',
    'Maintaining working memory for error prevention'
  ],
  workingConstraints: [
    'All TypeScript types must be properly defined',
    'Single UI framework throughout the project',
    'Document all error solutions for future reference',
    'Test builds locally before deployment'
  ]
};