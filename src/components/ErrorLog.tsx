import React from 'react';

interface ErrorLogProps {
  errors: string[];
  solutions: string[];
  onErrorChange: (index: number, value: string) => void;
  onSolutionChange: (index: number, value: string) => void;
}

const ErrorLog: React.FC<ErrorLogProps> = ({ errors, solutions, onErrorChange, onSolutionChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Error History</h3>
      {errors.map((error, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Error Description</label>
            <textarea
              value={error}
              onChange={(e) => onErrorChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Describe the error encountered"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Solution</label>
            <textarea
              value={solutions[index]}
              onChange={(e) => onSolutionChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Describe how the error was solved"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;