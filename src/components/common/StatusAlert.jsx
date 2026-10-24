import React from 'react';
import { Icon } from './Icons.jsx';

export function StatusAlert({ type = 'info', title, message, children, className = '' }) {
  const iconMap = {
    info: 'info',
    warning: 'alert',
    danger: 'alert',
    success: 'check'
  };

  const role = type === 'danger' || type === 'warning' ? 'alert' : 'status';

  return (
    <div className={`alert-box alert-${type} ${className}`} role={role}>
      <Icon name={iconMap[type] || 'info'} size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 600, marginBottom: '2px' }}>{title}</div>}
        {message && <div>{message}</div>}
        {children}
      </div>
    </div>
  );
}
