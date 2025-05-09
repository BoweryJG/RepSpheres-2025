import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CRM from './modules/crm/CRM';
import MarketInsights from './modules/marketInsights/MarketInsights';
import Analytics from './modules/analytics/Analytics';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="crm/*" element={<CRM />} />
        <Route path="market-insights/*" element={<MarketInsights />} />
        <Route path="analytics/*" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
