import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Button } from './Button';

interface ProjectConfig {
  type: 'frontend' | 'backend' | 'fullstack';
  testing: {
    unit: boolean;
    integration: boolean;
    e2e: boolean;
  };
}

const defaultConfig: ProjectConfig = {
  type: 'frontend',
  testing: {
    unit: true,
    integration: false,
    e2e: false
  }
};

const TOTAL_STEPS = 4;

export default function PromptWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
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

  const handleTypeChange = (type: 'frontend' | 'backend' | 'fullstack') => {
    setConfig(prev => ({ ...prev, type }));
  };

  const handleGeneratePrompt = () => {
    setGeneratedPrompt(`Project: ${projectName}\n\nContext: ${context}\n\nType: ${config.type}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-600">Project Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Context
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70"
                rows={4}
                placeholder="Describe your project context"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-600">Project Type</h2>
            <Tab.Group
              selectedIndex={['frontend', 'backend', 'fullstack'].indexOf(config.type)}
              onChange={(index) => handleTypeChange(['frontend', 'backend', 'fullstack'][index] as 'frontend' | 'backend' | 'fullstack')}
            >
              <Tab.List className="flex space-x-2 rounded-xl bg-blue-100 p-1">
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${selected
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-blue-700 hover:bg-blue-200'}`
                }>
                  Frontend
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${selected
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-blue-700 hover:bg-blue-200'}`
                }>
                  Backend
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${selected
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-blue-700 hover:bg-blue-200'}`
                }>
                  Full Stack
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-600">Features</h2>
            <div className="space-y-4">
              {Object.entries(config.testing).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      testing: {
                        ...prev.testing,
                        [key]: e.target.checked
                      }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)} Testing
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-600">Generated Prompt</h2>
            <div className="bg-white/70 rounded-lg shadow-sm p-6">
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                {generatedPrompt || 'Click generate to create your prompt'}
              </pre>
            </div>
            <Button
              variant="primary"
              onClick={handleGeneratePrompt}
              className="w-full"
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
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="h-2 w-full bg-blue-100 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentStep === 1 ? 'text-blue-600 font-bold' : 'text-gray-500'}>Details</span>
                <span className={currentStep === 2 ? 'text-blue-600 font-bold' : 'text-gray-500'}>Type</span>
                <span className={currentStep === 3 ? 'text-blue-600 font-bold' : 'text-gray-500'}>Features</span>
                <span className={currentStep === 4 ? 'text-blue-600 font-bold' : 'text-gray-500'}>Generate</span>
              </div>
            </div>

            <div className="mt-8">
              {renderStepContent()}
            </div>

            <div className="flex justify-between mt-8 gap-4">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentStep === TOTAL_STEPS}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}