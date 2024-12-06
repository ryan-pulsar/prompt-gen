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
import { ProjectConfig } from '../types';
import { generateEnhancedPrompt, defaultWorkingMemory } from '../utils/promptGeneration';

// ... rest of the component code remains the same until handleFeatureChange

const handleGeneratePrompt = () => {
  const prompt = generateEnhancedPrompt(
    projectName,
    context,
    config,
    defaultWorkingMemory
  );
  setGeneratedPrompt(prompt);
};

// ... rest of the component code