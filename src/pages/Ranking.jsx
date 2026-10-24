import React from 'react';
import { formatCurrencyIDR } from '../domain/scoring.js';
import { Icon } from '../components/common/Icons.jsx';

export function Ranking({ sawResult, onSelectLaptop, onNavigate }) {
  if (!sawResult || !sawResult.isValid) {
    return (
      <div className="page-container">
        <div className="panel">
          <h2 style={{ color: 'var(--color-danger)' }}>Kalkulasi Belum Tersedia</h2>
          <p style={{ marginTop: '8px', color: 'var(--color-slate-300)' }}>
            Silakan periksa kriteria dan bobot untuk menyelesaikan kalkulasi pemeringkatan.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '16px' }}
            onClick={() => onNavigate('criteria')}
          >
            Buka Kriteria & Bobot
          </button>
        </div>
      </div>
    );
  }

  const { rankings } = sawResult;

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'badge-rank-1';
    if (rank === 2) return 'badge-rank-2';
    if (rank === 3) return 'badge-rank-3';
    return 'badge-rank-default';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="trophy" size={28} style={{ color: '#F59E0B' }} />
            <span>Hasil Pemeringkatan Alternatif Laptop</span>
          </h1>
          <p>
            Klasemen disusun berdasarkan skor preferensi akhir Simple Additive Weighting (V<sub>i</sub>) secara objektif dan deterministik.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onNavigate('calculation')}
        >
          <Icon name="calculator" size={16} />
          <span>Lihat Matriks Perhitungan</span>
        </button>
      </div>

      {/* Top 3 Podium Cards */}
      {rankings.length >= 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {rankings.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className="panel"
              style={{
                border: item.rank === 1 ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--color-border)',
                background: item.rank === 1 ? 'linear-gradient(180deg, rgba(245, 158, 11, 0.08), #131F33)' : 'var(--color-panel)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className={`badge-rank ${getRankBadgeClass(item.rank)}`}>
                  #{item.rank}
                </span>
                <span className="badge badge-dummy">
                  {item.rank === 1 ? 'Rekomendasi Utama' : `Peringkat ${item.rank}`}
                </span>
              </div>

              <span className="laptop-brand">{item.brand}</span>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white-50)', marginBottom: '8px' }}>
                {item.name}
              </h3>

              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-white-50)', marginBottom: '12px' }}>
                {formatCurrencyIDR(item.price)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>Skor Preferensi</span>
                  <strong style={{ color: 'var(--color-cyan-400)', fontSize: '1.1rem' }}>
                    {item.displayScore} ({item.scorePercentage}%)
                  </strong>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectLaptop(item.id)}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Ranking Table */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <Icon name="award" size={20} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Tabel Klasemen Keseluruhan</span>
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
            Diurutkan berdasarkan skor unrounded tertinggi
          </span>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Nama Alternatif</th>
                <th>Brand</th>
                <th>Harga (Cost)</th>
                <th>RAM</th>
                <th>SSD</th>
                <th>CPU</th>
                <th>Baterai</th>
                <th>Skor Preferensi (V<sub>i</sub>)</th>
                <th>Persentase</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map(item => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: item.rank === 1 ? 'rgba(245, 158, 11, 0.05)' : undefined
                  }}
                >
                  <td>
                    <div
                      className={`badge-rank ${getRankBadgeClass(item.rank)}`}
                      style={{ width: '32px', height: '32px' }}
                    >
                      #{item.rank}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-white-50)' }}>
                      {item.name}
                    </div>
                    {item.specs && item.specs.cpuDetail && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>
                        {item.specs.cpuDetail}
                      </div>
                    )}
                  </td>
                  <td><span className="laptop-brand">{item.brand}</span></td>
                  <td className="numeric-data">{formatCurrencyIDR(item.price)}</td>
                  <td className="numeric-data">{item.ram} GB</td>
                  <td className="numeric-data">{item.ssd} GB</td>
                  <td className="numeric-data">Skala {item.processor}/5</td>
                  <td className="numeric-data">Skala {item.battery}/5</td>
                  <td className="numeric-data">
                    <strong style={{ color: 'var(--color-cyan-400)', fontSize: '1rem' }}>
                      {item.displayScore}
                    </strong>
                  </td>
                  <td className="numeric-data">
                    <span className="badge badge-benefit">
                      {item.scorePercentage}%
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectLaptop(item.id)}
                      aria-label={`Buka detail analisis rekomendasi untuk ${item.name}`}
                    >
                      Analisis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
