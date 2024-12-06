interface ErrorSolution {
  error: string;
  solution: string;
  context: string;
  prevention: string;
  impact: 'low' | 'medium' | 'high';
  timeToResolve: string;
}

interface CodeSnippet {
  description: string;
  code: string;
  context: string;
  successMetrics: string[];
}

interface ArchitecturalDecision {
  decision: string;
  reasoning: string;
  alternatives: string[];
  tradeoffs: string[];
}

interface DependencyMap {
  name: string;
  version: string;
  purpose: string;
  alternatives: string[];
}

interface PerformanceMetrics {
  metric: string;
  threshold: string;
  currentValue: string;
}

export interface ProjectMemory {
  currentState: string;
  previousErrors: ErrorSolution[];
  importantDecisions: string[];
  workingConstraints: string[];
  successfulPatterns: CodeSnippet[];
  architecturalDecisions: ArchitecturalDecision[];
  dependencies: DependencyMap[];
  performanceMetrics: PerformanceMetrics[];
  deploymentHistory: {
    environment: string;
    status: string;
    issues: string[];
    solutions: string[];
  }[];
  systemHealth: {
    category: string;
    status: 'good' | 'warning' | 'error';
    recommendations: string[];
  }[];
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

=== AI Assistant Optimization Protocol ===
1. Continuous Learning Mode:
   - Actively monitor for patterns in errors and solutions
   - Update prevention strategies based on new experiences
   - Build upon successful approaches
   - Adapt to changing project requirements

2. Response Optimization:
   - Start with type definitions and interfaces
   - Verify framework compatibility before implementation
   - Check for similar past solutions
   - Consider performance implications

3. Quality Assurance Protocol:
   - Validate all code against TypeScript standards
   - Ensure proper error handling
   - Maintain consistent coding patterns
   - Follow established project conventions

=== Working Memory ===
Current State: ${memory.currentState}

System Health Overview:
${memory.systemHealth.map(health => `${health.category}: ${health.status}
  Recommendations:
  ${health.recommendations.map(r => `  - ${r}`).join('\n')}`).join('\n')}

Architectural Decisions:
${memory.architecturalDecisions.map(decision => `
Decision: ${decision.decision}
Reasoning: ${decision.reasoning}
Alternatives Considered: ${decision.alternatives.join(', ')}
Tradeoffs: ${decision.tradeoffs.join(', ')}`).join('\n')}

Successful Patterns:
${memory.successfulPatterns.map(pattern => `
Pattern: ${pattern.description}
Context: ${pattern.context}
Success Metrics: ${pattern.successMetrics.join(', ')}`).join('\n')}

Dependency Management:
${memory.dependencies.map(dep => `- ${dep.name}@${dep.version}: ${dep.purpose}
  Alternatives: ${dep.alternatives.join(', ')}`).join('\n')}

Performance Metrics:
${memory.performanceMetrics.map(metric => `- ${metric.metric}: ${metric.currentValue} (Threshold: ${metric.threshold})`).join('\n')}

=== Error Prevention Protocol ===
Previously Encountered Issues:
${memory.previousErrors.map(error => `
Issue: ${error.error}
Impact: ${error.impact}
Resolution Time: ${error.timeToResolve}
Solution: ${error.solution}
Context: ${error.context}
Prevention Strategy: ${error.prevention}`).join('\n')}

=== Deployment History ===
${memory.deploymentHistory.map(deploy => `
Environment: ${deploy.environment}
Status: ${deploy.status}
Issues: ${deploy.issues.join(', ')}
Solutions: ${deploy.solutions.join(', ')}`).join('\n')}

=== Self-Improvement Protocol ===
1. Pre-Implementation Checklist:
   - Verify all types and interfaces
   - Check dependency compatibility
   - Review similar patterns in memory
   - Assess performance impact
   - Validate framework requirements

2. Code Quality Standards:
   - Follow TypeScript best practices
   - Implement proper error boundaries
   - Add comprehensive documentation
   - Include unit tests
   - Maintain consistent styling

3. Error Handling Strategy:
   - Log detailed error information
   - Implement graceful fallbacks
   - Update error prevention database
   - Document resolution steps
   - Add regression tests

4. Performance Optimization:
   - Monitor build size
   - Track render performance
   - Optimize dependencies
   - Implement lazy loading
   - Use memoization where appropriate

5. Deployment Safety:
   - Verify environment variables
   - Check build configuration
   - Test in staging environment
   - Implement feature flags
   - Plan rollback strategy

=== Project Configuration ===
Type: ${config.type}
${config.ui ? `UI Framework: ${config.ui.framework}` : ''}
${config.deployment ? `Deployment: ${config.deployment.type}` : ''}

=== Next Steps ===
1. Review system health and address any warnings
2. Apply relevant patterns from memory
3. Follow pre-implementation checklist
4. Monitor performance metrics
5. Document new learning

=== Current Task ===
[AI should describe the immediate task while considering all previous context and applying learned optimizations]

=== End of Enhanced Prompt ===`;

  return prompt;
}

// Example implementation continues with defaultWorkingMemory...