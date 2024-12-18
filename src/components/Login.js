import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]))
        navigate('/account');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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
        <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#34495e' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
          {error && <div className="text-danger text-center mt-2">{error}</div>}
        </form>
        <div className="text-center mt-3">
          <span style={{ color: '#7f8c8d' }}>Don't have an account? </span>
          <button
            className="btn btn-link p-0"
            style={{
              marginTop: '-2px',
              textDecoration: 'none',
              color: '#3498db',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
