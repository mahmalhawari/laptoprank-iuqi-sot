import React from 'react';
import { Icon } from '../common/Icons.jsx';
import { NAV_ITEMS } from '../../app/navigation.js';

export function Topbar({ currentTab, onOpenMenu, sawResult, selectedLaptopId, onClearSelectedLaptop }) {
  const currentNav = NAV_ITEMS.find(n => n.id === currentTab);
  const pageTitle = selectedLaptopId ? 'Detail Rekomendasi' : (currentNav ? currentNav.label : 'Dashboard');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-toggle"
          onClick={onOpenMenu}
          aria-label="Buka Menu Navigasi"
        >
          <Icon name="menu" size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedLaptopId && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={onClearSelectedLaptop}
              style={{ padding: '4px 8px' }}
              title="Kembali"
            >
              <Icon name="arrowLeft" size={16} />
              <span>Kembali</span>
            </button>
          )}
          <span style={{ color: 'var(--color-slate-400)', fontSize: '0.9rem' }}>Sistem Pendukung Keputusan</span>
          <span style={{ color: 'var(--color-slate-500)' }}>/</span>
          <span style={{ fontWeight: 600, color: 'var(--color-white-50)', fontSize: '0.95rem' }}>
            {pageTitle}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {sawResult && sawResult.isValid ? (
          <div
            className="badge badge-benefit"
            title="Kalkulasi SAW Aktif dan Sinkron"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}
          >
            <Icon name="check" size={14} />
            <span>Kalkulasi SAW Sinkron</span>
          </div>
        ) : (
          <div
            className="badge badge-cost"
            title="Periksa konfigurasi bobot atau data kriteria"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}
          >
            <Icon name="alert" size={14} />
            <span>Periksa Bobot</span>
          </div>
        )}

        <div className="badge badge-dummy" style={{ display: 'none' }}>
          SPK IUQI
        </div>
      </div>
    </header>
  );
}
