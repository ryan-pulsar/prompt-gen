import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { ProjectConfig } from '../types';
import ProjectOptions from './ProjectOptions';
import DeploymentOptions from './DeploymentOptions';
import SecurityOptions from './SecurityOptions';
import { generatePrompt } from '../utils/generatePrompt';

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

const PromptGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(projectName, context, config);
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800">AI Prompt Generator</h1>
          <p className="text-slate-600">Generate context-aware AI prompts with smart features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Project Context</Label>
                <Textarea
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Describe your project context"
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Middle Column - Advanced Options */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  <ProjectOptions config={config} onChange={setConfig} />
                  <Separator />
                  <DeploymentOptions config={config} onChange={setConfig} />
                  <Separator />
                  <SecurityOptions config={config} onChange={setConfig} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Column - Generated Prompt */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Generated Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleGeneratePrompt}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
              >
                Generate Prompt
              </Button>

              {generatedPrompt ? (
                <ScrollArea className="h-[450px] w-full rounded-md border p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generatedPrompt}
                  </pre>
                </ScrollArea>
              ) : (
                <Alert>
                  <AlertDescription>
                    Configure your project settings and click Generate Prompt to create a new AI prompt.
                  </AlertDescription>
                </Alert>
              )}

              {generatedPrompt && (
                <Button
                  onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                  variant="outline"
                  className="w-full"
                >
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;