import React, { createContext, useState, useEffect, useContext } from "react";
import authService from '../../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            try {
                // Verificar si hay un token almacenado
                const token = localStorage.getItem('token');
                
                if (token) {
                    console.log("Token encontrado, usuario autenticado");
                    const user = authService.getCurrentUser();
                    setCurrentUser(user);
                    
                    // Si ya está autenticado, redirigir al usuario
                    if (window.location.pathname === '/auth/login') {
                        window.location.href = '/blog';
                    }
                } else {
                    console.log("No hay token, usuario no autenticado");
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Error verificando autenticación:", error);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
 
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            console.log("Intentando login con:", email);
            const data = await authService.login(email, password);
            console.log("Login exitoso:", data);
            setCurrentUser(data.user);
            setLoading(false);
            return data;
        } catch (err) {
            console.error("Error en login:", err);
            setError(err.message || 'Error al iniciar sesión');
            setLoading(false);
            throw err;
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.register(userData);
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message || 'Error al registrar usuario');
            setLoading(false);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

        // Verifica explícitamente si el usuario está autenticado
        const isAuthenticated = () => {
            return !!currentUser && !!localStorage.getItem('token');
        };

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading,
        error,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};