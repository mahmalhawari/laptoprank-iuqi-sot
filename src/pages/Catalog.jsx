import React, { useState } from 'react';
import { FilterPanel } from '../components/laptop/FilterPanel.jsx';
import { LaptopCard } from '../components/laptop/LaptopCard.jsx';
import { Icon } from '../components/common/Icons.jsx';
import { formatCurrencyIDR } from '../domain/scoring.js';

export function Catalog({
  alternatives,
  sawResult,
  onSelectLaptop
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: 'all',
    ram: 'all',
    ssd: 'all',
    maxPrice: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Kumpulkan daftar brand unik
  const uniqueBrands = Array.from(new Set(alternatives.map(a => a.brand))).filter(Boolean);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      brand: 'all',
      ram: 'all',
      ssd: 'all',
      maxPrice: ''
    });
  };

  // Filter gabungan konjungtif (AND)
  const filteredAlternatives = alternatives.filter(laptop => {
    // 1. Text search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = laptop.name.toLowerCase().includes(q);
      const matchBrand = laptop.brand ? laptop.brand.toLowerCase().includes(q) : false;
      const matchCpu = laptop.specs && laptop.specs.cpuDetail ? laptop.specs.cpuDetail.toLowerCase().includes(q) : false;
      if (!matchName && !matchBrand && !matchCpu) return false;
    }

    // 2. Brand
    if (filters.brand !== 'all' && laptop.brand !== filters.brand) {
      return false;
    }

    // 3. RAM
    if (filters.ram !== 'all' && String(laptop.ram) !== String(filters.ram)) {
      return false;
    }

    // 4. SSD
    if (filters.ssd !== 'all' && String(laptop.ssd) !== String(filters.ssd)) {
      return false;
    }

    // 5. Max Price
    if (filters.maxPrice !== '' && laptop.price > Number(filters.maxPrice)) {
      return false;
    }

    return true;
  });

  // Map ranking info for each laptop from shared calculation result
  const rankMap = {};
  if (sawResult && sawResult.rankings) {
    sawResult.rankings.forEach(r => {
      rankMap[r.id] = r;
    });
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1>
            <Icon name="laptop" size={28} style={{ color: 'var(--color-blue-400)' }} />
            <span>Katalog Alternatif Laptop</span>
          </h1>
          <p>
            Telusuri dan saring alternatif laptop berdasarkan spesifikasi dan anggaran. Skor peringkat dihitung dari modul SAW terpadu.
          </p>
        </div>

        {/* View mode toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            aria-label="Tampilan Grid Kartu"
          >
            Kartu
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
            aria-label="Tampilan Tabel"
          >
            Tabel
          </button>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalItems={alternatives.length}
        filteredCount={filteredAlternatives.length}
        brands={uniqueBrands}
      />

      {/* Notice about SAW candidate integrity */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          background: 'rgba(34, 211, 238, 0.08)',
          border: '1px solid rgba(34, 211, 238, 0.2)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          color: 'var(--color-slate-300)',
          marginBottom: '20px'
        }}
      >
        <Icon name="info" size={16} style={{ color: 'var(--color-cyan-400)', flexShrink: 0 }} />
        <span>
          <strong>Integritas Data SAW:</strong> Filter katalog ini hanya mengubah filter tampilan visual. Seluruh kandidat laptop tetap diikutsertakan dalam perankingan matematis SAW secara konsisten.
        </span>
      </div>

      {/* Empty State */}
      {filteredAlternatives.length === 0 ? (
        <div className="empty-state">
          <Icon name="search" size={48} className="empty-icon" />
          <h3 style={{ color: 'var(--color-white-50)' }}>Tidak Ada Laptop yang Cocok</h3>
          <p style={{ maxWidth: '420px', color: 'var(--color-slate-400)' }}>
            Tidak ditemukan laptop yang sesuai dengan kombinasi pencarian dan filter Anda. Silakan longgarkan kriteria atau reset filter.
          </p>
          <button className="btn btn-secondary" onClick={handleResetFilters}>
            <Icon name="reset" size={16} />
            <span>Reset Filter Sekarang</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="laptop-grid">
          {filteredAlternatives.map(laptop => (
            <LaptopCard
              key={laptop.id}
              laptop={laptop}
              rankInfo={rankMap[laptop.id]}
              onSelect={onSelectLaptop}
            />
          ))}
        </div>
      ) : (
        /* Responsive Table View */
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Nama Laptop</th>
                <th>Brand</th>
                <th>Harga</th>
                <th>RAM</th>
                <th>SSD</th>
                <th>CPU (Rubrik)</th>
                <th>Baterai (Rubrik)</th>
                <th>Skor SAW</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlternatives.map(laptop => {
                const rankInfo = rankMap[laptop.id];
                return (
                  <tr key={laptop.id}>
                    <td>
                      {rankInfo ? (
                        <div
                          className={`badge-rank ${rankInfo.rank === 1 ? 'badge-rank-1' : rankInfo.rank === 2 ? 'badge-rank-2' : rankInfo.rank === 3 ? 'badge-rank-3' : 'badge-rank-default'}`}
                          style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}
                        >
                          #{rankInfo.rank}
                        </div>
                      ) : '-'}
                    </td>
                    <td style={{ fontWeight: 600 }}>{laptop.name}</td>
                    <td><span className="laptop-brand">{laptop.brand}</span></td>
                    <td className="numeric-data">{formatCurrencyIDR(laptop.price)}</td>
                    <td className="numeric-data">{laptop.ram} GB</td>
                    <td className="numeric-data">{laptop.ssd} GB</td>
                    <td className="numeric-data">Skala {laptop.processor}/5</td>
                    <td className="numeric-data">Skala {laptop.battery}/5</td>
                    <td className="numeric-data">
                      {rankInfo ? (
                        <strong style={{ color: 'var(--color-cyan-400)' }}>
                          {rankInfo.displayScore}
                        </strong>
                      ) : '-'}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onSelectLaptop(laptop.id)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
