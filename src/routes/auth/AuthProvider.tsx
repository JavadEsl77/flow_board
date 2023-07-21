import React from 'react';
import AuthContext from "./AuthContext";
import Token from '../../utils/storage/Token'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    let [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(Token.getInstance().getAccessToken() ? true : false);
    let login = ( callback: VoidFunction) => {
        setIsAuthenticated(true);
        callback();
    };
    let logout = (callback: VoidFunction) => {
        setIsAuthenticated(false);
        callback();
    };

    let value = { isAuthenticated, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;