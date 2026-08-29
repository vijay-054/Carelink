import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#0284c7', color: 'white', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Hospital Appointment Management System</h1>
      </header>
      <main>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Application Dashboard</h2>
          <p>Frontend and Redux store are active and successfully compiled.</p>
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
          <p><strong>Auth State:</strong> {auth?.user ? 'Active Session' : 'Guest User'}</p>
        </div>
      </main>
    </div>
  );
}

export default App;