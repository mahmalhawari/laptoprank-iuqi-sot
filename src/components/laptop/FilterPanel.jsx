import React from 'react';
import { Icon } from '../common/Icons.jsx';

export function FilterPanel({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onResetFilters,
  totalItems,
  filteredCount,
  brands = []
}) {
  const isFiltered =
    searchQuery.trim() !== '' ||
    filters.brand !== 'all' ||
    filters.ram !== 'all' ||
    filters.ssd !== 'all' ||
    filters.maxPrice !== '';

  return (
    <div className="filter-panel" role="search" aria-label="Filter Katalog Laptop">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="search-wrapper" style={{ minWidth: '280px' }}>
          <Icon name="search" size={18} className="search-icon" />
          <input
            id="catalog-search-input"
            type="search"
            className="form-input search-input"
            placeholder="Cari nama laptop, seri, atau spesifikasi..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari laptop berdasarkan nama atau spesifikasi"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-slate-400)' }}>
            Menampilkan <strong style={{ color: 'var(--color-white-50)' }}>{filteredCount}</strong> dari {totalItems} laptop
          </span>

          {isFiltered && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={onResetFilters}
              style={{ color: 'var(--color-cyan-400)' }}
              aria-label="Reset semua filter ke kondisi semula"
            >
              <Icon name="reset" size={14} />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      <div className="filter-grid">
        <div className="form-group">
          <label htmlFor="filter-brand" className="form-label">
            Brand / Merek
          </label>
          <select
            id="filter-brand"
            className="form-select"
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
          >
            <option value="all">Semua Brand</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="filter-ram" className="form-label">
            Kapasitas RAM
          </label>
          <select
            id="filter-ram"
            className="form-select"
            value={filters.ram}
            onChange={(e) => onFilterChange('ram', e.target.value)}
          >
            <option value="all">Semua RAM</option>
            <option value="8">8 GB</option>
            <option value="16">16 GB</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="filter-ssd" className="form-label">
            Kapasitas SSD
          </label>
          <select
            id="filter-ssd"
            className="form-select"
            value={filters.ssd}
            onChange={(e) => onFilterChange('ssd', e.target.value)}
          >
            <option value="all">Semua SSD</option>
            <option value="256">256 GB</option>
            <option value="512">512 GB</option>
            <option value="1024">1 TB (1024 GB)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="filter-price" className="form-label">
            Harga Maksimal
          </label>
          <select
            id="filter-price"
            className="form-select"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          >
            <option value="">Semua Anggaran</option>
            <option value="5500000">Maks. Rp5.500.000</option>
            <option value="6500000">Maks. Rp6.500.000</option>
            <option value="7500000">Maks. Rp7.500.000</option>
            <option value="8500000">Maks. Rp8.500.000</option>
          </select>
        </div>
      </div>
    </div>
  );
}
