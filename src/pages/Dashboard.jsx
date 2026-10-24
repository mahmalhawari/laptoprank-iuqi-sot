import React from 'react';
import { StatCard } from '../components/common/StatCard.jsx';
import { LaptopCard } from '../components/laptop/LaptopCard.jsx';
import { Icon } from '../components/common/Icons.jsx';
import { formatCurrencyIDR } from '../domain/scoring.js';

export function Dashboard({
  alternatives,
  sawResult,
  onNavigate,
  onSelectLaptop
}) {
  const topLaptop = sawResult && sawResult.topRanked ? sawResult.topRanked : null;
  const isCalculationValid = sawResult && sawResult.isValid;

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <span>Dashboard Sistem Pendukung Keputusan</span>
          </h1>
          <p>
            Selamat datang di <strong>LaptopRank IUQI</strong>. Bandingkan laptop pilihan Anda secara transparan dan objektif menggunakan metode <em>Simple Additive Weighting (SAW)</em>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('criteria')}
          >
            <Icon name="sliders" size={16} />
            <span>Atur Bobot Kriteria</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('catalog')}
          >
            <Icon name="laptop" size={16} />
            <span>Jelajahi Katalog</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (derived from real local state) */}
      <div className="stats-grid">
        <StatCard
          label="Alternatif Laptop"
          value={alternatives.length}
          description="Data simulasi lokal mahasiswa"
          icon="laptop"
          accentColor="blue"
        />
        <StatCard
          label="Kriteria Evaluasi"
          value={5}
          description="Harga (Cost), RAM, SSD, CPU, Baterai"
          icon="sliders"
          accentColor="cyan"
        />
        <StatCard
          label="Skor Tertinggi"
          value={topLaptop ? topLaptop.displayScore : '-'}
          description={topLaptop ? `${topLaptop.name}` : 'Kalkulasi belum selesai'}
          icon="trophy"
          accentColor="gold"
        />
        <StatCard
          label="Status Perhitungan"
          value={isCalculationValid ? '100% Sinkron' : 'Perlu Validasi'}
          description="Model SAW matematis terpadu"
          icon="calculator"
          accentColor={isCalculationValid ? 'cyan' : 'blue'}
        />
      </div>

      {/* Main Highlights Grid: Top Pick & Mini Ranking */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Top Recommendation Highlight */}
        <div className="panel" style={{ border: '1px solid rgba(59, 130, 246, 0.4)', background: 'linear-gradient(180deg, #131F33, #0f1829)' }}>
          <div className="panel-header">
            <h2 className="panel-title" style={{ color: 'var(--color-cyan-400)' }}>
              <Icon name="trophy" size={20} />
              <span>Rekomendasi Terbaik (#1)</span>
            </h2>
            <span className="badge badge-benefit">Skor Tertinggi</span>
          </div>

          {topLaptop ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span className="laptop-brand">{topLaptop.brand}</span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-white-50)' }}>
                    {topLaptop.name}
                  </h3>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '6px' }}>
                    {formatCurrencyIDR(topLaptop.price)}
                  </div>
                </div>

                <div
                  className="badge-rank badge-rank-1"
                  style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}
                >
                  #1
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--color-slate-300)', marginBottom: '16px' }}>
                {topLaptop.description}
              </p>

              <div className="spec-pills" style={{ marginBottom: '20px' }}>
                <span className="spec-pill">RAM: <strong>{topLaptop.ram} GB</strong></span>
                <span className="spec-pill">SSD: <strong>{topLaptop.ssd} GB</strong></span>
                <span className="spec-pill">CPU Rubrik: <strong>{topLaptop.processor}/5</strong></span>
                <span className="spec-pill">Baterai: <strong>{topLaptop.battery}/5</strong></span>
              </div>

              <div
                style={{
                  background: 'var(--color-muted-panel)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Total Skor Preferensi (V1)</div>
                  <div className="score-value" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-cyan-400)' }}>
                    {topLaptop.displayScore} <span style={{ fontSize: '0.9rem', color: 'var(--color-slate-400)' }}>({topLaptop.scorePercentage}%)</span>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onSelectLaptop(topLaptop.id)}
                >
                  <span>Lihat Analisis Lengkap</span>
                  <Icon name="chevronRight" size={14} />
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--color-slate-400)' }}>Belum ada kalkulasi yang tersedia.</p>
          )}
        </div>

        {/* Mini Ranking Preview */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <Icon name="award" size={20} style={{ color: 'var(--color-blue-400)' }} />
              <span>Klasemen Rekomendasi Laptop</span>
            </h2>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onNavigate('ranking')}
              style={{ color: 'var(--color-cyan-400)' }}
            >
              <span>Lihat Semua</span>
              <Icon name="chevronRight" size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sawResult && sawResult.rankings.slice(0, 4).map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--color-muted-panel)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
                onClick={() => onSelectLaptop(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    className={`badge-rank ${item.rank === 1 ? 'badge-rank-1' : item.rank === 2 ? 'badge-rank-2' : item.rank === 3 ? 'badge-rank-3' : 'badge-rank-default'}`}
                    style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}
                  >
                    #{item.rank}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-white-50)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                      {formatCurrencyIDR(item.price)} • RAM {item.ram}GB • SSD {item.ssd}GB
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="score-value" style={{ fontWeight: 700, color: 'var(--color-cyan-400)' }}>
                    {item.displayScore}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-slate-400)' }}>
                    {item.scorePercentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div
          className="panel"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('calculation')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-blue-400)' }}>
              <Icon name="calculator" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-white-50)' }}>Matriks Perhitungan SAW</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>Periksa rumus normalisasi benefit dan cost</p>
            </div>
          </div>
        </div>

        <div
          className="panel"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('method')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'rgba(34, 211, 238, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-cyan-400)' }}>
              <Icon name="book" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-white-50)' }}>Panduan Metode SAW</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>Pelajari tahapan dan rumus matematika SPK</p>
            </div>
          </div>
        </div>

        <div
          className="panel"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('about')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', background: 'rgba(52, 211, 153, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-emerald-400)' }}>
              <Icon name="info" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-white-50)' }}>Tentang Aplikasi</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-slate-400)' }}>Tujuan edukatif dan penafian data simulasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
