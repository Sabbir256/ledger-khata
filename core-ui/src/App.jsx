import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import { useState } from 'react';
import Layout from './components/Layout';
import Sellers from './pages/Sellers';
import Purchase from './pages/Purchase';
import Sale from './pages/Sale';
import Customers from './pages/Customers';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Layout /> : <Login setAuth={setIsLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sellers' element={<Sellers />}/>
          <Route path='/customers' element={<Customers />}/>
          <Route path='/sale' element={<Sale />} />
          <Route path='/purchase' element={<Purchase />} />
        </Route>
      </Routes>
    </div>
  );
}
