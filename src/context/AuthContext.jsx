import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.user) {
                setUser({ 
                    id: payload.user._id, 
                    name: payload.user.name, 
                    email: payload.user.email 
                });
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('token');
        }
    }

    setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ 
            id: payload.user._id,
            name: payload.user.name, 
            email: payload.user.email 
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
    </AuthContext.Provider>
    );
}
