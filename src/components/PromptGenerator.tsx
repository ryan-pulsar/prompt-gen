import React, { useState } from 'react';
import { generatePrompt } from '../utils/promptUtils';

const PromptGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [context, setContext] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = generatePrompt(projectName, context);
    setGeneratedPrompt(prompt);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Prompt Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Context</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Prompt
        </button>
      </form>
      {generatedPrompt && (
        <div className="mt-6">
          <h2 className="text-lg font-medium">Generated Prompt</h2>
          <pre className="mt-2 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{generatedPrompt}</pre>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;