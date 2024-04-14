import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import {setProject} from "../../config/fetchData";

interface props {
    id?:string;
    openModal: boolean,
    closeModal: () => void,
    onAddProject: (done: boolean) => void,
}

const AddProjectModal = ({id,openModal, closeModal, onAddProject}: props) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    useEffect(() => {
        setTitle("")
        setDescription("")
        setError("")
    }, [closeModal])

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

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlerChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }
    const handlerChangeDescription = (event: any) => {
        setDescription(event.target.value)
    }


    const requestSetProject = async () => {
        setError('')
        setIsLoading(true)
        try {
            const response = await setProject(title, description, "active")
            if (response.status === 201){
                setIsLoading(false)
                closeModal()
                onAddProject(true)
            }
        } catch (error: any) {
            setIsLoading(false)
            setError(error)
        }
    }

    const handlerCreateProject = () => {
        if (title.trim() !== "" && description.trim() !== "") {
            setError("")
            requestSetProject().then(()=>{})
        } else {
            setError("Enter a title and description !")
        }
    }

    return (
        <div>
            <Modal
                id={id}
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



                    <TextField sx={{fontSize: ".8rem" , marginTop:"1rem"}} onChange={handlerChangeTitle} value={title} size="small"
                               label={"Project title"}/>

                    <TextField sx={{fontSize: ".8rem", maxLines: "3" , marginTop:"1rem"}} rows={3} maxRows={3} size="small"
                               label={" Preferably in three lines"} onChange={handlerChangeDescription}
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
                            <Button id={'modal-submit-create-project-button'} sx={{
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
                            }} variant="contained" onClick={handlerCreateProject}>Create new project</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>

                    </Box>

                </Box>
            </Modal>
        </div>
    );
};

export default AddProjectModal;