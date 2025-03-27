import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Dirección de email inválida';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate form input
    if (!validateForm()) {
      return;
    }
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess('Registro exitoso! Serás redirigido al inicio de sesión...');
      
      // Reset form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
      
    } catch (err) {
      // Handle different error scenarios
      if (err.message === 'EMAIL_EXISTS') {
        setError('Este email ya está registrado. Por favor, utiliza otro o inicia sesión.');
      } else {
        setError(err.message || 'Error al registrar usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear una cuenta</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? 'border-red-500' : ''
            }`}
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
        </div>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </span>
            ) : 'Registrarse'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">
              Inicia sesión
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <a href="/terms" className="text-blue-500 hover:underline">
              Términos de servicio
            </a>{' '}
            y{' '}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Política de privacidad
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;