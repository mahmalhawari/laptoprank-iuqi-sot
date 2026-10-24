import { describe, it, expect } from 'vitest';
import { MOCK_LAPTOPS } from '../data/mockData.js';
import { CRITERIA_DEFINITIONS, getDefaultWeights } from './criteria.js';
import { calculateSAW } from './scoring.js';

describe('Integration Tests: Data Flow and Calculations', () => {
  it('ensures shared calculation output powers rankings and consistency', () => {
    const weights = getDefaultWeights();
    const result = calculateSAW(MOCK_LAPTOPS, weights, CRITERIA_DEFINITIONS);

    expect(result.isValid).toBe(true);
    expect(result.rankings.length).toBe(MOCK_LAPTOPS.length);

    // Verify rankings are ordered strictly descending
    for (let i = 0; i < result.rankings.length - 1; i++) {
      expect(result.rankings[i].unroundedScore).toBeGreaterThanOrEqual(result.rankings[i + 1].unroundedScore);
    }

    // Verify topRanked matches rank 1
    expect(result.topRanked.id).toBe(result.rankings[0].id);
    expect(result.topRanked.rank).toBe(1);
  });

  it('updates ranking order when price weight dominates (Cost priority)', () => {
    // When price weight is 80%, the cheapest laptop (Laptop E or Laptop A) should jump to #1
    const cheapWeights = { price: 80, ram: 5, ssd: 5, processor: 5, battery: 5 };
    const result = calculateSAW(MOCK_LAPTOPS, cheapWeights, CRITERIA_DEFINITIONS);

    expect(result.isValid).toBe(true);
    // Laptop E is Rp4.999.000 (cheapest)
    expect(result.topRanked.id).toBe('lap-05');
  });

  it('updates ranking order when RAM and Processor dominate (Performance priority)', () => {
    // When RAM and Processor are 80%, high-end laptops should dominate
    const perfWeights = { price: 5, ram: 45, ssd: 15, processor: 30, battery: 5 };
    const result = calculateSAW(MOCK_LAPTOPS, perfWeights, CRITERIA_DEFINITIONS);

    expect(result.isValid).toBe(true);
    // Laptop D has 16GB RAM and Rubric 5 CPU
    expect(result.topRanked.id).toBe('lap-04');
  });

  it('ensures each alternative contribution sums to its exact score', () => {
    const weights = getDefaultWeights();
    const result = calculateSAW(MOCK_LAPTOPS, weights, CRITERIA_DEFINITIONS);

    result.rankings.forEach(item => {
      const sumContrib = Object.values(item.contributions).reduce((acc, v) => acc + v, 0);
      expect(item.unroundedScore).toBeCloseTo(sumContrib, 5);
    });
  });
});
