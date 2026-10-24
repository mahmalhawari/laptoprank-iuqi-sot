import React, { useState } from 'react';
import { CRITERIA_DEFINITIONS } from '../../domain/criteria.js';
import { formatCurrencyIDR } from '../../domain/scoring.js';
import { Icon } from '../common/Icons.jsx';

export function MatrixView({ sawResult }) {
  const [activeTab, setActiveTab] = useState('normalized'); // 'decision', 'normalized', 'weighted'

  if (!sawResult || !sawResult.isValid) {
    return (
      <div className="panel">
        <p style={{ color: 'var(--color-danger)' }}>
          Kalkulasi SAW belum dapat ditampilkan karena data atau bobot belum valid.
        </p>
      </div>
    );
  }

  const { decisionMatrix, normalizedMatrix, weightedMatrix, extremes, normalizedWeights } = sawResult;

  return (
    <div className="panel" aria-labelledby="matrix-view-title">
      <div className="panel-header">
        <div>
          <h2 id="matrix-view-title" className="panel-title">
            <Icon name="calculator" size={20} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Tahapan Matriks Perhitungan SAW</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)', marginTop: '4px' }}>
            Transparansi proses perhitungan matematis dari nilai mentah hingga skor preferensi.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', background: 'var(--color-navy-950)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <button
            className={`btn btn-sm ${activeTab === 'decision' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('decision')}
          >
            1. Matriks Keputusan (X)
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'normalized' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('normalized')}
          >
            2. Matriks Normalisasi (R)
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'weighted' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('weighted')}
          >
            3. Matriks Terbobot & Skor (V)
          </button>
        </div>
      </div>

      {/* Explanation Banner according to Tab */}
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--color-muted-panel)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid var(--color-blue-500)',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: 'var(--color-slate-300)'
        }}
      >
        {activeTab === 'decision' && (
          <div>
            <strong>Tahap 1 — Matriks Keputusan ($X$):</strong> Memetakan nilai kuantitatif masing-masing alternatif laptop ke dalam 5 kriteria. Baris paling bawah menampilkan nilai ekstrem ($\min$ untuk kriteria Cost, $\max$ untuk kriteria Benefit).
          </div>
        )}
        {activeTab === 'normalized' && (
          <div>
            <strong>Tahap 2 — Matriks Normalisasi ($R$):</strong> Mengubah nilai kriteria ke rentang skala 0 s/d 1.
            <div style={{ marginTop: '4px', display: 'flex', gap: '20px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)' }}>
              <span>Benefit (RAM, SSD, CPU, Baterai): <code>r_ij = x_ij / max(x_j)</code></span>
              <span>Cost (Harga): <code>r_ij = min(x_j) / x_ij</code></span>
            </div>
          </div>
        )}
        {activeTab === 'weighted' && (
          <div>
            <strong>Tahap 3 — Matriks Terbobot &amp; Nilai Preferensi (V):</strong> Mengalikan nilai normalisasi r<sub>ij</sub> dengan bobot kriteria W<sub>j</sub>, lalu menjumlahkan seluruh kontribusi kriteria (V<sub>i</sub> = &Sigma; W<sub>j</sub> &times; r<sub>ij</sub>) untuk menghasilkan skor preferensi akhir.
          </div>
        )}
      </div>

      {/* Tab 1: Matriks Keputusan */}
      {activeTab === 'decision' && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Alternatif</th>
                <th>Brand</th>
                <th>Harga (C1 - Cost)</th>
                <th>RAM (C2 - Benefit)</th>
                <th>SSD (C3 - Benefit)</th>
                <th>CPU (C4 - Benefit)</th>
                <th>Baterai (C5 - Benefit)</th>
              </tr>
            </thead>
            <tbody>
              {decisionMatrix.map(row => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td><span className="laptop-brand">{row.brand}</span></td>
                  <td className="numeric-data">{formatCurrencyIDR(row.values.price)}</td>
                  <td className="numeric-data">{row.values.ram} GB</td>
                  <td className="numeric-data">{row.values.ssd} GB</td>
                  <td className="numeric-data">Skala {row.values.processor}/5</td>
                  <td className="numeric-data">Skala {row.values.battery}/5</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#0e1728', fontWeight: 700 }}>
                <td colSpan="2" style={{ color: 'var(--color-cyan-400)' }}>
                  Nilai Target Normalisasi:
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-rose-400)' }}>
                  Min: {formatCurrencyIDR(extremes.price?.targetValue)}
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-emerald-400)' }}>
                  Max: {extremes.ram?.targetValue} GB
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-emerald-400)' }}>
                  Max: {extremes.ssd?.targetValue} GB
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-emerald-400)' }}>
                  Max: {extremes.processor?.targetValue}
                </td>
                <td className="numeric-data" style={{ color: 'var(--color-emerald-400)' }}>
                  Max: {extremes.battery?.targetValue}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Tab 2: Matriks Normalisasi */}
      {activeTab === 'normalized' && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Alternatif</th>
                <th>C1 (Harga)</th>
                <th>C2 (RAM)</th>
                <th>C3 (SSD)</th>
                <th>C4 (CPU)</th>
                <th>C5 (Baterai)</th>
              </tr>
            </thead>
            <tbody>
              {normalizedMatrix.map(row => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                    {row.values.price.toFixed(4)}
                  </td>
                  <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                    {row.values.ram.toFixed(4)}
                  </td>
                  <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                    {row.values.ssd.toFixed(4)}
                  </td>
                  <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                    {row.values.processor.toFixed(4)}
                  </td>
                  <td className="numeric-data" style={{ color: 'var(--color-cyan-400)' }}>
                    {row.values.battery.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: '#0e1728', fontWeight: 700 }}>
                <td style={{ color: 'var(--color-slate-300)' }}>Bobot Relatif (W<sub>j</sub>):</td>
                {CRITERIA_DEFINITIONS.map(c => (
                  <td key={c.id} className="numeric-data" style={{ color: 'var(--color-white-50)' }}>
                    {normalizedWeights[c.id]?.toFixed(4)}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Tab 3: Matriks Terbobot */}
      {activeTab === 'weighted' && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Alternatif</th>
                <th>Kontribusi C1</th>
                <th>Kontribusi C2</th>
                <th>Kontribusi C3</th>
                <th>Kontribusi C4</th>
                <th>Kontribusi C5</th>
                <th>Total Skor Preferensi (V<sub>i</sub>)</th>
              </tr>
            </thead>
            <tbody>
              {weightedMatrix.map(row => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td className="numeric-data">{row.values.price.toFixed(4)}</td>
                  <td className="numeric-data">{row.values.ram.toFixed(4)}</td>
                  <td className="numeric-data">{row.values.ssd.toFixed(4)}</td>
                  <td className="numeric-data">{row.values.processor.toFixed(4)}</td>
                  <td className="numeric-data">{row.values.battery.toFixed(4)}</td>
                  <td className="numeric-data">
                    <strong style={{ color: 'var(--color-cyan-400)', fontSize: '1rem' }}>
                      {row.totalScore.toFixed(4)}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
