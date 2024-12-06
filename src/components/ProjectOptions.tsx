import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { ProjectConfig } from '../types';

interface Props {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const ProjectOptions: React.FC<Props> = ({ config, onChange }) => {
  const handleTypeChange = (value: 'frontend' | 'backend' | 'fullstack') => {
    const newConfig = {
      ...config,
      type: value
    };

    if (value === 'frontend' || value === 'fullstack') {
      newConfig.ui = {
        framework: 'react',
        stateManagement: 'none',
        responsive: true
      };
    }

    if (value === 'backend' || value === 'fullstack') {
      newConfig.backend = {
        apiPattern: 'rest',
        database: 'none',
        auth: false
      };
    }

    onChange(newConfig);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Project Type</Label>
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
      </div>

      {(config.type === 'frontend' || config.type === 'fullstack') && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Framework</Label>
            <Select
              value={config.ui?.framework}
              onValueChange={(value) => onChange({
                ...config,
                ui: { ...config.ui!, framework: value }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State Management</Label>
            <Select
              value={config.ui?.stateManagement}
              onValueChange={(value) => onChange({
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
        </div>
      )}
    </div>
  );
};

export default ProjectOptions;