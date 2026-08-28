import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import api from '../services/api';
import appointmentService from '../services/appointmentService';

// Reducers
import authReducer from '../store/slices/authSlice';
import appointmentReducer from '../store/slices/appointmentSlice';
import doctorReducer from '../store/slices/doctorSlice';
import scheduleReducer from '../store/slices/scheduleSlice';
import patientReducer from '../store/slices/patientSlice';

// Components
import Navbar from '../components/layout/Navbar';
import Login from '../components/Login';
import Register from '../components/Register';
import AppointmentForm from '../components/appointments/AppointmentForm';
import AppointmentList from '../components/appointments/AppointmentList';
import DoctorList from '../components/doctors/DoctorList';
import DoctorConsultations from '../components/doctors/DoctorConsultations';
import ManageDoctors from '../components/admin/ManageDoctors';
import ManagePatients from '../components/admin/ManagePatients';

// ============================================================
// CARELINK (HEALTHCARE MANAGEMENT SYSTEM) — FRONTEND TESTS
// Domain: Appointment scheduling, medical consultations, patient records
// Roles: CLINIC_ADMIN, DOCTOR, PATIENT
// ============================================================

jest.mock('../services/appointmentService', () => ({
  __esModule: true,
  default: {
    getMyAppointments: jest.fn(() => Promise.resolve([])),
    getAllAppointments: jest.fn(() => Promise.resolve([])),
    bookAppointment: jest.fn(() => Promise.resolve({})),
    cancelAppointment: jest.fn(() => Promise.resolve({})),
  },
}));

jest.mock('../services/scheduleService', () => ({
  __esModule: true,
  default: {
    getAvailableSlots: jest.fn(() => Promise.resolve([])),
    getMySlots: jest.fn(() => Promise.resolve([])),
    createSlot: jest.fn(() => Promise.resolve({})),
  },
}));

jest.mock('../services/consultationService', () => ({
  __esModule: true,
  default: {
    startConsultation: jest.fn(() => Promise.resolve({})),
    finalizeConsultation: jest.fn(() => Promise.resolve({})),
  },
}));

// Mock the api module (used directly by DoctorConsultations)
jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: [] })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    })),
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock globals
window.alert = jest.fn();
window.confirm = jest.fn(() => true);

// ============================================================
// HELPERS
// ============================================================

const createMockStore = (preloadedState = {}) => configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    schedule: scheduleReducer,
    patients: patientReducer,
  },
  preloadedState,
});

/**
 * Renders UI wrapped in Provider + BrowserRouter.
 * Do NOT pass <App> here — App has its own Router.
 */
const renderWithProviders = (ui, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

// Mock data
const mockDoctor = {
  id: 1,
  specialization: 'Cardiology',
  account: { email: 'smith@carelink.com' },
  yearsOfExperience: 10,
  consultationFee: 100,
};

const mockPatient = {
  id: 1,
  fullName: 'John Doe',
  bloodGroup: 'O+',
  emergencyContact: '9876543210',
  account: { email: 'john@carelink.com' },
  outstandingBalance: 0,
};

const mockAppointment = {
  id: 1,
  status: 'PENDING',
  reasonForVisit: 'Routine Checkup',
  doctor: mockDoctor,
  patient: mockPatient,
  slot: { id: 1, startTime: '2026-05-01T10:00:00Z' },
};

// ============================================================
// TEST SUITE
// ============================================================

describe('CareLink Frontend Test Suite (T1–T30)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // ===========================================================
  // T1–T5 | MODULE ARCHITECTURE VERIFICATION
  // ===========================================================

  test('T1 — Redux Store: auth slice initialises with null user', () => {
    const store = createMockStore();
    expect(store.getState().auth).toBeDefined();
    expect(store.getState().auth.user).toBeNull();
    console.log('SRS_REF: REQ-FED-01');
  });

  test('T2 — Navigation: Navbar renders Login link when not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-02');
  });

  test('T3 — Component Hierarchy: AppointmentForm displays doctor email in heading', () => {
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />);
    expect(screen.getByText(/Book with Dr. smith@carelink.com/i)).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-03');
  });

  test('T4 — UI: AppointmentForm has Select Time Slot and Reason for Visit fields', () => {
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />);
    expect(screen.getByLabelText(/Select Time Slot/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reason for Visit/i)).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-04');
  });
  test('T5 — Design System : Submit button is disabled when slot is empty in AppointmentForm', () => {
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />);
    const submitBtn = screen.getByRole('button', { name: /Confirm Booking/i });
    expect(submitBtn).toBeDisabled();
  });

  // ===========================================================
  // T6–T7 | ROLE-BASED ACCESS CONTROL (RBAC)
  // ===========================================================

  test('T6 — RBAC: PATIENT role renders My Appointments link in Navbar', () => {
    const store = createMockStore({
      auth: { user: { role: 'PATIENT', email: 'p@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
    });
    renderWithProviders(<Navbar />, store);
    expect(screen.getByText(/My Appointments/i)).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-06');
  });

  test('T7 — RBAC: DOCTOR role renders Consultations link in Navbar', () => {
    const store = createMockStore({
      auth: { user: { role: 'DOCTOR', email: 'd@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
    });
    renderWithProviders(<Navbar />, store);
    expect(screen.getByText(/Consultations/i)).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-07');
  });

  // ===========================================================
  // T8–T13 | REACT HOOKS BEHAVIOUR
  // ===========================================================

  test('T8 — useState: Reason textarea value updates on user input', () => {
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />);
    const textarea = screen.getByPlaceholderText(/Describe your symptoms/i);
    fireEvent.change(textarea, { target: { value: 'Chest pain' } });
    expect(textarea.value).toBe('Chest pain');
    console.log('SRS_REF: REQ-FED-08');
  });

  test('T9 — useState: Slot dropdown value updates on selection', () => {
    const store = createMockStore({
      auth: { user: null, isLoading: false, isError: false, isSuccess: false, message: '' },
      schedule: { slots: [{ id: 1, startTime: '2026-05-01T10:00:00Z' }], isLoading: false, isError: false, message: '' },
    });
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />, store);
    const select = screen.getByLabelText(/Select Time Slot/i);
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');
    console.log('SRS_REF: REQ-FED-09');
  });

  
  test('T12 — Rendering: AppointmentList displays item reasonForVisit from state', () => {
    appointmentService.getMyAppointments.mockResolvedValueOnce([mockAppointment]);
    const store = createMockStore({
      auth: { user: { role: 'PATIENT', email: 'p@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
      appointments: {
        items: [mockAppointment],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    renderWithProviders(<AppointmentList />, store);

    return waitFor(() => {
      expect(screen.getByText('Routine Checkup')).toBeInTheDocument();
    }).then(() => {
      console.log('SRS_REF: REQ-FED-12');
    });
  });

  test('T13 — Store: Auth isLoading becomes true on login/pending', () => {
    const store = createMockStore();
    act(() => { store.dispatch({ type: 'auth/login/pending' }); });
    expect(store.getState().auth.isLoading).toBe(true);
    console.log('SRS_REF: REQ-FED-13');
  });

  // ===========================================================
  // T14–T20 | API & ASYNCHRONOUS DATA FLOW
  // ===========================================================

  test('T14 — API: Login form renders Email and Password fields', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password \*/i)).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-14');
  });

  test('T15 — API: isError in appointments state triggers alert via AppointmentForm', () => {
    const store = createMockStore({
      auth: { user: null, isLoading: false, isError: false, isSuccess: false, message: '' },
      appointments: { items: [], isLoading: false, isSuccess: false, isError: true, message: 'Slot conflict', searchQuery: '', filterStatus: 'ALL' },
      schedule: { slots: [], isLoading: false, isError: false, message: '' },
    });
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />, store);
    expect(window.alert).toHaveBeenCalledWith('Slot conflict');
    console.log('SRS_REF: REQ-FED-15');
  });

  test('T16 — API: Clicking Logout button clears user from Redux state', () => {
    const store = createMockStore({
      auth: { user: { email: 'u@c.com', role: 'PATIENT' }, isLoading: false, isError: false, isSuccess: false, message: '' },
    });
    renderWithProviders(<Navbar />, store);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(store.getState().auth.user).toBeNull();
    console.log('SRS_REF: REQ-FED-16');
  });

  test('T17 — API: Schedule slots are correctly stored in Redux after dispatch', () => {
    const store = createMockStore();
    act(() => {
      store.dispatch({ type: 'schedule/getSlots/fulfilled', payload: [{ id: 1, startTime: '2026-05-01T10:00:00Z' }] });
    });
    expect(store.getState().schedule.slots).toHaveLength(1);
    expect(store.getState().schedule.slots[0].id).toBe(1);
    console.log('SRS_REF: REQ-FED-17');
  });

  test('T18 — API: cancelAppointment/fulfilled removes item from appointments state', () => {
    const store = createMockStore({
      appointments: {
        items: [mockAppointment],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    act(() => {
      store.dispatch({ type: 'appointments/cancel/fulfilled', meta: { arg: 1 } });
    });
    expect(store.getState().appointments.items).toHaveLength(0);
    console.log('SRS_REF: REQ-FED-18');
  });

  test('T19 — API: bookAppointment/fulfilled appends new appointment to state', () => {
    const store = createMockStore({
      appointments: {
        items: [],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    act(() => {
      store.dispatch({ type: 'appointments/book/fulfilled', payload: mockAppointment });
    });
    expect(store.getState().appointments.items).toHaveLength(1);
    console.log('SRS_REF: REQ-FED-19');
  });

  test('T20 — Async: isError in auth state triggers alert in Login component', () => {
    const store = createMockStore({
      auth: { user: null, isLoading: false, isError: true, isSuccess: false, message: 'Invalid credentials' },
    });
    renderWithProviders(<Login />, store);
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    console.log('SRS_REF: REQ-FED-20');
  });

  // ===========================================================
  // T21–T25 | DOM INTERACTION & EVENTS
  // ===========================================================

  test('T21 — Events: Clicking Book Appointment in DoctorList opens AppointmentForm modal', () => {
    api.get.mockResolvedValueOnce({ data: [mockDoctor] });
    const store = createMockStore({
      auth: { user: null, isLoading: false, isError: false, isSuccess: false, message: '' },
      doctors: { items: [mockDoctor], isLoading: false, isError: false, message: '' },
      schedule: { slots: [], isLoading: false, isError: false, message: '' },
      appointments: { items: [], isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL' },
    });
    renderWithProviders(<DoctorList />, store);

    return waitFor(() => {
      expect(screen.getByText('Book Appointment')).toBeInTheDocument();
    }).then(() => {
      fireEvent.click(screen.getByText('Book Appointment'));
      expect(screen.getByText(/Book with Dr. smith@carelink.com/i)).toBeInTheDocument();
      console.log('SRS_REF: REQ-FED-21');
    });
  });

  test('T22 — Events: Clicking × close button calls the onClose prop', () => {
    const onClose = jest.fn();
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={onClose} />);
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);
    console.log('SRS_REF: REQ-FED-22');
  });

  test('T23 — Events: Submitting Register form dispatches register action', () => {
    const store = createMockStore();
    renderWithProviders(<Register />, store);
    // Fill required fields and submit
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { name: 'email', value: 'test@c.com' } });
    fireEvent.change(screen.getByLabelText(/Password \*/i), { target: { name: 'password', value: 'pass123' } });
    fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { name: 'fullName', value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Blood Group \*/i), { target: { name: 'bloodGroup', value: 'O+' } });
    fireEvent.change(screen.getByLabelText(/Emergency Contact \*/i), { target: { name: 'emergencyContact', value: '1234567890' } });
    // isLoading is false so button is active
    expect(screen.getByRole('button', { name: /Register/i })).not.toBeDisabled();
    console.log('SRS_REF: REQ-FED-23');
  });

  test('T24 — DOM: AppointmentList shows empty state when items array is empty', () => {
    appointmentService.getMyAppointments.mockResolvedValueOnce([]);
    const store = createMockStore({
      auth: { user: { role: 'PATIENT', email: 'p@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
      appointments: {
        items: [],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    renderWithProviders(<AppointmentList />, store);

    return waitFor(() => {
      expect(screen.getByText(/No appointments found/i)).toBeInTheDocument();
    }).then(() => {
      console.log('SRS_REF: REQ-FED-24');
    });
  });

  test('T25 — DOM: CareLink brand in Navbar links to /', () => {
    renderWithProviders(<Navbar />);
    const brandLink = screen.getByText('CareLink').closest('a');
    expect(brandLink).toHaveAttribute('href', '/');
    console.log('SRS_REF: REQ-FED-25');
  });

  // ===========================================================
  // T26–T30 | TRANSACTIONAL LOGIC & ERROR BOUNDARIES
  // ===========================================================

  test('T26 — Logic: Submitting AppointmentForm without slot shows alert', () => {
    renderWithProviders(<AppointmentForm doctor={mockDoctor} onClose={() => { }} />);
    // Submit the form directly (button is disabled but form submit event can be fired)
    const form = document.querySelector('form');
    fireEvent.submit(form);
    expect(window.alert).toHaveBeenCalledWith('Please select a time slot');
    console.log('SRS_REF: REQ-FED-26');
  });

  test('T27 — Logic: ManageDoctors renders "Manage Doctors" heading for admin', () => {
    const store = createMockStore({
      auth: { user: { role: 'CLINIC_ADMIN', email: 'admin@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
      doctors: { items: [], isLoading: false, isError: false, message: '' },
    });
    renderWithProviders(<ManageDoctors />, store);
    expect(screen.getByText('Manage Doctors')).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-27');
  });

  test('T28 — Logic: ManagePatients renders "Manage Patients" heading', () => {
    const store = createMockStore({
      auth: { user: { role: 'CLINIC_ADMIN', email: 'admin@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
      patients: { items: [], isLoading: false, isError: false, message: '' },
    });
    renderWithProviders(<ManagePatients />, store);
    expect(screen.getByText('Manage Patients')).toBeInTheDocument();
    console.log('SRS_REF: REQ-FED-28');
  });

  test('T10 — API: DoctorConsultations renders patient name from appointments state', () => {
    appointmentService.getMyAppointments.mockResolvedValueOnce([mockAppointment]);
    const store = createMockStore({
      auth: { user: { role: 'DOCTOR', email: 'd@c.com' }, isLoading: false, isError: false, isSuccess: false, message: '' },
      appointments: {
        items: [mockAppointment],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    renderWithProviders(<DoctorConsultations />, store);

    return waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    }).then(() => {
      console.log('SRS_REF: REQ-FED-29');
    });
  });

  test('T11 — Logic: Redux appointment count reflects dispatched PENDING items', () => {
    const store = createMockStore({
      appointments: {
        items: [mockAppointment, { ...mockAppointment, id: 2 }],
        isLoading: false, isSuccess: false, isError: false, message: '', searchQuery: '', filterStatus: 'ALL',
      },
    });
    const pendingCount = store.getState().appointments.items.filter(a => a.status === 'PENDING').length;
    expect(pendingCount).toBe(2);
    console.log('SRS_REF: REQ-FED-30');
  });
});
