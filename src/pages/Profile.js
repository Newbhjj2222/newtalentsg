import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Profile = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.card}>
      {username ? (
        <>
          <h2>Welcome, {username}</h2>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <button onClick={goToLogin} style={styles.loginButton}>Login</button>
        </>
      )}
    </div>
  );
};

const styles = {
  card: {
    margin: '80px auto',
    padding: '30px',
    width: '300px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  loginButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Profile;
