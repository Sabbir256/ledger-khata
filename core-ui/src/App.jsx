import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import { useState } from 'react';
import Layout from './components/Layout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Layout /> : <Login setAuth={setIsLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}
