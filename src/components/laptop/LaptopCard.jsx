import React from 'react';
import { formatCurrencyIDR } from '../../domain/scoring.js';
import { Icon } from '../common/Icons.jsx';

export function LaptopCard({ laptop, rankInfo, onSelect }) {
  const isRanked = rankInfo && rankInfo.rank;

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'badge-rank-1';
    if (rank === 2) return 'badge-rank-2';
    if (rank === 3) return 'badge-rank-3';
    return 'badge-rank-default';
  };

  return (
    <article className="laptop-card" aria-labelledby={`laptop-title-${laptop.id}`}>
      <div>
        <div className="laptop-card-header">
          <div>
            <span className="laptop-brand">{laptop.brand}</span>
            <h3 id={`laptop-title-${laptop.id}`} className="laptop-card-title">
              {laptop.name}
            </h3>
          </div>
          {isRanked && (
            <div
              className={`badge-rank ${getRankBadgeClass(rankInfo.rank)}`}
              title={`Peringkat #${rankInfo.rank} (Skor: ${rankInfo.displayScore})`}
              aria-label={`Peringkat ${rankInfo.rank}`}
            >
              #{rankInfo.rank}
            </div>
          )}
        </div>

        <div style={{ marginTop: '12px', marginBottom: '16px' }}>
          <div className="laptop-price">
            {formatCurrencyIDR(laptop.price)}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
            Harga simulasi lokal (Cost)
          </span>
        </div>

        <div className="spec-pills">
          <div className="spec-pill" title="Kapasitas RAM">
            <span style={{ color: 'var(--color-slate-400)' }}>RAM:</span>
            <strong style={{ color: 'var(--color-white-50)' }}>{laptop.ram} GB</strong>
          </div>
          <div className="spec-pill" title="Kapasitas SSD">
            <span style={{ color: 'var(--color-slate-400)' }}>SSD:</span>
            <strong style={{ color: 'var(--color-white-50)' }}>{laptop.ssd} GB</strong>
          </div>
          <div className="spec-pill" title={`Rubrik CPU: Level ${laptop.processor}/5`}>
            <span style={{ color: 'var(--color-slate-400)' }}>CPU:</span>
            <strong style={{ color: 'var(--color-cyan-400)' }}>Skala {laptop.processor}/5</strong>
          </div>
          <div className="spec-pill" title={`Rubrik Baterai: Level ${laptop.battery}/5`}>
            <span style={{ color: 'var(--color-slate-400)' }}>Baterai:</span>
            <strong style={{ color: 'var(--color-cyan-400)' }}>Skala {laptop.battery}/5</strong>
          </div>
        </div>

        {laptop.specs && laptop.specs.cpuDetail && (
          <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>
            <span style={{ color: 'var(--color-slate-300)' }}>{laptop.specs.cpuDetail}</span> • {laptop.specs.screen}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        {isRanked ? (
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>Skor Preferensi</span>
            <span className="score-value" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-cyan-400)' }}>
              {rankInfo.displayScore} ({rankInfo.scorePercentage}%)
            </span>
          </div>
        ) : (
          <span className="badge badge-dummy">Data Dummy</span>
        )}

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onSelect(laptop.id)}
          aria-label={`Lihat Analisis Detail untuk ${laptop.name}`}
        >
          <span>Detail Analisis</span>
          <Icon name="chevronRight" size={14} />
        </button>
      </div>
    </article>
  );
}
