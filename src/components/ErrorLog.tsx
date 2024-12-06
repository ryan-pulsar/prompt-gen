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
      <h3 className="text-lg font-medium text-gray-900">Error History</h3>
      {errors.map((error, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Error Description</label>
            <textarea
              value={error}
              onChange={(e) => onErrorChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Describe the error encountered"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Solution</label>
            <textarea
              value={solutions[index]}
              onChange={(e) => onSolutionChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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