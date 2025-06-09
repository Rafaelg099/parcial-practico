import React, { useState } from 'react';
import api from '../../services/api';
import './auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="auth-card">
      <h2>Registro</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
