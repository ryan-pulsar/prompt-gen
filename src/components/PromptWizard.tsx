import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Stepper,
  Step,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Progress
} from '@nextui-org/react';
import { ProjectConfig } from '../types';

const TOTAL_STEPS = 4;

const PromptWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [config, setConfig] = useState<ProjectConfig>({/* default config */});
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const progress = (currentStep / TOTAL_STEPS) * 100;

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
              onChange={(value) => setConfig({ ...config, type: value })}
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
              label="Select required features"
              value={[]}
              onChange={() => {}}
            >
              <Checkbox value="auth">Authentication</Checkbox>
              <Checkbox value="api">API Integration</Checkbox>
              <Checkbox value="database">Database</Checkbox>
              <Checkbox value="testing">Testing</Checkbox>
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
              onClick={() => setGeneratedPrompt('Generated prompt will appear here')}
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
        <Card className="w-full p-6">
          <CardBody>
            <div className="space-y-6">
              <Progress
                aria-label="Progress"
                value={progress}
                className="max-w-md"
                color="primary"
                showValueLabel={true}
              />
              <Stepper
                activeStep={currentStep}
                className="mb-6"
              >
                <Step title="Project Details" />
                <Step title="Project Type" />
                <Step title="Features" />
                <Step title="Generate" />
              </Stepper>

              <div className="mt-8">
                {renderStepContent()}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  color="default"
                  variant="bordered"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  onClick={handleNext}
                  disabled={currentStep === TOTAL_STEPS}
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