import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemeDashboard from './pages/MemeDashboard';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800">
        <Routes>
          <Route path="/" element={<MemeDashboard />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;