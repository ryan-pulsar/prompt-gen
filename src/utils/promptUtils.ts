interface PromptOptions {
  includeErrorHandling: boolean;
  includeFileManagement: boolean;
  includeDocumentation: boolean;
  includeChangeLog: boolean;
  // Deployment
  includeDeployment: boolean;
  deploymentType?: 'docker' | 'kubernetes' | 'standard';
  includeInfrastructure: boolean;
  // Error Prevention
  includeRateLimiting: boolean;
  includeTokenManagement: boolean;
  includeErrorRecovery: boolean;
  // Project Management
  includeVersionControl: boolean;
  includeBranchStrategy: boolean;
  includeCodeReview: boolean;
  // Performance
  includeCaching: boolean;
  includeLoadBalancing: boolean;
  includeOptimization: boolean;
}

interface DeploymentInfo {
  type: string;
  ports: string[];
  environment: string;
  buildCommands: string[];
}

export const generatePrompt = (
  projectName: string,
  context: string,
  errors: string[],
  solutions: string[],
  options: PromptOptions,
  deploymentInfo?: DeploymentInfo
): string => {
  let prompt = `Project: ${projectName}

Context:
${context}

`;

  // Add deployment context if needed
  if (options.includeDeployment && deploymentInfo) {
    prompt += `Deployment Configuration:
- Type: ${deploymentInfo.type}
- Ports: ${deploymentInfo.ports.join(', ')}
- Environment: ${deploymentInfo.environment}
- Build Commands: ${deploymentInfo.buildCommands.join('\n  ')}

`;
  }

  prompt += 'Instructions for AI:\n';

  // Core Features
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

  // Deployment Instructions
  if (options.includeDeployment) {
    prompt += `\nDeployment Guidelines:
- Always use process.env.PORT || 80 for port configuration
- Include proper Dockerfile and docker-compose.yml
- Add health check endpoints
- Handle static file serving correctly
- Consider rate limits and token restrictions
`;
  }

  // Error Prevention
  if (options.includeErrorRecovery) {
    prompt += `\nError Prevention and Recovery:
- Implement proper error handling
- Add fallback strategies
- Include retry mechanisms
- Log errors comprehensively
`;
  }

  // Version Control
  if (options.includeVersionControl) {
    prompt += `\nVersion Control Guidelines:
- Use semantic versioning
- Follow conventional commits
- Include proper branch management
- Document PR requirements
`;
  }

  // Performance Considerations
  if (options.includeOptimization) {
    prompt += `\nPerformance Requirements:
- Optimize build process
- Implement caching strategies
- Consider load balancing
- Monitor resource usage
`;
  }

  // Error History
  if (options.includeErrorHandling && errors.length > 0) {
    prompt += '\nError History and Solutions:\n';
    errors.forEach((error, i) => {
      prompt += `Error ${i + 1}: ${error}\nSolution: ${solutions[i]}\n\n`;
    });
  }

  // Previous Deployment Solutions
  prompt += `\nCommon Deployment Solutions:
1. Port/Networking Issues:
   - Use process.env.PORT || 80
   - Expose correct ports in Dockerfile
   - Configure nginx properly if used

2. Build Process:
   - Handle TypeScript configuration
   - Manage dependencies correctly
   - Set up proper build commands

3. Static File Serving:
   - Use Express static middleware
   - Configure proper paths
   - Handle SPA routing

4. Environment Variables:
   - Document all required variables
   - Provide example .env file
   - Handle defaults properly
`;

  prompt += '\nCurrent Status:\n[AI should list current status and progress here]\n\n';
  prompt += 'Next Steps:\n[AI should outline planned next steps here]';

  if (options.includeErrorHandling) {
    prompt += '\n\nPrevious Solutions Summary:\n[AI should reference relevant past solutions when encountering similar issues]';
  }

  return prompt;
};