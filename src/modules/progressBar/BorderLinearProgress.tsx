import React from 'react';
import {LinearProgress, linearProgressClasses, styled} from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : '#308fe8',
    },
}));

export default BorderLinearProgress;