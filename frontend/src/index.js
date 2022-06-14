//@ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Manager from './manager/manager';
import Shop from './shop/shop'
import Header from './header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='Background'>
    <React.StrictMode>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="shop" element={<Shop/>} />
          <Route path="manager" element={<Manager/>} />
          <Route element={<Manager/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

reportWebVitals();
