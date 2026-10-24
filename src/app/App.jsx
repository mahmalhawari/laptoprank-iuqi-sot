import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { Topbar } from '../components/layout/Topbar.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';
import { Catalog } from '../pages/Catalog.jsx';
import { CriteriaWeights } from '../pages/CriteriaWeights.jsx';
import { SawCalculation } from '../pages/SawCalculation.jsx';
import { Ranking } from '../pages/Ranking.jsx';
import { RecommendationDetail } from '../pages/RecommendationDetail.jsx';
import { MethodSaw } from '../pages/MethodSaw.jsx';
import { About } from '../pages/About.jsx';

import { MOCK_LAPTOPS } from '../data/mockData.js';
import { CRITERIA_DEFINITIONS, getDefaultWeights } from '../domain/criteria.js';
import { calculateSAW } from '../domain/scoring.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', textAlign: 'center', color: '#fff' }}>
          <h2>Terjadi kesalahan pada tampilan</h2>
          <p style={{ color: '#94A3B8', marginTop: '8px' }}>
            {this.state.error?.message || 'Gagal memuat komponen.'}
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '16px' }}
            onClick={() => window.location.reload()}
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedLaptopId, setSelectedLaptopId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [weights, setWeights] = useState(getDefaultWeights());

  // Shared SAW Calculation Output (Single Source of Truth)
  const sawResult = useMemo(() => {
    return calculateSAW(MOCK_LAPTOPS, weights, CRITERIA_DEFINITIONS);
  }, [weights]);

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    setSelectedLaptopId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLaptop = (laptopId) => {
    setSelectedLaptopId(laptopId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSelectedLaptop = () => {
    setSelectedLaptopId(null);
  };

  const handleResetWeights = () => {
    setWeights(getDefaultWeights());
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Topbar
          currentTab={currentTab}
          onOpenMenu={() => setIsSidebarOpen(true)}
          sawResult={sawResult}
          selectedLaptopId={selectedLaptopId}
          onClearSelectedLaptop={handleClearSelectedLaptop}
        />

        <main id="main-content" tabIndex="-1">
          <ErrorBoundary>
            {selectedLaptopId ? (
              <RecommendationDetail
                laptopId={selectedLaptopId}
                alternatives={MOCK_LAPTOPS}
                sawResult={sawResult}
                onBack={handleClearSelectedLaptop}
                onNavigate={handleSelectTab}
              />
            ) : currentTab === 'dashboard' ? (
              <Dashboard
                alternatives={MOCK_LAPTOPS}
                sawResult={sawResult}
                onNavigate={handleSelectTab}
                onSelectLaptop={handleSelectLaptop}
              />
            ) : currentTab === 'catalog' ? (
              <Catalog
                alternatives={MOCK_LAPTOPS}
                sawResult={sawResult}
                onSelectLaptop={handleSelectLaptop}
              />
            ) : currentTab === 'criteria' ? (
              <CriteriaWeights
                weights={weights}
                onWeightChange={setWeights}
                onResetWeights={handleResetWeights}
                onNavigate={handleSelectTab}
              />
            ) : currentTab === 'calculation' ? (
              <SawCalculation
                sawResult={sawResult}
                onNavigate={handleSelectTab}
              />
            ) : currentTab === 'ranking' ? (
              <Ranking
                sawResult={sawResult}
                onSelectLaptop={handleSelectLaptop}
                onNavigate={handleSelectTab}
              />
            ) : currentTab === 'method' ? (
              <MethodSaw
                onNavigate={handleSelectTab}
              />
            ) : currentTab === 'about' ? (
              <About />
            ) : (
              <Dashboard
                alternatives={MOCK_LAPTOPS}
                sawResult={sawResult}
                onNavigate={handleSelectTab}
                onSelectLaptop={handleSelectLaptop}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default App;
