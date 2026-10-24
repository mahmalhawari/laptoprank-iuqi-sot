import React from 'react';
import { Icon } from '../components/common/Icons.jsx';

export function MethodSaw({ onNavigate }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="book" size={28} style={{ color: 'var(--color-blue-400)' }} />
            <span>Metodologi Simple Additive Weighting (SAW)</span>
          </h1>
          <p>
            Memahami konsep dasar, tahapan matematis, dan formula perankingan yang digunakan pada sistem pendukung keputusan ini.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onNavigate('calculation')}
        >
          <Icon name="calculator" size={16} />
          <span>Lihat Matriks Nyata</span>
        </button>
      </div>

      {/* Intro Panel */}
      <div className="panel" style={{ marginBottom: '24px' }}>
        <h2 className="panel-title" style={{ marginBottom: '12px' }}>
          Apa itu Metode SAW?
        </h2>
        <p style={{ lineHeight: '1.7', color: 'var(--color-slate-300)', marginBottom: '14px' }}>
          Metode <strong>Simple Additive Weighting (SAW)</strong> — sering dikenal sebagai metode penjumlahan terbobot — adalah salah satu algoritma Multi-Attribute Decision Making (MADM) yang paling banyak digunakan. Konsep dasar metode SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif di semua kriteria.
        </p>
        <p style={{ lineHeight: '1.7', color: 'var(--color-slate-300)' }}>
          Metode ini mengharuskan proses normalisasi matriks keputusan (X) ke suatu skala yang dapat diperbandingkan (R) dengan seluruh rating alternatif yang ada.
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        {/* Step 1 */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div className="badge-rank badge-rank-1" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white-50)' }}>
              Menentukan Kriteria &amp; Pembobotan (W)
            </h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate-300)', lineHeight: '1.6' }}>
            Menentukan kriteria yang relevan untuk pemilihan laptop (Harga, RAM, SSD, Prosesor, dan Baterai), mengidentifikasi sifat kriteria (apakah <strong>Benefit</strong> atau <strong>Cost</strong>), serta menetapkan bobot preferensi (w<sub>j</sub>).
            Bobot dinormalisasi sehingga totalnya bernilai 1.0:
          </p>
          <div style={{ marginTop: '8px', padding: '8px 14px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-cyan-400)' }}>
            W_j = w_j / sum(w)
          </div>
        </div>

        {/* Step 2 */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div className="badge-rank badge-rank-2" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white-50)' }}>
              Membentuk Matriks Keputusan (X)
            </h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate-300)', lineHeight: '1.6' }}>
            Menyusun data alternatif laptop (A<sub>i</sub>) dan nilai kriteria (x<sub>ij</sub>) ke dalam bentuk matriks berukuran m &times; n, di mana m adalah jumlah laptop dan n adalah jumlah kriteria.
          </p>
        </div>

        {/* Step 3 */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div className="badge-rank badge-rank-3" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white-50)' }}>
              Melakukan Normalisasi Matriks (R)
            </h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate-300)', lineHeight: '1.6', marginBottom: '12px' }}>
            Elemen matriks dinormalisasi (r<sub>ij</sub>) sesuai jenis kriterianya agar seluruh satuan yang berbeda (Rupiah, GB, skala rubrik) dapat dijumlahkan:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-emerald-400)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-emerald-400)', fontSize: '0.85rem', marginBottom: '4px' }}>
                Jika Kriteria Benefit (Keuntungan):
              </div>
              <code style={{ color: 'var(--color-cyan-400)', fontSize: '0.9rem' }}>r_ij = x_ij / max(x_j)</code>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-rose-400)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-rose-400)', fontSize: '0.85rem', marginBottom: '4px' }}>
                Jika Kriteria Cost (Biaya / Harga):
              </div>
              <code style={{ color: 'var(--color-cyan-400)', fontSize: '0.9rem' }}>r_ij = min(x_j) / x_ij</code>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div className="badge-rank badge-rank-default" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
              4
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-white-50)' }}>
              Menghitung Nilai Preferensi (V<sub>i</sub>) &amp; Perangkingan
            </h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-slate-300)', lineHeight: '1.6', marginBottom: '8px' }}>
            Nilai preferensi setiap alternatif (V<sub>i</sub>) dihitung dengan menjumlahkan hasil kali matriks ternormalisasi (r<sub>ij</sub>) dengan bobot relatif kriteria (W<sub>j</sub>):
          </p>
          <div style={{ padding: '8px 14px', background: 'var(--color-navy-950)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-cyan-400)', marginBottom: '8px' }}>
            V_i = &Sigma; (W_j &times; r_ij)
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
            Nilai V<sub>i</sub> yang lebih besar mengindikasikan bahwa alternatif tersebut lebih disukai dan menjadi prioritas rekomendasi tertinggi.
          </p>
        </div>
      </div>

      {/* Illustrative Dummy Example Box */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <Icon name="sparkles" size={20} style={{ color: 'var(--color-cyan-400)' }} />
            <span>Contoh Sederhana Perhitungan Manual (Ilustratif)</span>
          </h2>
          <span className="badge badge-dummy">Simulasi</span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--color-slate-300)', lineHeight: '1.6', marginBottom: '14px' }}>
          Misalkan kita membandingkan 2 alternatif untuk kriteria Harga (Cost, min = Rp5.000.000) dan RAM (Benefit, max = 16GB):
        </p>

        <ul style={{ paddingLeft: '20px', color: 'var(--color-slate-300)', fontSize: '0.875rem', lineHeight: '1.8' }}>
          <li>
            <strong>Laptop A:</strong> Harga Rp5.000.000, RAM 8GB
            <br />
            Normalisasi Harga: <code>5jt / 5jt = 1.00</code> | Normalisasi RAM: <code>8GB / 16GB = 0.50</code>
          </li>
          <li>
            <strong>Laptop B:</strong> Harga Rp10.000.000, RAM 16GB
            <br />
            Normalisasi Harga: <code>5jt / 10jt = 0.50</code> | Normalisasi RAM: <code>16GB / 16GB = 1.00</code>
          </li>
        </ul>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)', marginTop: '12px' }}>
          Jika bobot Harga = 50% dan RAM = 50%:
          <br />
          Skor Laptop A: (1.0 &times; 0.5) + (0.5 &times; 0.5) = 0.75
          <br />
          Skor Laptop B: (0.5 &times; 0.5) + (1.0 &times; 0.5) = 0.75 (Hasil seri berbagi peringkat yang sama).
        </p>
      </div>

      {/* Interactive Live SAW Mini-Simulator */}
      <InteractiveSimulator onNavigate={onNavigate} />
    </div>
  );
}

function InteractiveSimulator({ onNavigate }) {
  const [priceA, setPriceA] = React.useState(5000000);
  const [priceB, setPriceB] = React.useState(8000000);
  const [ramA, setRamA] = React.useState(8);
  const [ramB, setRamB] = React.useState(16);
  const [weightPrice, setWeightPrice] = React.useState(50);
  const weightRam = 100 - weightPrice;

  // Normalisasi
  const minPrice = Math.min(priceA, priceB);
  const maxRam = Math.max(ramA, ramB);

  const normPriceA = priceA > 0 ? minPrice / priceA : 0;
  const normPriceB = priceB > 0 ? minPrice / priceB : 0;

  const normRamA = maxRam > 0 ? ramA / maxRam : 0;
  const normRamB = maxRam > 0 ? ramB / maxRam : 0;

  // Skor
  const scoreA = (normPriceA * (weightPrice / 100)) + (normRamA * (weightRam / 100));
  const scoreB = (normPriceB * (weightPrice / 100)) + (normRamB * (weightRam / 100));

  const winner = scoreA > scoreB ? 'Laptop A Unggul' : scoreB > scoreA ? 'Laptop B Unggul' : 'Skor Seri (Tied)';

  return (
    <div className="panel" style={{ marginTop: '24px', border: '1px solid rgba(34, 211, 238, 0.4)' }}>
      <div className="panel-header">
        <h3 className="panel-title" style={{ color: 'var(--color-cyan-400)' }}>
          <Icon name="calculator" size={20} />
          <span>Simulasi Live Interaktif SAW (Coba Sendiri)</span>
        </h3>
        <span className="badge badge-benefit">Kalkulator Interaktif</span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-300)', marginBottom: '16px' }}>
        Geser bobot dan ubah nilai di bawah ini untuk melihat langsung bagaimana normalisasi Cost &amp; Benefit memengaruhi skor akhir:
      </p>

      {/* Slider Bobot */}
      <div style={{ background: 'var(--color-muted-panel)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.875rem' }}>
          <span>Bobot Harga (Cost): <strong>{weightPrice}%</strong></span>
          <span>Bobot RAM (Benefit): <strong>{weightRam}%</strong></span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          value={weightPrice}
          onChange={(e) => setWeightPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--color-cyan-400)' }}
          aria-label="Pengatur bobot kriteria harga vs RAM"
        />
      </div>

      {/* Grid Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        {/* Laptop A */}
        <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontWeight: 700, color: 'var(--color-white-50)', marginBottom: '8px' }}>Laptop A</div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>Harga (Rp)</label>
            <input
              type="number"
              className="form-input"
              value={priceA}
              onChange={(e) => setPriceA(Number(e.target.value))}
              step="500000"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>RAM (GB)</label>
            <input
              type="number"
              className="form-input"
              value={ramA}
              onChange={(e) => setRamA(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '8px', fontSize: '0.85rem' }}>
            <div>Normalisasi Harga: <code>{normPriceA.toFixed(3)}</code></div>
            <div>Normalisasi RAM: <code>{normRamA.toFixed(3)}</code></div>
            <div style={{ marginTop: '4px', fontWeight: 700, color: 'var(--color-cyan-400)' }}>
              Skor Preferensi V_A: {scoreA.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Laptop B */}
        <div style={{ padding: '14px', background: 'var(--color-muted-panel)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontWeight: 700, color: 'var(--color-white-50)', marginBottom: '8px' }}>Laptop B</div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>Harga (Rp)</label>
            <input
              type="number"
              className="form-input"
              value={priceB}
              onChange={(e) => setPriceB(Number(e.target.value))}
              step="500000"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)', display: 'block' }}>RAM (GB)</label>
            <input
              type="number"
              className="form-input"
              value={ramB}
              onChange={(e) => setRamB(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '8px', fontSize: '0.85rem' }}>
            <div>Normalisasi Harga: <code>{normPriceB.toFixed(3)}</code></div>
            <div>Normalisasi RAM: <code>{normRamA.toFixed(3)}</code></div>
            <div style={{ marginTop: '4px', fontWeight: 700, color: 'var(--color-cyan-400)' }}>
              Skor Preferensi V_B: {scoreB.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-navy-950)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-slate-400)' }}>Hasil Evaluasi SAW:</span>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-emerald-400)' }}>{winner}</div>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('calculation')}>
          Buka Matriks Lengkap 6 Laptop
        </button>
      </div>
    </div>
  );
}
