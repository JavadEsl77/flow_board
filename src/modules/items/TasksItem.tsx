import React from 'react';
import {Box, Fade, Typography} from "@mui/material";

interface propsT {
    item: any
}

const TasksItem = ({item}: propsT) => {

    return (
        <Fade in={true} timeout={700}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.5rem",
                padding: "1em",
                borderRadius: "0.8rem",
                backgroundColor: "white",
                alignItems: "top",
                ":hover": {
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 30px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                },
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                transition: "box-shadow 0.3s ease-in-out"
            }}>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        direction: "rtl",
                        textAlign: "end",
                        color: "grey.600"
                    }}>{item.name}</Typography>

                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: "grey.600",
                        direction: "rtl",
                        textAlign: "end",
                        display: '-webkit-box',
                        '-webkit-line-clamp': '3',
                        '-webkit-box-orient': 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{item.description}</Typography>

                <Typography
                    sx={{fontSize: "0.8rem", color: "grey.500", marginTop: "1.5rem"}}>{item.created_at}</Typography>
            </Box>
        </Fade>
    );
};

export default TasksItem;