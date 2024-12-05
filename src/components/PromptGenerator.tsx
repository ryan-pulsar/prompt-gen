import React, { useState } from 'react';
import { generatePrompt } from '../utils/promptUtils';
import ErrorLog from './ErrorLog';

const PromptGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleAddError = () => {
    setErrors([...errors, '']);
    setSolutions([...solutions, '']);
  };

  const handleErrorChange = (index: number, value: string) => {
    const newErrors = [...errors];
    newErrors[index] = value;
    setErrors(newErrors);
  };

  const handleSolutionChange = (index: number, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index] = value;
    setSolutions(newSolutions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = generatePrompt(projectName, context, errors, solutions);
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">AI Prompt Generator</h1>
        <p className="text-gray-600 mt-2">Generate context-aware AI prompts with error handling history</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Context</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
              placeholder="Describe your project context"
            />
          </div>

          <ErrorLog
            errors={errors}
            solutions={solutions}
            onErrorChange={handleErrorChange}
            onSolutionChange={handleSolutionChange}
          />

          <button
            type="button"
            onClick={handleAddError}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Add Error + Solution
          </button>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Generate Prompt
          </button>
        </div>
      </form>

      {generatedPrompt && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Generated Prompt</h2>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded-md border">{generatedPrompt}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(generatedPrompt)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;