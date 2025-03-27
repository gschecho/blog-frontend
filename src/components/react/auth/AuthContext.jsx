import React,{createContext, useState, useEffect, useContext} from "react";
import authService from '../../services/authService';
import { set } from "astro:schema";

//Creamos el contexto en react sobre el estado de authenticacion
const AuthContext = createContext();
//Context permite 

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    /*
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    */
    useEffect(() => {
        try {
            const user = authService.getCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }    
        loadUser();
    }, []);
 
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, password);
            setCurrentUser(data.user);
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message || 'Error al iniciar sesión');
            setLoading(false);
            throw error;
        }
    }

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

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading,
        error,
        isAuthenticated: authService.isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);