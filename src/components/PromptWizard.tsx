import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Progress,
  Divider
} from '@nextui-org/react';
import type { ProjectConfig } from '../types';

const defaultConfig: ProjectConfig = {
  type: 'frontend',
  ui: {
    framework: 'react',
    stateManagement: 'none',
    responsive: true
  },
  deployment: {
    type: 'docker',
    frequency: 'continuous',
    environments: ['development', 'production']
  },
  testing: {
    unit: true,
    integration: false,
    e2e: false
  },
  security: {
    authMethod: 'none',
    encryption: false,
    compliance: []
  },
  scaling: {
    expectedLoad: 'low',
    dataVolume: 'small',
    distribution: 'single-region'
  }
};

const TOTAL_STEPS = 4;

const PromptWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const stepTitles = [
    'Project Details',
    'Project Type',
    'Features',
    'Generate'
  ];

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleTypeChange = (value: string) => {
    setConfig({
      ...config,
      type: value as 'frontend' | 'backend' | 'fullstack'
    });
  };

  const handleFeatureChange = (values: string[]) => {
    setConfig({
      ...config,
      testing: {
        ...config.testing,
        unit: values.includes('unit'),
        integration: values.includes('integration'),
        e2e: values.includes('e2e')
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Project Details</h2>
            <Input
              label="Project Name"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="max-w-md"
            />
            <Textarea
              label="Project Context"
              placeholder="Describe your project context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="max-w-md"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Project Type</h2>
            <RadioGroup
              label="Select project type"
              value={config.type}
              onValueChange={handleTypeChange}
            >
              <Radio value="frontend">Frontend</Radio>
              <Radio value="backend">Backend</Radio>
              <Radio value="fullstack">Full Stack</Radio>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Features & Requirements</h2>
            <CheckboxGroup
              label="Select testing features"
              value={Object.entries(config.testing)
                .filter(([_, value]) => value)
                .map(([key]) => key)}
              onValueChange={handleFeatureChange}
            >
              <Checkbox value="unit">Unit Testing</Checkbox>
              <Checkbox value="integration">Integration Testing</Checkbox>
              <Checkbox value="e2e">E2E Testing</Checkbox>
            </CheckboxGroup>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Generated Prompt</h2>
            <Card>
              <CardBody>
                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">
                  {generatedPrompt || 'Click generate to create your prompt'}
                </pre>
              </CardBody>
            </Card>
            <Button
              color="primary"
              onPress={() => setGeneratedPrompt('Generated prompt will appear here')}
            >
              Generate Prompt
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardBody className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Progress
                  aria-label="Progress"
                  value={progress}
                  className="max-w-md"
                  color="primary"
                />
                <div className="flex justify-between max-w-md">
                  {stepTitles.map((title, index) => (
                    <span
                      key={title}
                      className={`text-sm ${index + 1 === currentStep ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>

              <Divider className="my-4" />

              <div className="mt-8">
                {renderStepContent()}
              </div>

              <Divider className="my-4" />

              <div className="flex justify-between mt-8">
                <Button
                  onPress={handleBack}
                  color="default"
                  variant="bordered"
                  isDisabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  onPress={handleNext}
                  color="primary"
                  isDisabled={currentStep === TOTAL_STEPS}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PromptWizard;