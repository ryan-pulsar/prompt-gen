import React, { useState } from 'react';
import { generatePrompt } from '../utils/promptUtils';
import ErrorLog from './ErrorLog';

interface PromptOptions {
  includeErrorHandling: boolean;
  includeFileManagement: boolean;
  includeDocumentation: boolean;
  includeChangeLog: boolean;
}

const PromptGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [options, setOptions] = useState<PromptOptions>({
    includeErrorHandling: true,
    includeFileManagement: true,
    includeDocumentation: true,
    includeChangeLog: true
  });

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
    const prompt = generatePrompt(projectName, context, errors, solutions, options);
    setGeneratedPrompt(prompt);
  };

  const handleOptionChange = (key: keyof PromptOptions) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">AI Prompt Generator</h1>
          <p className="text-lg text-gray-600">Generate context-aware AI prompts with smart features</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Context</label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Describe your project context"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Prompt Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.includeErrorHandling}
                      onChange={() => handleOptionChange('includeErrorHandling')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">Error Handling</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.includeFileManagement}
                      onChange={() => handleOptionChange('includeFileManagement')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">File Management</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.includeDocumentation}
                      onChange={() => handleOptionChange('includeDocumentation')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">Documentation</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.includeChangeLog}
                      onChange={() => handleOptionChange('includeChangeLog')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">Changelog</span>
                  </label>
                </div>
              </div>

              {options.includeErrorHandling && (
                <ErrorLog
                  errors={errors}
                  solutions={solutions}
                  onErrorChange={handleErrorChange}
                  onSolutionChange={handleSolutionChange}
                />
              )}

              {options.includeErrorHandling && (
                <button
                  type="button"
                  onClick={handleAddError}
                  className="inline-flex items-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Error + Solution
                </button>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105"
              >
                Generate Prompt
              </button>
            </div>
          </form>

          {generatedPrompt && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Generated Prompt</h2>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Copy to Clipboard
                </button>
              </div>
              <pre className="whitespace-pre-wrap bg-white p-4 rounded-md border border-gray-200 text-sm">
                {generatedPrompt}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;