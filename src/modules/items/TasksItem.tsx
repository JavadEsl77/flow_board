import React from 'react';
import {Box, Typography} from "@mui/material";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

interface propsT {
    item: any
}

const TasksItem = ({item}: propsT) => {
    return (
        <Box sx={{
            display: "flex",
            marginTop: "1em",
            padding: "1em",
            borderRadius: "0.8em",
            backgroundColor: "white",
            alignItems: "top",
            border: '1px solid #d6d6d6',
        }}>
            <ArticleRoundedIcon sx={{color: `rgba(94, 94, 94, 0.4)`}}/>
            <Typography
                sx={{fontWeight: "bold",
                    marginLeft: "0.5em",
                    fontSize: "1rem",
                    color: "grey.600"}}>{item}</Typography>
        </Box>
    );
};

export default TasksItem;