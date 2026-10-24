import React from 'react';
import { Icon } from '../components/common/Icons.jsx';

export function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="info" size={28} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Tentang LaptopRank IUQI</span>
          </h1>
          <p>
            Informasi mengenai latar belakang pengembangan, tujuan edukasi, dan batasan prototipe.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Purpose Card */}
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '12px' }}>
            Tujuan Proyek & Konteks Akademik
          </h2>
          <p style={{ lineHeight: '1.7', color: 'var(--color-slate-300)', marginBottom: '12px' }}>
            <strong>LaptopRank IUQI</strong> dikembangkan sebagai prototipe <em>Sistem Pendukung Keputusan (SPK)</em> berbasis web dengan studi kasus pemilihan laptop untuk mahasiswa Institut Ummi Kulsum Al-Insyiroh (IUQI) Bogor.
          </p>
          <p style={{ lineHeight: '1.7', color: 'var(--color-slate-300)' }}>
            Tujuan utama prototipe ini adalah memberikan simulasi pengambilan keputusan multi-kriteria secara transparan dan terstruktur menggunakan algoritma <strong>Simple Additive Weighting (SAW)</strong>, sehingga mahasiswa dapat memahami bagaimana pembobotan kriteria memengaruhi hasil akhir rekomendasi.
          </p>
        </div>

        {/* Dummy Data Disclaimer */}
        <div
          className="panel"
          style={{
            borderLeft: '4px solid var(--color-warning)',
            background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.05), #131F33)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon name="alert" size={20} style={{ color: 'var(--color-warning)' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-warning)' }}>
              Penafian Keterbatasan Data (Data Dummy Disclaimer)
            </h3>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--color-slate-300)', marginBottom: '10px' }}>
            Seluruh data spesifikasi laptop, harga, dan penilaian rubrik prosesor serta baterai yang terdapat dalam aplikasi ini adalah <strong>data simulasi/dummy lokal semata</strong>. Data ini dirancang khusus untuk keperluan pengujian algoritma dan demonstrasi antarmuka.
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--color-slate-400)' }}>
            Aplikasi ini tidak terhubung dengan toko e-commerce resmi, tidak melakukan penarikan harga pasar secara real-time, dan bukan merupakan rekomendasi pembelian komersial atau pengesahan institusional resmi dari pihak IUQI Bogor.
          </p>
        </div>

        {/* Architecture & Tech Specs */}
        <div className="panel">
          <h2 className="panel-title" style={{ marginBottom: '12px' }}>
            Spesifikasi Arsitektur Sistem
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-white-50)', marginBottom: '4px' }}>
                Frontend Framework
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
                React 18 + Vite (Client-side Rendering murni tanpa backend)
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-white-50)', marginBottom: '4px' }}>
                Algoritma Keputusan
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
                Simple Additive Weighting (SAW) dengan normalisasi Cost & Benefit
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-white-50)', marginBottom: '4px' }}>
                Desain & Aksesibilitas
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
                Modern Futuristic SaaS Dark-First, token CSS murni, WCAG ramah navigasi keyboard
              </div>
            </div>

            <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-white-50)', marginBottom: '4px' }}>
                Integritas Model Data
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
                Single Source of Truth kalkulasi terpusat di modul domain murni
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
