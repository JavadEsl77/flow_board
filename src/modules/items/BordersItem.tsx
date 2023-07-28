import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TasksItem from "./TasksItem";


interface propsT {
    item: any
}

const BordersItem = ({item}: propsT) => {

    const tasks = ["manage finances", "fix instagram Content", "start the new marketing"]

    return (
        <Box sx={{
            margin: 'auto',
            width: "100%",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            borderRadius: "0.8em"
        }}>

            <Box sx={{display: "flex", width: "100%"}}>
                <Typography sx={{fontSize: "1rem", flex: 1, fontWeight: "bold", color: "grey.500"}}>{item}</Typography>
                <AddBoxRoundedIcon sx={{color:"primary.main"}}/>
            </Box>

            <Divider sx={{marginTop:"0.5em"}}/>

            {tasks.map((item:any)=>{
                return <TasksItem item={item}/>
            })}

        </Box>
    );
};

export default BordersItem;