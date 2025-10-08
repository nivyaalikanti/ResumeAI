// src/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Load user from local storage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setCurrentUser({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                });
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem('currentUser');
            }
        }
        setIsAuthReady(true);
    }, []);

    // Function to log the user out
    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    // Function to log the user in
    const login = (user) => {
        const userToStore = {
            id: user.id,
            name: user.name,
            email: user.email,
        }; 
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        setCurrentUser(userToStore);
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout, isAuthReady }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext easily
export const useUser = () => {
    return useContext(UserContext);
};