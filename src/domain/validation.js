/**
 * Modul Validasi Domain LaptopRank IUQI (SOT: PRD.md & IMPLEMENTATION_PLAN.md)
 * Memvalidasi kelayakan data alternatif dan bobot kriteria sebelum kalkulasi SAW.
 */

export function validateAlternatives(alternatives, criteriaDefinitions) {
  const errors = [];

  if (!Array.isArray(alternatives) || alternatives.length === 0) {
    return {
      isValid: false,
      errors: ['Daftar alternatif kosong. Diperlukan minimal 1 alternatif laptop untuk kalkulasi.']
    };
  }

  alternatives.forEach((alt, idx) => {
    const label = alt.name || `Alternatif #${idx + 1}`;

    if (!alt.id) {
      errors.push(`${label}: ID alternatif tidak valid atau tidak ada.`);
    }

    criteriaDefinitions.forEach(criterion => {
      const val = alt[criterion.id];

      if (val === undefined || val === null || val === '') {
        errors.push(`${label}: Nilai kriteria '${criterion.name}' tidak boleh kosong.`);
      } else if (typeof val !== 'number' || !Number.isFinite(val)) {
        errors.push(`${label}: Nilai kriteria '${criterion.name}' harus berupa angka finit (bukan NaN/Infinity).`);
      } else if (criterion.id === 'price' && val <= 0) {
        errors.push(`${label}: Harga harus bernilai positif (> 0 IDR) untuk normalisasi kriteria Cost.`);
      } else if (criterion.isRubric && (val < 1 || val > 5)) {
        errors.push(`${label}: Nilai rubrik '${criterion.name}' harus berada pada rentang skala 1 hingga 5.`);
      } else if (val < 0) {
        errors.push(`${label}: Nilai kriteria '${criterion.name}' tidak boleh bernilai negatif.`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateWeights(weights, criteriaDefinitions, targetTotal = 100) {
  const errors = [];
  const warnings = [];

  if (!weights || typeof weights !== 'object') {
    return {
      isValid: false,
      errors: ['Objek bobot tidak valid.'],
      totalWeight: 0
    };
  }

  let totalWeight = 0;

  criteriaDefinitions.forEach(c => {
    const rawVal = weights[c.id];
    const val = Number(rawVal);

    if (rawVal === undefined || rawVal === null || rawVal === '') {
      errors.push(`Bobot kriteria '${c.name}' belum diisi.`);
    } else if (isNaN(val) || !Number.isFinite(val)) {
      errors.push(`Bobot kriteria '${c.name}' harus berupa angka numerik valid.`);
    } else if (val < 0) {
      errors.push(`Bobot kriteria '${c.name}' tidak boleh bernilai negatif.`);
    } else {
      totalWeight += val;
    }
  });

  // Validasi total bobot
  if (totalWeight <= 0) {
    errors.push('Total bobot kriteria harus lebih besar dari 0.');
  } else if (Math.abs(totalWeight - targetTotal) > 0.001) {
    warnings.push(`Total bobot saat ini ${totalWeight.toFixed(1)}%. Disarankan berjumlah pas ${targetTotal}% agar proporsional.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalWeight
  };
}
