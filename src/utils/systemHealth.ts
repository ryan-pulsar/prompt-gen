import type { SystemHealth } from '../types';

export function generateSystemHealthReport(): SystemHealth[] {
  return [
    {
      category: 'Type Safety',
      status: 'good',
      recommendations: [
        'Keep interfaces up to date',
        'Use strict TypeScript checks'
      ]
    },
    {
      category: 'Build Process',
      status: 'good',
      recommendations: [
        'Regularly test builds locally',
        'Maintain clean dependency tree'
      ]
    },
    {
      category: 'Framework Compatibility',
      status: 'good',
      recommendations: [
        'Stay within NextUI ecosystem',
        'Follow framework upgrade guides'
      ]
    }
  ];
}