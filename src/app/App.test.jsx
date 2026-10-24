import { describe, it, expect } from 'vitest';
import React from 'react';
import { MethodSaw } from '../pages/MethodSaw.jsx';
import { SawCalculation } from '../pages/SawCalculation.jsx';
import { calculateSAW } from '../domain/scoring.js';
import { MOCK_LAPTOPS } from '../data/mockData.js';
import { getDefaultWeights, CRITERIA_DEFINITIONS } from '../domain/criteria.js';

describe('MethodSaw and SawCalculation component validation', () => {
  it('renders MethodSaw component without throwing error', () => {
    const el = MethodSaw({ onNavigate: () => {} });
    expect(el).toBeDefined();
    expect(el.props.className).toBe('page-container');
  });

  it('renders SawCalculation component with valid sawResult without throwing error', () => {
    const sawResult = calculateSAW(MOCK_LAPTOPS, getDefaultWeights(), CRITERIA_DEFINITIONS);
    const el = SawCalculation({ sawResult, onNavigate: () => {} });
    expect(el).toBeDefined();
    expect(el.props.className).toBe('page-container');
  });
});
