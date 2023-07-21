import React from 'react';
import {createTheme} from "@mui/material";

export const lightTheme  = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#00B388', // Blue
        },
        secondary: {
            main: '#ffb633', // Green
            dark:'#e39e1d'
        },

    },
    typography: {
        fontFamily: ["Arboria-Book", "sans-serif"].join(","),
        fontSize: 14,
    },

});
