import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '', // Added dateOfBirth field
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f3f4f6' }} // Soft gray background
    >
      <div
        className="card p-4 shadow"
        style={{
          width: '400px',
          borderRadius: '10px',
          backgroundColor: '#ffffff', // White card background
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ color: '#34495e' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                borderColor: '#bdc3c7',
                boxShadow: 'none',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#34495e' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                borderColor: '#bdc3c7',
                boxShadow: 'none',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#34495e' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                borderColor: '#bdc3c7',
                boxShadow: 'none',
              }}
            />
          </div>
          {/* Date of Birth Field */}
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label" style={{ color: '#34495e' }}>
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="form-control"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              style={{
                borderColor: '#bdc3c7',
                boxShadow: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#1abc9c',
              borderColor: '#16a085',
              color: '#fff',
            }}
          >
            Register
          </button>
          {error && <div className="text-danger text-center mt-2">{error}</div>}
        </form>
        <div className="text-center mt-3">
          <span style={{ color: '#7f8c8d' }}>Already have an account? </span>
          <button
            className="btn btn-link p-0"
            style={{
              marginTop: '-2px',
              textDecoration: 'none',
              color: '#3498db',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
