import React from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

export default React.createContext<AuthContextType>(null!);
