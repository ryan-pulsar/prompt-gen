import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { ProjectConfig } from '../types';

const defaultUiConfig = {
  framework: 'react',
  stateManagement: 'none',
  responsive: true
};

const defaultBackendConfig = {
  apiPattern: 'rest',
  database: 'none',
  auth: false
};

interface Props {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const AdvancedOptions: React.FC<Props> = ({ config, onChange }) => {
  const handleTypeChange = (value: 'frontend' | 'backend' | 'fullstack') => {
    onChange({
      ...config,
      type: value,
      ui: value !== 'backend' ? defaultUiConfig : undefined,
      backend: value !== 'frontend' ? defaultBackendConfig : undefined
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Select
            value={config.type}
            onValueChange={handleTypeChange}
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

          {(config.type === 'frontend' || config.type === 'fullstack') && (
            <div className="mt-4 space-y-4">
              <Select
                value={config.ui?.framework}
                onValueChange={(value: string) => onChange({
                  ...config,
                  ui: { ...config.ui!, framework: value }
                })}
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
                <span>State Management</span>
                <Select
                  value={config.ui?.stateManagement}
                  onValueChange={(value: string) => onChange({
                    ...config,
                    ui: { ...config.ui!, stateManagement: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state management" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="redux">Redux</SelectItem>
                    <SelectItem value="mobx">MobX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <span>Mobile Responsive</span>
                <Input
                  type="checkbox"
                  checked={config.ui?.responsive}
                  onChange={(e) => onChange({
                    ...config,
                    ui: { ...config.ui!, responsive: e.target.checked }
                  })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedOptions;