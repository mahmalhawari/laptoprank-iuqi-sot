import React, { useState } from 'react';
import { CRITERIA_DEFINITIONS, TOTAL_WEIGHT_TARGET, getDefaultWeights } from '../../domain/criteria.js';
import { validateWeights } from '../../domain/validation.js';
import { Icon } from '../common/Icons.jsx';
import { StatusAlert } from '../common/StatusAlert.jsx';

export function WeightEditor({ weights, onWeightChange, onResetWeights }) {
  const [selectedRubricCriterion, setSelectedRubricCriterion] = useState(null);

  const validation = validateWeights(weights, CRITERIA_DEFINITIONS, TOTAL_WEIGHT_TARGET);
  const total = validation.totalWeight;
  const isPerfectTotal = Math.abs(total - TOTAL_WEIGHT_TARGET) < 0.001;

  const handleInputChange = (id, val) => {
    const num = val === '' ? '' : Number(val);
    onWeightChange({
      ...weights,
      [id]: num
    });
  };

  return (
    <div className="panel" aria-labelledby="weight-editor-title">
      <div className="panel-header">
        <div>
          <h2 id="weight-editor-title" className="panel-title">
            <Icon name="sliders" size={20} style={{ color: 'var(--color-blue-400)' }} />
            <span>Pengaturan Bobot Kriteria SAW</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)', marginTop: '4px' }}>
            Sesuaikan persentase prioritas untuk kebutuhan studi Anda. Konvensi total bobot adalah 100%.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onResetWeights}
          title="Kembalikan ke bobot awal rekomendasi"
        >
          <Icon name="reset" size={14} />
          <span>Reset Default</span>
        </button>
      </div>

      {/* Validation status box */}
      {!validation.isValid ? (
        <StatusAlert
          type="danger"
          title="Terdapat Kesalahan Pengaturan Bobot"
          message={validation.errors.join(' ')}
        />
      ) : isPerfectTotal ? (
        <StatusAlert
          type="success"
          title="Total Bobot Pas 100%"
          message="Seluruh bobot valid dan seimbang untuk kalkulasi SAW secara optimal."
        />
      ) : (
        <StatusAlert
          type="warning"
          title={`Total Bobot Saat Ini: ${total.toFixed(1)}%`}
          message="Meski sistem secara otomatis menormalisasi bobot (W_j = w_j / total), disarankan jumlah total bernilai pas 100% untuk representasi yang akurat."
        />
      )}

      {/* Criteria Table */}
      <div className="table-wrapper" style={{ marginTop: '16px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Kriteria</th>
              <th>Tipe</th>
              <th>Deskripsi & Skala</th>
              <th style={{ width: '180px' }}>Bobot (%)</th>
              <th>Rasio (W<sub>j</sub>)</th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA_DEFINITIONS.map(c => {
              const currentVal = weights[c.id] ?? '';
              const normalizedRatio = total > 0 ? (Number(currentVal) / total).toFixed(4) : '0.0000';

              return (
                <tr key={c.id}>
                  <td>
                    <span className="badge badge-dummy" style={{ fontWeight: 700 }}>
                      {c.code}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-white-50)' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                      Satuan: {c.unit}
                    </div>
                  </td>
                  <td>
                    {c.type === 'cost' ? (
                      <span className="badge badge-cost" title="Semakin rendah harganya, semakin tinggi nilai preferensinya">
                        Cost (Biaya)
                      </span>
                    ) : (
                      <span className="badge badge-benefit" title="Semakin tinggi nilainya, semakin baik">
                        Benefit (Keuntungan)
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-300)', maxWidth: '380px' }}>
                      {c.description}
                    </div>
                    {c.isRubric && (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '2px 6px', fontSize: '0.75rem', color: 'var(--color-cyan-400)', marginTop: '4px' }}
                        onClick={() => setSelectedRubricCriterion(c)}
                        aria-label={`Buka panduan rubrik untuk ${c.name}`}
                      >
                        <Icon name="info" size={13} />
                        <span>Lihat Rubrik Skala 1-5</span>
                      </button>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        id={`weight-input-${c.id}`}
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        className="form-input"
                        style={{ width: '85px', textAlign: 'right' }}
                        value={currentVal}
                        onChange={(e) => handleInputChange(c.id, e.target.value)}
                        aria-label={`Bobot kriteria ${c.name} dalam persen`}
                      />
                      <span style={{ color: 'var(--color-slate-400)', fontSize: '0.9rem' }}>%</span>
                    </div>
                  </td>
                  <td>
                    <span className="numeric-data" style={{ color: 'var(--color-cyan-400)', fontWeight: 600 }}>
                      {normalizedRatio}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#0e1728', fontWeight: 700 }}>
              <td colSpan="4" style={{ textAlign: 'right', paddingRight: '16px', color: 'var(--color-slate-300)' }}>
                Total Akumulasi Bobot:
              </td>
              <td>
                <span
                  className="numeric-data"
                  style={{
                    fontSize: '1.1rem',
                    color: isPerfectTotal ? 'var(--color-success)' : 'var(--color-warning)'
                  }}
                >
                  {total.toFixed(0)}%
                </span>
              </td>
              <td>
                <span className="numeric-data" style={{ color: 'var(--color-white-50)' }}>
                  {total > 0 ? '1.0000' : '0.0000'}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Modal / Dialog Rubrik */}
      {selectedRubricCriterion && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rubric-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px'
          }}
        >
          <div
            className="panel"
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: '#101a2d',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div className="panel-header">
              <h3 id="rubric-modal-title" className="panel-title">
                <Icon name="book" size={20} style={{ color: 'var(--color-cyan-400)' }} />
                <span>Panduan Rubrik: {selectedRubricCriterion.name}</span>
              </h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedRubricCriterion(null)}
                aria-label="Tutup Dialog Rubrik"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-300)', marginBottom: '16px' }}>
              Skor rubrik (1–5) merupakan simulasi evaluasi kualitatif spesifikasi teknis untuk memudahkan komputasi matriks SAW bagi kebutuhan mahasiswa.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedRubricCriterion.rubricScale.map(level => (
                <div
                  key={level.score}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-muted-panel)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <span
                    className="badge badge-dummy"
                    style={{
                      background: 'var(--color-blue-500)',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      minWidth: '28px',
                      textAlign: 'center'
                    }}
                  >
                    {level.score}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-white-50)', fontSize: '0.9rem' }}>
                      {level.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)', marginTop: '2px' }}>
                      {level.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedRubricCriterion(null)}
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
