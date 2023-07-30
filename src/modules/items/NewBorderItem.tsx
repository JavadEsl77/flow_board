import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import ControlPointDuplicateRoundedIcon from '@mui/icons-material/ControlPointDuplicateRounded';

const NewBorderItem = () => {
    return (
        <Box sx={{
            margin: 'auto',
            width: "100%",
            // marginRight: "0.5em",
            // marginTop: "1em",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            borderRadius: "0.8em"
        }}>

            <Box sx={{display: "flex", width: "100%"}}>
                <Typography sx={{fontSize: "1rem", flex: 1, fontWeight: "bold", color: "grey.500"}}>New</Typography>
            </Box>

            <Divider sx={{marginTop: "0.5em"}}/>


            <Box sx={{
                display: "flex",
                border: " 2px dashed #d6d6d6",
                height: "225px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                ":hover":{borderColor:"primary.main"}
            }}>
                <ControlPointDuplicateRoundedIcon sx={{fontSize: "70px", color: "grey.400",":hover":{color:"primary.main"}}}/>
            </Box>


        </Box>
    );
};

export default NewBorderItem;