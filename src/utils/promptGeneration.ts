import type { ProjectConfig, SystemHealth } from '../types';

interface ErrorSolution {
  error: string;
  solution: string;
  context: string;
  prevention: string;
  impact: 'low' | 'medium' | 'high';
  timeToResolve: string;
}

interface ProjectMemory {
  currentState: string;
  previousErrors: ErrorSolution[];
  importantDecisions: string[];
  workingConstraints: string[];
  systemHealth: SystemHealth[];
  [key: string]: any; // Allow additional properties
}

export function generateEnhancedPrompt(
  projectName: string,
  context: string,
  config: ProjectConfig,
  memory: ProjectMemory
): string {
  const prompt = `Project: ${projectName}

Context:
${context}

=== Working Memory ===
Current State: ${memory.currentState}

System Health:
${memory.systemHealth.map(health => `${health.category}: ${health.status}
  Recommendations:
  ${health.recommendations.map(r => `  - ${r}`).join('\n')}`).join('\n')}

=== Error Prevention Protocol ===
Previously Encountered Issues:
${memory.previousErrors.map(error => `
Issue: ${error.error}
Impact: ${error.impact}
Resolution Time: ${error.timeToResolve}
Solution: ${error.solution}
Context: ${error.context}
Prevention Strategy: ${error.prevention}`).join('\n')}

=== Project Configuration ===
Type: ${config.type}
${config.ui ? `UI Framework: ${config.ui.framework}` : ''}
${config.deployment ? `Deployment: ${config.deployment.type}` : ''}

=== Next Steps ===
1. Review system health and address any warnings
2. Apply relevant patterns from memory
3. Follow pre-implementation checklist
4. Monitor performance metrics
5. Document new learning`;

  return prompt;
}