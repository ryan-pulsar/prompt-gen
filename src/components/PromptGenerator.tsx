import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdvancedOptions from './AdvancedOptions';
import { generatePrompt } from '../utils/generatePrompt';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-slate-800">
              AI Prompt Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Project Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Project Context"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced">
                <AdvancedOptions
                  config={config}
                  onChange={setConfig}
                />
              </TabsContent>

              <div className="pt-6">
                <Button
                  onClick={handleGeneratePrompt}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  size="lg"
                >
                  Generate Prompt
                </Button>
              </div>
            </Tabs>

            {generatedPrompt && (
              <div className="mt-8">
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Generated Prompt</span>
                      <Button
                        onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                        variant="outline"
                        size="sm"
                      >
                        Copy to Clipboard
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap bg-white p-4 rounded-md border text-sm overflow-auto">
                      {generatedPrompt}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptGenerator;