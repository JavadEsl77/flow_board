import React, {useEffect, useState} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TasksItem from "./TasksItem";
import {getTasks} from "../../config/fetchData";


interface propsT {
    borderName:string
    projectId: any,
    bordId: number
}

const BordersItem = ({bordId,borderName, projectId}: propsT) => {

    const [taskList, setTaskList] = useState<any>(null)
    const [taskIsLoading, setTaskIsLoading] = useState<boolean>(false)
    const [taskError, setTaskError] = useState('')

    const requestGetTasks = async () => {
        setTaskError('')
        setTaskIsLoading(false)
        try {
            const response = await getTasks(projectId, bordId)
            if (response.status === 200) {
                setTaskList(response.data)
                setTaskIsLoading(false)
            }
        } catch (error: any) {
            setTaskError(error)
        }
    }

    useEffect(() => {
        requestGetTasks().then(() => {
        })
    }, [])

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
                <Typography
                    sx={{fontSize: "1rem", flex: 1, fontWeight: "bold", color: "grey.500"}}>{borderName}</Typography>
                <AddBoxRoundedIcon sx={{color: "primary.main"}}/>
            </Box>

            <Divider sx={{marginTop: "0.5em"}}/>

            {taskList && taskList.map((item: any) => {
                return <TasksItem item={item.name}/>
            })}

            {/*{taskList.length === 0 && (*/}
            {/*    <Typography>Empty</Typography>*/}
            {/*)}*/}

        </Box>
    );
};

export default BordersItem;