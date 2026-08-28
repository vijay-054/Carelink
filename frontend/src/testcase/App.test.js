// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from '../App';

// test('renders dashboard header', () => {
//   render(<App />);
//   const headerElement = screen.getByText(/Hospital Appointment Management System/i);
//   expect(headerElement).toBeInTheDocument();
// });
// //

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

// Mock the appointment service relative to how src/testcase/App.test.js requires it
jest.mock('../services/appointmentService', () => ({
  __esModule: true,
  default: {
    getMyAppointments: jest.fn(() => Promise.resolve([])),
    bookAppointment: jest.fn(() => Promise.resolve({})),
    cancelAppointment: jest.fn(() => Promise.resolve({})),
    getAllAppointments: jest.fn(() => Promise.resolve([])),
  },
}));

test('renders dashboard header and handles service mock', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  const headerElement = screen.getByText(/Hospital Appointment Management System/i);
  expect(headerElement).toBeInTheDocument();
});