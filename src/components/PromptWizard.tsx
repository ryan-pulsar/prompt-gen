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
import { generateEnhancedPrompt } from '../utils/promptGeneration';
import { generateSystemHealthReport } from '../utils/systemHealth';

// ... rest of the imports ...

export default function PromptWizard() {
  // ... previous state code ...

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-xl font-bold text-custom-blue">Project Details</h2>
            <Input
              label="Project Name"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="input-field max-w-md"
            />
            <Textarea
              label="Project Context"
              placeholder="Describe your project context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="input-field max-w-md"
            />
          </div>
        );
      case 2:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-xl font-bold text-custom-blue">Project Type</h2>
            <RadioGroup
              label="Select project type"
              value={config.type}
              onValueChange={handleTypeChange}
              classNames={{
                label: "text-custom-blue font-medium"
              }}
            >
              <Radio value="frontend">Frontend</Radio>
              <Radio value="backend">Backend</Radio>
              <Radio value="fullstack">Full Stack</Radio>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-xl font-bold text-custom-blue">Features & Requirements</h2>
            <CheckboxGroup
              label="Select testing features"
              value={Object.entries(config.testing)
                .filter(([_, value]) => value)
                .map(([key]) => key)}
              onChange={handleFeatureChange}
              classNames={{
                label: "text-custom-blue font-medium"
              }}
            >
              <Checkbox value="unit">Unit Testing</Checkbox>
              <Checkbox value="integration">Integration Testing</Checkbox>
              <Checkbox value="e2e">E2E Testing</Checkbox>
            </CheckboxGroup>
          </div>
        );
      case 4:
        return (
          <div className="step-content space-y-6">
            <h2 className="text-xl font-bold text-custom-blue">Generated Prompt</h2>
            <Card className="bg-white/70">
              <CardBody>
                <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                  {generatedPrompt || 'Click generate to create your prompt'}
                </pre>
              </CardBody>
            </Card>
            <Button
              color="primary"
              onPress={handleGeneratePrompt}
              className="btn-primary w-full"
              size="lg"
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
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="wizard-card">
          <CardBody className="p-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <Progress
                  aria-label="Progress"
                  value={progress}
                  className="max-w-md"
                  color="primary"
                  showValueLabel
                />
                <div className="flex justify-between max-w-md text-sm">
                  <span className={`${currentStep === 1 ? 'text-custom-blue font-bold' : 'text-gray-500'}`}>Details</span>
                  <span className={`${currentStep === 2 ? 'text-custom-blue font-bold' : 'text-gray-500'}`}>Type</span>
                  <span className={`${currentStep === 3 ? 'text-custom-blue font-bold' : 'text-gray-500'}`}>Features</span>
                  <span className={`${currentStep === 4 ? 'text-custom-blue font-bold' : 'text-gray-500'}`}>Generate</span>
                </div>
              </div>

              <div className="mt-8">
                {renderStepContent()}
              </div>

              <div className="flex justify-between mt-8 gap-4">
                <Button
                  onPress={handleBack}
                  className="btn-secondary flex-1"
                  isDisabled={currentStep === 1}
                  size="lg"
                >
                  Back
                </Button>
                <Button
                  onPress={handleNext}
                  className="btn-primary flex-1"
                  isDisabled={currentStep === TOTAL_STEPS}
                  size="lg"
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
}