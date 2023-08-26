import React from 'react';
import { Button} from "@mui/material";

interface propsT {
    title: string
    myVariant?: 'contained' | 'outlined' | 'text';
    sx?: any
    onclick?:()=>void
}

const MyButton = ({sx,onclick, title,  myVariant = 'contained'}: propsT) => {
    const defaultStyles: React.CSSProperties = {
        textTransform: "unset",
        backgroundColor: "primary.main",
        color: 'white',
        width: "fit-content",
        borderRadius: "0.8rem",
        padding: '0.5em 0.8rem',
        fontSize: '1.1rem',
    };
    return (
        <Button
            onClick={onclick}
            variant={myVariant}
            sx={{
                ...defaultStyles,
                ...sx,
            }}>

            {title}
        </Button>
    );
};

export default MyButton;