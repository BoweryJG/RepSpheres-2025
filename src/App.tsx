import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import CRM from './modules/crm/CRM';
import MarketInsights from './modules/marketInsights/MarketInsights';
import Analytics from './modules/analytics/Analytics';
import Workspace from './modules/workspace/Workspace';
import Linguistics from './modules/linguistics/Linguistics';
import Landing from './pages/Landing';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="crm/*" element={<CRM />} />
        <Route path="market-insights/*" element={<MarketInsights />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="workspace/*" element={<Workspace />} />
        <Route path="linguistics/*" element={<Linguistics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
