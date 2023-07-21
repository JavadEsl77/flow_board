import React from 'react';
import AuthContext from './AuthContext'

const UseAuth = () => {
    return React.useContext(AuthContext);
};

export default UseAuth;
