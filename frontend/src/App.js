import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#0284c7', color: 'white', padding: '15px 20px', borderRadius: '8px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Hospital Appointment Management System</h1>
      </header>
      <main style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Dashboard Overview</h2>
          <p>Your React frontend and Redux store are successfully connected!</p>
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
          <p><strong>Auth Status:</strong> {auth?.user ? 'Logged In' : 'Not Logged In (Ready for Login Component)'}</p>
        </div>
      </main>
    </div>
  );
}

export default App;