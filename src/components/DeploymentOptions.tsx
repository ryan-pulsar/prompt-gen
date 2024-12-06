import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { ProjectConfig } from '../types';

interface Props {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const DeploymentOptions: React.FC<Props> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Deployment Type</Label>
        <Select
          value={config.deployment.type}
          onValueChange={(value) => onChange({
            ...config,
            deployment: { ...config.deployment, type: value }
          })}
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
      </div>

      <div className="space-y-2">
        <Label>Deployment Frequency</Label>
        <Select
          value={config.deployment.frequency}
          onValueChange={(value) => onChange({
            ...config,
            deployment: { ...config.deployment, frequency: value }
          })}
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
      </div>
    </div>
  );
};

export default DeploymentOptions;