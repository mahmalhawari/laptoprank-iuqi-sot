import { describe, it, expect } from 'vitest';
import { calculateSAW, formatCurrencyIDR } from './scoring.js';
import { CRITERIA_DEFINITIONS, getDefaultWeights } from './criteria.js';
import { validateAlternatives, validateWeights } from './validation.js';

describe('SAW Domain Calculations', () => {
  const dummyAlternatives = [
    { id: 'l1', name: 'Laptop A', price: 5000000, ram: 8, ssd: 256, processor: 3, battery: 3 },
    { id: 'l2', name: 'Laptop B', price: 10000000, ram: 16, ssd: 512, processor: 4, battery: 4 }
  ];

  it('correctly calculates benefit and cost normalization', () => {
    const weights = { price: 30, ram: 20, ssd: 20, processor: 15, battery: 15 };
    const result = calculateSAW(dummyAlternatives, weights, CRITERIA_DEFINITIONS);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);

    // Price is Cost: min(price) / price
    // min(5000000, 10000000) = 5000000
    // Laptop A price norm = 5000000 / 5000000 = 1.0
    // Laptop B price norm = 5000000 / 10000000 = 0.5
    const normA = result.normalizedMatrix.find(n => n.id === 'l1');
    const normB = result.normalizedMatrix.find(n => n.id === 'l2');

    expect(normA.values.price).toBeCloseTo(1.0, 5);
    expect(normB.values.price).toBeCloseTo(0.5, 5);

    // RAM is Benefit: ram / max(ram)
    // max(8, 16) = 16
    // Laptop A ram norm = 8 / 16 = 0.5
    // Laptop B ram norm = 16 / 16 = 1.0
    expect(normA.values.ram).toBeCloseTo(0.5, 5);
    expect(normB.values.ram).toBeCloseTo(1.0, 5);
  });

  it('correctly calculates weighted contributions and sums to preference score', () => {
    const weights = { price: 30, ram: 20, ssd: 20, processor: 15, battery: 15 }; // Total = 100
    const result = calculateSAW(dummyAlternatives, weights, CRITERIA_DEFINITIONS);

    const rankA = result.rankings.find(r => r.id === 'l1');
    const expectedScoreA =
      (1.0 * 0.3) + // price
      (0.5 * 0.2) + // ram: 8/16 * 0.2 = 0.1
      (0.5 * 0.2) + // ssd: 256/512 * 0.2 = 0.1
      (0.75 * 0.15) + // proc: 3/4 * 0.15 = 0.1125
      (0.75 * 0.15); // batt: 3/4 * 0.15 = 0.1125
      // total = 0.3 + 0.1 + 0.1 + 0.1125 + 0.1125 = 0.725

    expect(rankA.unroundedScore).toBeCloseTo(expectedScoreA, 5);
  });

  it('handles tied scores deterministically and assigns equal rank', () => {
    const tiedAlternatives = [
      { id: 't1', name: 'Laptop Tie 1', price: 6000000, ram: 8, ssd: 512, processor: 3, battery: 3 },
      { id: 't2', name: 'Laptop Tie 2', price: 6000000, ram: 8, ssd: 512, processor: 3, battery: 3 },
      { id: 't3', name: 'Laptop Worse', price: 9000000, ram: 4, ssd: 256, processor: 2, battery: 2 }
    ];

    const weights = getDefaultWeights();
    const result = calculateSAW(tiedAlternatives, weights, CRITERIA_DEFINITIONS);

    expect(result.rankings[0].rank).toBe(1);
    expect(result.rankings[1].rank).toBe(1);
    expect(result.rankings[2].rank).toBe(3);
    // Preserves stable original ordering for tie
    expect(result.rankings[0].id).toBe('t1');
    expect(result.rankings[1].id).toBe('t2');
  });

  it('rejects invalid or non-positive price for cost normalization', () => {
    const invalidPriceAlts = [
      { id: 'bad1', name: 'Free Laptop', price: 0, ram: 8, ssd: 256, processor: 3, battery: 3 }
    ];

    const validation = validateAlternatives(invalidPriceAlts, CRITERIA_DEFINITIONS);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(e => e.includes('Harga harus bernilai positif'))).toBe(true);

    const sawResult = calculateSAW(invalidPriceAlts, getDefaultWeights(), CRITERIA_DEFINITIONS);
    expect(sawResult.isValid).toBe(false);
  });

  it('rejects rubric scores outside 1-5', () => {
    const invalidRubricAlts = [
      { id: 'bad2', name: 'Overpowered Laptop', price: 7000000, ram: 8, ssd: 256, processor: 6, battery: 3 }
    ];

    const validation = validateAlternatives(invalidRubricAlts, CRITERIA_DEFINITIONS);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.some(e => e.includes('rentang skala 1 hingga 5'))).toBe(true);
  });

  it('validates weights and issues warning if sum is not 100', () => {
    const invalidWeightObj = { price: -5, ram: 20, ssd: 20, processor: 15, battery: 15 };
    const vResult = validateWeights(invalidWeightObj, CRITERIA_DEFINITIONS);
    expect(vResult.isValid).toBe(false);

    const partialWeights = { price: 20, ram: 20, ssd: 20, processor: 10, battery: 10 }; // sum = 80
    const vResultPartial = validateWeights(partialWeights, CRITERIA_DEFINITIONS);
    expect(vResultPartial.isValid).toBe(true);
    expect(vResultPartial.warnings.length).toBeGreaterThan(0);
  });

  it('formats IDR currency accurately without decimals', () => {
    expect(formatCurrencyIDR(5500000)).toContain('5.500.000');
  });
});
