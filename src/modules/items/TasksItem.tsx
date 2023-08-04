import React from 'react';
import {Box, Typography} from "@mui/material";

interface propsT {
    item: any
}

const TasksItem = ({item}: propsT) => {

    return (
        <Box sx={{
            display: "flex",
            flexDirection:"column",
            marginTop: "0.5rem",
            padding: "1em",
            borderRadius: "0.8rem",
            backgroundColor: "white",
            alignItems: "top",
            border: '1px solid #d6d6d6',
        }}>
            <Typography
                sx={{fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "grey.600"}}>{item.name}</Typography>

            <Typography
                sx={{
                    fontSize: "0.8rem",
                    color: "grey.600"}}>{item.description}</Typography>


            <Typography sx={{fontSize:"0.8rem", color: "grey.500" , marginTop:"1.5rem"}}>{item.created_at}</Typography>
        </Box>
    );
};

export default TasksItem;