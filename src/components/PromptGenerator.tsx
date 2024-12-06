// Add new options to the state
const [options, setOptions] = useState<PromptOptions>({
  includeErrorHandling: true,
  includeFileManagement: true,
  includeDocumentation: true,
  includeChangeLog: true,
  includeDeployment: false,
  includeInfrastructure: false,
  includeRateLimiting: false,
  includeTokenManagement: false,
  includeErrorRecovery: false,
  includeVersionControl: false,
  includeBranchStrategy: false,
  includeCodeReview: false,
  includeCaching: false,
  includeLoadBalancing: false,
  includeOptimization: false
});

// Add new sections in the UI for these options
<div className="bg-gray-50 p-6 rounded-lg">
  <h3 className="text-lg font-medium text-gray-900 mb-4">Deployment Options</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={options.includeDeployment}
        onChange={() => handleOptionChange('includeDeployment')}
        className="h-5 w-5 text-blue-600 rounded"
      />
      <span className="text-gray-700">Deployment Configuration</span>
    </label>
    {/* Add similar checkboxes for other options */}
  </div>
</div>

// ... rest of the component code