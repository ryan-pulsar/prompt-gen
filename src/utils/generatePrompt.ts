interface ProjectConfig {
  type: 'frontend' | 'backend' | 'fullstack';
  ui?: {
    framework: string;
    stateManagement: string;
    responsive: boolean;
  };
  backend?: {
    apiPattern: string;
    database: string;
    auth: boolean;
  };
  deployment: {
    type: string;
    frequency: string;
    environments: string[];
  };
  testing: {
    unit: boolean;
    integration: boolean;
    e2e: boolean;
  };
  security: {
    authMethod: string;
    encryption: boolean;
    compliance: string[];
  };
  scaling: {
    expectedLoad: string;
    dataVolume: string;
    distribution: string;
  };
}

export const generatePrompt = (
  projectName: string,
  context: string,
  config: ProjectConfig,
  errors: { description: string; solution: string }[] = []
): string => {
  let prompt = `Project: ${projectName}

Context:
${context}

`;

  // Project Type Specific Instructions
  prompt += 'Project Configuration:\n';
  prompt += `Type: ${config.type}\n`;

  if (config.type === 'frontend' || config.type === 'fullstack') {
    prompt += `\nFrontend Configuration:
- Framework: ${config.ui?.framework}
- State Management: ${config.ui?.stateManagement}
- Mobile Responsive: ${config.ui?.responsive ? 'Required' : 'Optional'}
`;
  }

  if (config.type === 'backend' || config.type === 'fullstack') {
    prompt += `\nBackend Configuration:
- API Pattern: ${config.backend?.apiPattern}
- Database: ${config.backend?.database}
- Authentication: ${config.backend?.auth ? 'Required' : 'Optional'}
`;
  }

  // Deployment Instructions
  prompt += `\nDeployment Configuration:
- Type: ${config.deployment.type}
- Frequency: ${config.deployment.frequency}
- Environments: ${config.deployment.environments.join(', ')}

Deployment Requirements:
1. Port Configuration: process.env.PORT || 80
2. Health Check Endpoints
3. Static File Serving
4. Environment Variables Management
`;

  // Testing Requirements
  if (Object.values(config.testing).some(Boolean)) {
    prompt += '\nTesting Requirements:\n';
    if (config.testing.unit) prompt += '- Unit Testing Required\n';
    if (config.testing.integration) prompt += '- Integration Testing Required\n';
    if (config.testing.e2e) prompt += '- E2E Testing Required\n';
  }

  // Security Configuration
  prompt += `\nSecurity Configuration:
- Authentication Method: ${config.security.authMethod}
- Encryption: ${config.security.encryption ? 'Required' : 'Optional'}
- Compliance: ${config.security.compliance.join(', ')}
`;

  // Scaling Considerations
  prompt += `\nScaling Configuration:
- Expected Load: ${config.scaling.expectedLoad}
- Data Volume: ${config.scaling.dataVolume}
- Geographic Distribution: ${config.scaling.distribution}
`;

  // Error History
  if (errors.length > 0) {
    prompt += '\nError History and Solutions:\n';
    errors.forEach((error, i) => {
      prompt += `Error ${i + 1}: ${error.description}\nSolution: ${error.solution}\n\n`;
    });
  }

  // Common Solutions
  prompt += `\nCommon Solutions Reference:
1. Deployment:
   - Configure correct ports and environment variables
   - Implement proper static file serving
   - Set up health checks

2. Development:
   - Follow coding standards and documentation practices
   - Implement proper error handling
   - Use version control best practices

3. Security:
   - Implement proper authentication and authorization
   - Handle sensitive data securely
   - Follow compliance requirements
`;

  return prompt;
};