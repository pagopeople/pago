import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Home from './pages/Home';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Career from './pages/Career';
import OtherDashboards from './pages/OtherDashboards';
import Pay from './pages/Pay';
import Performance from './pages/Performance';
import Goals from './pages/Goals';
import Navbar from './components/navbar';
import Reviews from './pages/Reviews';
import Account from './pages/Account';

const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />} >
      <Route index element={<Home />} />
      <Route path='/employee' element={<EmployeeDashboard />}  />
      <Route path="/pay"  element={<Pay />} />
      <Route path="/other" element={<OtherDashboards/>}  />
      <Route path="/career" element={<Career />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/account" element={<Account />} />
      <Route path="/logout" element={<div>Logout</div>} />
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
