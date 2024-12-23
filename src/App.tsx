import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DataTable from './pages/Counterparty';
import './App.css';

import MemoryCachedData from './pages/MemoryCachedData';
import MemoryCachedSettings from './pages/MemoryCachaedSettings';
import Sublease from './pages/Sublease';

import AnalyticsPage from './pages/AnalyticsAccounting';
function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <Router>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Головна</Link>
          </li>
          <li>
            <Link to="/counterparty">Контрагенти</Link>
          </li>
          <li>
            <Link to="/analytics">Аналітика</Link>
          </li>
          {/* <li>
            <a href="#">Memory Cache</a>
            <ul>
              <li>
                <Link to="/MemoryCachedData">MemoryCachedData</Link>
              </li>
              <li>
                <Link to="/MemoryCachedSettings">MemoryCachedSettings</Link>
              </li>
            </ul>
          </li> */}
          <li>
            <Link to="/Sublease">Суборенда</Link>
          </li>
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counterparty" element={<DataTable />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/MemoryCachedData" element={<MemoryCachedData />} />
          <Route path="/MemoryCachedSettings" element={<MemoryCachedSettings />} />
          <Route path="/Sublease" element={<Sublease />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
