import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import authReducer from './store/slices/authSlice';
import appointmentReducer from './store/slices/appointmentSlice';
import doctorReducer from './store/slices/doctorSlice';
import scheduleReducer from './store/slices/scheduleSlice';
import patientReducer from './store/slices/patientSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);