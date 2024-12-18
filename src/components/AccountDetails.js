import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountDetails() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/users/${userData.id}`);
                setUser(data);
            } catch (err) {
                setError('Failed to load user data.');
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/users/${user.id}`, user);
            alert('Account updated successfully.');
        } catch (err) {
            setError('Failed to update account.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#f3f4f6' }}
        >
            <button
                className="btn btn-link bg-danger position-absolute top-0 end-0 mt-2 me-2"
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                }}
                onClick={handleLogout}
            >
                Logout
            </button>
            <div
                className="card p-4 shadow position-relative"
                style={{
                    width: '400px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                }}
            >
                <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Account Details</h2>
                {error && <div className="text-danger text-center mb-3">{error}</div>}
                {user ? (
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: '#34495e' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                                value={user.email}
                                readOnly
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
                                value={user.dateOfBirth || ''} // Ensure it's empty if no data
                                onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                                style={{
                                    borderColor: '#bdc3c7',
                                    boxShadow: 'none',
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn w-100"
                            style={{
                                backgroundColor: '#1abc9c',
                                borderColor: '#16a085',
                                color: '#fff',
                            }}
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </form>
                ) : (
                    <div className="text-center text-muted">Loading user data...</div>
                )}
            </div>
        </div>
    );
}

export default AccountDetails;
