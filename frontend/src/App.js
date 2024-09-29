import './App.css';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import Category from './components/Admin/CategoryManagement/Category';
import Dashboard from './components/Admin/DashBoard/Dashboard';
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import FoodOrder from './components/FoodOrder/FoodOrder'; // Import your new component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './cartContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home/*" element={<Main />} /> {/* Add trailing * */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
