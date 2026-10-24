import React from 'react';
import { WeightEditor } from '../components/criteria/WeightEditor.jsx';
import { Icon } from '../components/common/Icons.jsx';

export function CriteriaWeights({
  weights,
  onWeightChange,
  onResetWeights,
  onNavigate
}) {
  const presets = [
    {
      label: 'Default Seimbang',
      description: 'Prioritas merata untuk berbagai kebutuhan mahasiswa',
      weights: { price: 30, ram: 20, ssd: 20, processor: 15, battery: 15 }
    },
    {
      label: 'Prioritas Anggaran Hemat',
      description: 'Menitikberatkan faktor harga murah (Cost)',
      weights: { price: 50, ram: 15, ssd: 15, processor: 10, battery: 10 }
    },
    {
      label: 'Prioritas Performa & Coding',
      description: 'Menitikberatkan RAM besar dan performa prosesor',
      weights: { price: 15, ram: 30, ssd: 25, processor: 20, battery: 10 }
    },
    {
      label: 'Prioritas Mobilitas & Baterai',
      description: 'Menitikberatkan ketahanan baterai untuk kuliah seharian',
      weights: { price: 20, ram: 15, ssd: 15, processor: 15, battery: 35 }
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="sliders" size={28} style={{ color: 'var(--color-blue-400)' }} />
            <span>Kriteria & Pembobotan SAW</span>
          </h1>
          <p>
            Tentukan bobot preferensi sesuai skala prioritas pribadi Anda. Perubahan bobot akan langsung memperbarui kalkulasi peringkat secara otomatis.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onNavigate('ranking')}
        >
          <Icon name="trophy" size={16} />
          <span>Lihat Hasil Peringkat</span>
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="panel" style={{ marginBottom: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '12px' }}>
          <h3 className="panel-title" style={{ fontSize: '1rem' }}>
            <Icon name="sparkles" size={18} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Pilih Profil Kebutuhan Mahasiswa (Preset Cepat)</span>
          </h3>
          <span className="badge badge-dummy">Opsional</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {presets.map(preset => (
            <div
              key={preset.label}
              style={{
                padding: '12px 14px',
                background: 'var(--color-muted-panel)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-white-50)', fontSize: '0.9rem' }}>
                  {preset.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', marginTop: '2px' }}>
                  {preset.description}
                </div>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '6px' }}
                onClick={() => onWeightChange(preset.weights)}
              >
                Gunakan Profil Ini
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Weight Editor */}
      <WeightEditor
        weights={weights}
        onWeightChange={onWeightChange}
        onResetWeights={onResetWeights}
      />
    </div>
  );
}
