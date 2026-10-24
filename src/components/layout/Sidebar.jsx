import React from 'react';
import { NAV_ITEMS } from '../../app/navigation.js';
import { Icon } from '../common/Icons.jsx';

export function Sidebar({ currentTab, onSelectTab, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Navigasi Utama">
        <div className="sidebar-header">
          <div className="brand-badge">
            <div className="brand-icon">L</div>
            <div>
              <div>LaptopRank</div>
              <span className="brand-subtitle">IUQI Bogor</span>
            </div>
          </div>
          {isOpen && (
            <button
              className="btn btn-ghost btn-sm menu-toggle"
              onClick={onClose}
              aria-label="Tutup Menu"
            >
              <Icon name="close" size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onClose) onClose();
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon name={item.icon} size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span className="badge badge-dummy" style={{ fontSize: '0.65rem' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="disclaimer-badge">
            <Icon name="info" size={16} style={{ color: 'var(--color-cyan-400)', flexShrink: 0 }} />
            <span>Mode Prototipe Data Dummy Lokal</span>
          </div>
        </div>
      </aside>
    </>
  );
}
