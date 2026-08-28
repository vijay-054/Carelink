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

test('renders dashboard header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByText(/Hospital Appointment Management System/i);
  expect(headerElement).toBeInTheDocument();
});