import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Modal, SnackbarOrigin, TextField, Typography} from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

interface props {
    openModal: boolean,
    closeModal: () => void,
    onAddProject: (done:boolean) => void,
}

const AddProjectModal = ({openModal, closeModal, onAddProject}: props) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    useEffect(()=>{
        setTitle("")
        setDescription("")
        setError("")
    },[closeModal])

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        borderRadius: "1em",
        width: {xs:"90%",md:500},
        bgcolor: 'background.paper',
        boxShadow: 10,
        p: 3,
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlerChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }
    const handlerChangeDescription = (event: any) => {
        setDescription(event.target.value)
    }


    const handlerCreateProject = (newState: SnackbarOrigin) => {
        if (title !== "" && description !== "") {
            setError("")
        } else {
            setError("Enter a title and description !")
        }
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <Box sx={style}>
                    <PlaylistAddCheckCircleRoundedIcon sx={{fontSize: "48px", color: "secondary.main"}}/>
                    <Typography sx={{marginTop: "0.5em", marginLeft: "0.5em", fontSize: "1rem", fontWeight: "bold"}}>
                        Add Project Information
                    </Typography>
                    <Typography sx={{marginTop: "0.2em", marginLeft: "0.5em", fontSize: "0.8rem", color: "grey.400"}}>
                        Completion of information Project ...
                    </Typography>


                    <Typography sx={{
                        marginTop: "2em",
                        marginLeft: "0.2em",
                        marginBottom: "0.1em",
                        fontSize: "1rem",
                        color: "grey.400"
                    }}>title</Typography>
                    <TextField sx={{fontSize: ".8rem"}} onChange={handlerChangeTitle} value={title} size="small"
                               placeholder={"Project title"}/>

                    <Typography sx={{
                        marginTop: "1em",
                        marginLeft: "0.2em",
                        marginBottom: "0.1em",
                        fontSize: "1rem",
                        color: "grey.400"
                    }}>description</Typography>
                    <TextField sx={{fontSize: ".8rem", maxLines: "3"}} rows={3} maxRows={3} size="small"
                               placeholder={" Preferably in three lines"} onChange={handlerChangeDescription}
                               multiline/>

                    {error && <Typography sx={{fontSize:"0.8rem" , color:"red" ,marginLeft:"0.5em",marginTop: "1.5em", fontWeight:"bold" }}>{'- '+ error}</Typography>}
                    <Box sx={{display: "flex", marginTop: error ? "0.2em" :"2em"}}>
                        <Button sx={{
                            textTransform: "unset",
                            fontSize: "0.8rem",
                            backgroundColor: "grey.300",
                            boxShadow: 0,
                            '&:hover': {backgroundColor: 'grey.400', boxShadow: 0}
                        }} variant="contained" onClick={closeModal}> cancel</Button>

                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Button sx={{
                                textTransform: "unset",
                                fontSize: "0.8rem",
                                backgroundColor: "secondary.main",
                                marginLeft: "1em",
                                color:"white",
                                marginRight: "0.5em",
                                boxShadow: 0,
                                '&:hover': {
                                    boxShadow: 0
                                }
                            }} variant="contained" onClick={()=>onAddProject}>Create</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>

                    </Box>

                </Box>
            </Modal>
        </div>
    );
};

export default AddProjectModal;