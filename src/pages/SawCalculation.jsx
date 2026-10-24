import React from 'react';
import { MatrixView } from '../components/saw/MatrixView.jsx';
import { Icon } from '../components/common/Icons.jsx';

export function SawCalculation({ sawResult, onNavigate }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="calculator" size={28} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Transparansi Perhitungan SAW</span>
          </h1>
          <p>
            Memeriksa setiap tahapan komputasi matriks matematika Simple Additive Weighting secara langsung dan transparan.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('criteria')}
          >
            <Icon name="sliders" size={16} />
            <span>Ubah Bobot Kriteria</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('ranking')}
          >
            <Icon name="trophy" size={16} />
            <span>Lihat Pemeringkatan</span>
          </button>
        </div>
      </div>

      {/* Matrix View Component */}
      <MatrixView sawResult={sawResult} />

      {/* Formula Explanation Cards */}
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div className="panel">
          <h3 style={{ fontSize: '1rem', color: 'var(--color-emerald-400)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-benefit">Kriteria Benefit</span>
            <span>RAM, SSD, CPU, Baterai</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-300)', lineHeight: '1.6' }}>
            Kriteria bernilai positif di mana semakin besar nilainya, semakin menguntungkan bagi pengguna.
          </p>
          <div style={{ marginTop: '10px', padding: '8px 12px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyan-400)' }}>
            r_ij = x_ij / max(x_j)
          </div>
        </div>

        <div className="panel">
          <h3 style={{ fontSize: '1rem', color: 'var(--color-rose-400)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cost">Kriteria Cost</span>
            <span>Harga Laptop</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-300)', lineHeight: '1.6' }}>
            Kriteria biaya di mana semakin kecil nilainya, semakin tinggi preferensi efisiensi pengeluaran mahasiswa.
          </p>
          <div style={{ marginTop: '10px', padding: '8px 12px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyan-400)' }}>
            r_ij = min(x_j) / x_ij
          </div>
        </div>
      </div>
    </div>
  );
}
