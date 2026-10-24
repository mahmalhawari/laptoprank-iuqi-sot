import React from 'react';
import { ScoreBreakdown } from '../components/saw/ScoreBreakdown.jsx';
import { formatCurrencyIDR } from '../domain/scoring.js';
import { Icon } from '../components/common/Icons.jsx';

export function RecommendationDetail({
  laptopId,
  alternatives,
  sawResult,
  onBack,
  onNavigate
}) {
  const laptop = alternatives.find(a => a.id === laptopId);
  const rankInfo = sawResult && sawResult.rankings ? sawResult.rankings.find(r => r.id === laptopId) : null;

  if (!laptop) {
    return (
      <div className="page-container">
        <div className="panel empty-state">
          <h3>Alternatif Laptop Tidak Ditemukan</h3>
          <p>ID laptop yang diminta tidak valid atau telah dihapus.</p>
          <button className="btn btn-secondary" onClick={onBack}>
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header with Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Icon name="arrowLeft" size={16} />
          <span>Kembali</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('calculation')}
          >
            <Icon name="calculator" size={14} />
            <span>Matriks SAW</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('ranking')}
          >
            <Icon name="trophy" size={14} />
            <span>Lihat Klasemen</span>
          </button>
        </div>
      </div>

      {/* Main Alternative Identity Banner */}
      <div
        className="panel"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #131F33, #0f1828)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <span className="laptop-brand">{laptop.brand}</span>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-white-50)', marginTop: '4px' }}>
              {laptop.name}
            </h1>
            <p style={{ marginTop: '6px', color: 'var(--color-slate-300)', maxWidth: '640px' }}>
              {laptop.description}
            </p>
          </div>

          {rankInfo && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                background: 'var(--color-muted-panel)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div
                className={`badge-rank ${rankInfo.rank === 1 ? 'badge-rank-1' : rankInfo.rank === 2 ? 'badge-rank-2' : rankInfo.rank === 3 ? 'badge-rank-3' : 'badge-rank-default'}`}
                style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}
              >
                #{rankInfo.rank}
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hasil Peringkat SAW
                </span>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-cyan-400)' }}>
                  Skor: {rankInfo.displayScore}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-emerald-400)' }}>
                  {rankInfo.scorePercentage}% Kesesuaian Preferensi
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical Specification Grid */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Harga Pembelian</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-white-50)' }}>
              {formatCurrencyIDR(laptop.price)}
            </div>
            <span className="badge badge-cost" style={{ marginTop: '4px' }}>Cost Kriteria</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Kapasitas RAM</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-white-50)' }}>
              {laptop.ram} GB DDR4/LPDDR5
            </div>
            <span className="badge badge-benefit" style={{ marginTop: '4px' }}>Benefit</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Kapasitas SSD</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-white-50)' }}>
              {laptop.ssd} GB NVMe PCIe
            </div>
            <span className="badge badge-benefit" style={{ marginTop: '4px' }}>Benefit</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Evaluasi Prosesor</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-cyan-400)' }}>
              Skala {laptop.processor}/5
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
              {laptop.specs && laptop.specs.cpuDetail ? laptop.specs.cpuDetail : 'CPU Standard'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Daya Tahan Baterai</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-cyan-400)' }}>
              Skala {laptop.battery}/5
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
              Simulasi mobilitas harian
            </span>
          </div>
        </div>
      </div>

      {/* Score Breakdown & Explainable SAW Analysis */}
      {rankInfo && (
        <ScoreBreakdown
          laptopRankInfo={rankInfo}
          sawResult={sawResult}
        />
      )}
    </div>
  );
}
