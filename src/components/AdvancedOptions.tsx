import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

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

interface AdvancedOptionsProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ config, onChange }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="project-type">
        <AccordionTrigger className="text-lg font-semibold">Project Type Configuration</AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Select
                value={config.type}
                onValueChange={(value: 'frontend' | 'backend' | 'fullstack') => 
                  onChange({ ...config, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Full Stack</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Conditional UI based on project type */}
              {config.type === 'frontend' && (
                <div className="space-y-4">
                  <Select
                    value={config.ui?.framework}
                    onValueChange={(value) => 
                      onChange({
                        ...config,
                        ui: { ...config.ui, framework: value }
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select UI framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center justify-between">
                    <span>Mobile Responsive</span>
                    <Switch
                      checked={config.ui?.responsive}
                      onCheckedChange={(checked) =>
                        onChange({
                          ...config,
                          ui: { ...config.ui, responsive: checked }
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="deployment">
        <AccordionTrigger className="text-lg font-semibold">Deployment Settings</AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Select
                value={config.deployment.type}
                onValueChange={(value) =>
                  onChange({
                    ...config,
                    deployment: { ...config.deployment, type: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deployment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docker">Docker</SelectItem>
                  <SelectItem value="kubernetes">Kubernetes</SelectItem>
                  <SelectItem value="serverless">Serverless</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={config.deployment.frequency}
                onValueChange={(value) =>
                  onChange({
                    ...config,
                    deployment: { ...config.deployment, frequency: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deployment frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="continuous">Continuous</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Add more accordion items for other configuration sections */}
    </Accordion>
  );
};

export default AdvancedOptions;