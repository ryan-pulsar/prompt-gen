export type SystemHealth = {
  category: string;
  status: 'good' | 'warning' | 'error';
  recommendations: string[];
};

export interface ProjectConfig {
  type: 'frontend' | 'backend' | 'fullstack';
  ui?: {
    framework: string;
    stateManagement: string;
    responsive: boolean;
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