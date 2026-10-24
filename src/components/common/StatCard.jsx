import React from 'react';
import { Icon } from './Icons.jsx';

export function StatCard({ label, value, description, icon, trend, accentColor = 'blue' }) {
  const getGlow = () => {
    if (accentColor === 'cyan') return 'var(--shadow-glow-cyan)';
    if (accentColor === 'gold') return '0 0 20px -3px rgba(245, 158, 11, 0.25)';
    return 'var(--shadow-glow-blue)';
  };

  return (
    <div className="stat-card" style={{ '--accent-glow': getGlow() }}>
      <div className="stat-card-header">
        <span>{label}</span>
        {icon && <Icon name={icon} size={20} style={{ color: 'var(--color-slate-400)' }} />}
      </div>
      <div className="stat-card-value">
        {value}
      </div>
      {description && (
        <div className="stat-card-desc">
          {description}
        </div>
      )}
    </div>
  );
}
