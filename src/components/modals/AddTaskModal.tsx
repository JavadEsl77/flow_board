import React, {useState} from 'react';
import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import {setTask} from "../../config/fetchData";
import {franc} from "franc";


interface props {
    id?:string;
    openModal: boolean,
    closeModal: () => void,
    onAddTask: (done: boolean) => void,
    projectId: any
    boardId: any
}

const AddTaskModal = ({id,onAddTask, openModal, closeModal, projectId, boardId}: props) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        borderRadius: "1em",
        width: {xs: "90%", md: 500},
        bgcolor: 'background.paper',
        boxShadow: 10,
        p: 3,
    };

    let detectedLanguage = franc(description);

    const handlerChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handlerChangeDescription = (event: any) => {
        setDescription(event.target.value)
    }

    // const handleWorkLogChange = (event: any) => {
    //     const value = event.target.value;
    //     if (/^\d+[hm]$/.test(value)) {
    //         setWorkLog(value);
    //         setWorkLogError('')
    //     } else {
    //         setWorkLogError('Invalid input! Please use the format "5h" or "30m".')
    //     }
    // };

    const requestSetTask = async () => {
        setError('')
        setIsLoading(true)
        return await setTask(boardId, projectId, title, description, "", "active")
    }

    const handlerCreateTask = () => {
        if (title.trim() !== "" && description.trim() !== "") {
            requestSetTask().then((response) => {
                if (response.status === 201) {
                    setIsLoading(false)
                    onAddTask(true)
                    closeModal()
                }
            }).catch((error) => {
                setError(error)
                setIsLoading(false)
            })
        } else {
            setError('Complete all the required items !')
        }
    }


    return (
        <Box>
            <Modal
                id={id}
                open={openModal}
                onClose={closeModal}
            >
                <Box sx={style}>

                    <PlaylistAddCheckCircleRoundedIcon sx={{fontSize: "48px", color: "secondary.main"}}/>
                    <Typography sx={{marginTop: "0.5em", marginLeft: "0.5em", fontSize: "1rem", fontWeight: "bold"}}>
                        Add Task Information
                    </Typography>

                    <TextField
                        label={"Task title"}
                        sx={{
                            fontSize: ".8rem", marginTop: "1rem", direction: "rtl",
                            textAlignLast: "end",
                        }}
                        onChange={handlerChangeTitle}
                        value={title}
                        size="small"/>

                    <TextField sx={{
                        direction: detectedLanguage === "eng" ? "ltr":"rtl",
                        marginTop: "1rem", fontSize: ".8rem", maxLines: "3",
                        textAlignLast: "end",
                    }} rows={9} maxRows={9}
                               size="small"
                               label={" Description in three lines"} onChange={handlerChangeDescription}
                               multiline/>


                    {error && <Typography sx={{
                        fontSize: "0.8rem",
                        color: "red",
                        marginLeft: "0.5em",
                        marginTop: "1.5em",
                        fontWeight: "bold"
                    }}>{'- ' + error}</Typography>}

                    <Box sx={{display: "flex", marginTop: error ? "0.2em" : "2em"}}>
                        <Button sx={{
                            textTransform: "unset",
                            fontSize: "0.8rem",
                            backgroundColor: "grey.300",
                            boxShadow: 0,
                            '&:hover': {backgroundColor: 'grey.400', boxShadow: 0}
                        }} variant="contained" onClick={closeModal}> cancel</Button>

                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Button id={'modal-submit-add-task-button'} sx={{
                                textTransform: "unset",
                                fontSize: "0.8rem",
                                backgroundColor: "secondary.main",
                                marginLeft: "1em",
                                color: "white",
                                marginRight: "0.5em",
                                boxShadow: 0,
                                '&:hover': {
                                    boxShadow: 0
                                }
                            }} variant="contained" onClick={handlerCreateTask}>Create new task</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>
                    </Box>

                </Box>
            </Modal>

        </Box>
    );
};

export default AddTaskModal;