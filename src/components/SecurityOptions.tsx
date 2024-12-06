import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ProjectConfig } from '../types';

interface Props {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const SecurityOptions: React.FC<Props> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Authentication Method</Label>
        <Select
          value={config.security.authMethod}
          onValueChange={(value) => onChange({
            ...config,
            security: { ...config.security, authMethod: value }
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select auth method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="jwt">JWT</SelectItem>
            <SelectItem value="oauth">OAuth</SelectItem>
            <SelectItem value="saml">SAML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label>Encryption Required</Label>
        <Switch
          checked={config.security.encryption}
          onCheckedChange={(checked) => onChange({
            ...config,
            security: { ...config.security, encryption: checked }
          })}
        />
      </div>
    </div>
  );
};

export default SecurityOptions;