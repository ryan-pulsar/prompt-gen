export interface ProjectConfig {
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