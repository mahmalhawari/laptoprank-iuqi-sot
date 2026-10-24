/**
 * Modul Kalkulasi Simple Additive Weighting (SAW) LaptopRank IUQI
 * SOT: PRD.md (FR-04, FR-05) & IMPLEMENTATION_PLAN.md (Section 4)
 * Menjalankan normalisasi benefit/cost, perkalian bobot, perangkingan deterministik,
 * dan menghasilkan struktur hasil kalkulasi tunggal untuk seluruh UI.
 */

import { validateAlternatives, validateWeights } from './validation.js';
import { CRITERIA_DEFINITIONS } from './criteria.js';

export function calculateSAW(alternatives, userWeights, criteriaDefs = CRITERIA_DEFINITIONS) {
  // 1. Validasi alternatif
  const altValidation = validateAlternatives(alternatives, criteriaDefs);
  if (!altValidation.isValid) {
    return {
      isValid: false,
      errors: altValidation.errors,
      rankings: [],
      decisionMatrix: [],
      normalizedMatrix: [],
      weightedMatrix: [],
      extremes: {},
      normalizedWeights: {}
    };
  }

  // 2. Validasi bobot
  const weightValidation = validateWeights(userWeights, criteriaDefs);
  if (!weightValidation.isValid) {
    return {
      isValid: false,
      errors: weightValidation.errors,
      warnings: weightValidation.warnings,
      rankings: [],
      decisionMatrix: [],
      normalizedMatrix: [],
      weightedMatrix: [],
      extremes: {},
      normalizedWeights: {}
    };
  }

  const totalRawWeight = weightValidation.totalWeight;

  // 3. Hitung bobot ternormalisasi (W_j = w_j / sum(w))
  const normalizedWeights = {};
  criteriaDefs.forEach(c => {
    const raw = Number(userWeights[c.id]);
    normalizedWeights[c.id] = totalRawWeight > 0 ? raw / totalRawWeight : 0;
  });

  // 4. Cari nilai ekstrim (Max untuk Benefit, Min untuk Cost)
  const extremes = {};
  criteriaDefs.forEach(c => {
    const values = alternatives.map(alt => Number(alt[c.id]));
    if (c.type === 'cost') {
      extremes[c.id] = {
        type: 'cost',
        targetValue: Math.min(...values),
        label: 'Min'
      };
    } else {
      extremes[c.id] = {
        type: 'benefit',
        targetValue: Math.max(...values),
        label: 'Max'
      };
    }
  });

  // 5. Matriks Keputusan (X) & Matriks Ternormalisasi (R)
  const decisionMatrix = [];
  const normalizedMatrix = [];
  const weightedMatrix = [];

  alternatives.forEach(alt => {
    const rawRow = { id: alt.id, name: alt.name, brand: alt.brand, values: {} };
    const normRow = { id: alt.id, name: alt.name, brand: alt.brand, values: {} };
    const weightRow = { id: alt.id, name: alt.name, brand: alt.brand, values: {}, totalScore: 0 };

    let totalScore = 0;

    criteriaDefs.forEach(c => {
      const x = Number(alt[c.id]);
      rawRow.values[c.id] = x;

      let r = 0;
      if (c.type === 'cost') {
        // r_ij = min(x_j) / x_ij
        const minVal = extremes[c.id].targetValue;
        if (x > 0 && Number.isFinite(minVal)) {
          r = minVal / x;
        }
      } else {
        // r_ij = x_ij / max(x_j)
        const maxVal = extremes[c.id].targetValue;
        if (maxVal > 0 && Number.isFinite(maxVal)) {
          r = x / maxVal;
        }
      }

      // Pastikan nilai ternormalisasi selalu finit
      r = Number.isFinite(r) ? r : 0;
      normRow.values[c.id] = r;

      // c_ij = W_j * r_ij
      const contribution = r * normalizedWeights[c.id];
      weightRow.values[c.id] = contribution;
      totalScore += contribution;
    });

    weightRow.totalScore = totalScore;

    decisionMatrix.push(rawRow);
    normalizedMatrix.push(normRow);
    weightedMatrix.push(weightRow);
  });

  // 6. Urutkan berdasarkan skor preferensi asli (unrounded) descending
  // Simpan index awal untuk kestabilan tie policy
  const candidatesWithMeta = alternatives.map((alt, initialIndex) => {
    const weightRow = weightedMatrix.find(w => w.id === alt.id);
    const normRow = normalizedMatrix.find(n => n.id === alt.id);
    const rawRow = decisionMatrix.find(d => d.id === alt.id);

    return {
      alternative: alt,
      initialIndex,
      score: weightRow ? weightRow.totalScore : 0,
      rawValues: rawRow ? rawRow.values : {},
      normalizedValues: normRow ? normRow.values : {},
      contributions: weightRow ? weightRow.values : {}
    };
  });

  candidatesWithMeta.sort((a, b) => {
    const diff = b.score - a.score;
    if (Math.abs(diff) > 1e-9) {
      return diff;
    }
    // Jika skor persis sama, pertahankan urutan data sumber secara deterministik
    return a.initialIndex - b.initialIndex;
  });

  // 7. Berikan Peringkat (Equal scores share the same rank)
  let currentRank = 1;
  const rankings = candidatesWithMeta.map((item, index) => {
    if (index > 0) {
      const prev = candidatesWithMeta[index - 1];
      if (Math.abs(prev.score - item.score) > 1e-9) {
        currentRank = index + 1;
      }
    }

    return {
      rank: currentRank,
      id: item.alternative.id,
      name: item.alternative.name,
      brand: item.alternative.brand,
      price: item.alternative.price,
      ram: item.alternative.ram,
      ssd: item.alternative.ssd,
      processor: item.alternative.processor,
      battery: item.alternative.battery,
      specs: item.alternative.specs || {},
      description: item.alternative.description || '',
      unroundedScore: item.score,
      displayScore: Number(item.score.toFixed(4)),
      scorePercentage: Number((item.score * 100).toFixed(2)),
      rawValues: item.rawValues,
      normalizedValues: item.normalizedValues,
      contributions: item.contributions
    };
  });

  return {
    isValid: true,
    warnings: weightValidation.warnings || [],
    errors: [],
    rankings,
    topRanked: rankings.length > 0 ? rankings[0] : null,
    decisionMatrix,
    normalizedMatrix,
    weightedMatrix,
    extremes,
    normalizedWeights,
    rawWeights: userWeights,
    totalRawWeight
  };
}

/**
 * Format mata uang Rupiah
 */
export function formatCurrencyIDR(val) {
  if (typeof val !== 'number' || isNaN(val)) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}
