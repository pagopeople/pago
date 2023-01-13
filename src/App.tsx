import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  store  from './store';
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
import AppContainer from './components/AppContainer';
import Reviews from './pages/Reviews';
import Account from './pages/Account';
import Skills from './pages/Skills';
import Improvement from './pages/Improvement';
import Managers from './pages/Managers';

import './App.css';
import ReviewEdit from './pages/ReviewEdit';


const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppContainer />} >
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
      <Route path="/skills" element={<Skills />} />
      <Route path="/improvement" element={<Improvement />} />
      <Route path="/managers" element={<Managers />} />
      <Route path="/reviews/new" element={<ReviewEdit />} />
      <Route path="*" element={<div>404</div>} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
