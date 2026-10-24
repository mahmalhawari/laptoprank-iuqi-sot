import React from 'react';
import { CRITERIA_DEFINITIONS } from '../../domain/criteria.js';
import { formatCurrencyIDR } from '../../domain/scoring.js';
import { Icon } from '../common/Icons.jsx';

export function ScoreBreakdown({ laptopRankInfo, sawResult }) {
  if (!laptopRankInfo || !sawResult) return null;

  const { contributions, normalizedValues, rawValues, displayScore, unroundedScore } = laptopRankInfo;

  // Temukan kriteria dengan kontribusi tertinggi dan terendah
  const contribEntries = CRITERIA_DEFINITIONS.map(c => ({
    criterion: c,
    raw: rawValues[c.id],
    norm: normalizedValues[c.id],
    weight: sawResult.normalizedWeights[c.id],
    contrib: contributions[c.id],
    percentageOfTotal: unroundedScore > 0 ? (contributions[c.id] / unroundedScore) * 100 : 0
  }));

  const sortedContribs = [...contribEntries].sort((a, b) => b.contrib - a.contrib);
  const highestContrib = sortedContribs[0];
  const lowestContrib = sortedContribs[sortedContribs.length - 1];

  const formatRawValue = (criterionId, val) => {
    if (criterionId === 'price') return formatCurrencyIDR(val);
    if (criterionId === 'ram') return `${val} GB`;
    if (criterionId === 'ssd') return `${val} GB`;
    return `Level ${val}/5`;
  };

  return (
    <div className="panel" aria-labelledby="breakdown-title">
      <div className="panel-header">
        <h3 id="breakdown-title" className="panel-title">
          <Icon name="sparkles" size={18} style={{ color: 'var(--color-cyan-400)' }} />
          <span>Dekonstruksi Kontribusi Kriteria (SAW)</span>
        </h3>
        <span className="badge badge-dummy">Transparansi Skor</span>
      </div>

      {/* Analysis narrative box */}
      <div
        style={{
          padding: '14px 18px',
          background: 'var(--color-muted-panel)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--color-cyan-400)',
          marginBottom: '20px'
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--color-white-50)', marginBottom: '4px' }}>
          Analisis Rekomendasi Berbasis Data:
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-slate-300)', lineHeight: '1.6' }}>
          Laptop ini meraih skor total preferensi <strong style={{ color: 'var(--color-cyan-400)' }}>{displayScore}</strong> ({laptopRankInfo.scorePercentage}% dari skor ideal 1.0).
          Faktor pendorong keunggulan terbesarnya berasal dari <strong>{highestContrib.criterion.name}</strong> dengan kontribusi skor sebesar <strong>{highestContrib.contrib.toFixed(4)}</strong> ({highestContrib.percentageOfTotal.toFixed(1)}% dari total skor).
          Sebaliknya, aspek yang memberikan kontribusi terkecil berada pada <strong>{lowestContrib.criterion.name}</strong> ({lowestContrib.contrib.toFixed(4)}), yang menjadi titik kompromi utama untuk model ini.
        </p>
      </div>

      {/* Contribution Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Kriteria</th>
              <th>Tipe</th>
              <th>Nilai Awal</th>
              <th>Normalisasi (r<sub>ij</sub>)</th>
              <th>Bobot (W<sub>j</sub>)</th>
              <th>Kontribusi Skor</th>
              <th style={{ width: '220px' }}>Proporsi Nilai</th>
            </tr>
          </thead>
          <tbody>
            {contribEntries.map(entry => (
              <tr key={entry.criterion.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--color-white-50)' }}>
                    {entry.criterion.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                    {entry.criterion.code}
                  </div>
                </td>
                <td>
                  {entry.criterion.type === 'cost' ? (
                    <span className="badge badge-cost">Cost</span>
                  ) : (
                    <span className="badge badge-benefit">Benefit</span>
                  )}
                </td>
                <td className="numeric-data">
                  {formatRawValue(entry.criterion.id, entry.raw)}
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                  {entry.norm.toFixed(4)}
                </td>
                <td className="numeric-data">
                  {(entry.weight * 100).toFixed(0)}%
                </td>
                <td className="numeric-data">
                  <strong style={{ color: 'var(--color-white-50)' }}>
                    {entry.contrib.toFixed(4)}
                  </strong>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        flex: 1,
                        height: '8px',
                        background: 'var(--color-navy-950)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(entry.norm * 100, 100)}%`,
                          height: '100%',
                          background: entry.criterion.type === 'cost' ? 'var(--color-rose-400)' : 'var(--color-blue-500)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                    <span className="numeric-data" style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', minWidth: '40px' }}>
                      {entry.percentageOfTotal.toFixed(0)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#0e1728', fontWeight: 700 }}>
              <td colSpan="5" style={{ textAlign: 'right', color: 'var(--color-slate-300)' }}>
                Total Skor Preferensi (V<sub>i</sub>):
              </td>
              <td className="numeric-data" style={{ color: 'var(--color-cyan-400)', fontSize: '1.05rem' }}>
                {displayScore}
              </td>
              <td>
                <span className="badge badge-benefit">100% Akumulasi</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
