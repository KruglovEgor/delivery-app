import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import OrderDetail from './components/OrderDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <h1>Delivery App</h1>
            <ul className="nav-links">
              <li><Link to="/">Список заказов</Link></li>
              <li><Link to="/create">Создать заказ</Link></li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/create" element={<CreateOrder />} />
            <Route path="/order/:id" element={<OrderDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 