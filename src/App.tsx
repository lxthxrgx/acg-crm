import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DataTable from './pages/Counterparty';
import './App.css';

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/counterparty">Контрагенти</Link>
            </li>
            <li>
              <Link to="/analytics">Аналітика</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counterparty" element={<DataTable />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
