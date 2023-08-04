import React, {useState} from 'react';
import {Box, Button, CircularProgress, Modal, Stack, TextField, Typography} from "@mui/material";
import MySwitch from "../../modules/switch/MySwitch";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import {updateProjectInfo} from "../../config/fetchData";

interface props {
    openModal: boolean,
    closeModal: () => void,
    onUpdateProject: () => void,
    projectInfo: any
}

const EditProjectModal = ({onUpdateProject, openModal, closeModal, projectInfo}: props) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState<string>(projectInfo.name)
    const [description, setDescription] = useState<string>(projectInfo.description)
    const [status, setStatus] = useState<string>(projectInfo.status)

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

    const handlerChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handlerChangeDescription = (event: any) => {
        setDescription(event.target.value)
    }

    const handlerChangeStatus = () => {
        if (status === 'active') {
            setStatus("deactive")
        } else {
            setStatus("active")
        }
    }


    const requestEditProject = async () => {
        setError('')
        setIsLoading(true)
        return await updateProjectInfo(projectInfo.id, title, description, status)
    }

    const handlerEditProject = () => {
        requestEditProject().then((response) => {
            if (response.status === 200){
                setIsLoading(false)
                onUpdateProject()
                closeModal()
            }
        }).catch((error) => {
            setIsLoading(false)
            setError(error)
        })
    }

    return (
        <Box>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <Box sx={style}>

                    <PlaylistAddCheckCircleRoundedIcon sx={{fontSize: "48px", color: "secondary.main"}}/>
                    <Typography sx={{marginTop: "0.5em", marginLeft: "0.5em", fontSize: "1rem", fontWeight: "bold"}}>
                        Edit Project Information
                    </Typography>
                    <Typography sx={{marginTop: "0.2em", marginLeft: "0.5em", fontSize: "0.8rem", color: "grey.400"}}>
                        Completion of information Project ...
                    </Typography>


                    <TextField sx={{fontSize: ".8rem", marginTop: "1rem"}} onChange={handlerChangeTitle} value={title}
                               size="small"
                               label={"Project title"}/>

                    <TextField sx={{fontSize: ".8rem", maxLines: "3", marginTop: "1rem"}} value={description} rows={3}
                               maxRows={3} size="small"
                               label={" Preferably in three lines"} onChange={handlerChangeDescription}
                               multiline/>


                    <Typography sx={{
                        marginTop: "0.5em",
                        marginLeft: "0.5em",
                        marginBottom: "0.1em",
                        fontSize: "1rem",
                        color: "grey.400"
                    }}>Status</Typography>
                    <Stack sx={{marginLeft: "0.5em",}} direction="row" spacing={1} alignItems="center">
                        <Typography>Inactive</Typography>
                        <MySwitch onChange={handlerChangeStatus} defaultChecked={projectInfo.status === "active"}/>
                        <Typography>Active</Typography>
                    </Stack>


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
                            <Button sx={{
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
                            }} variant="contained" onClick={handlerEditProject}>Edit</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>

                    </Box>


                </Box>
            </Modal>

        </Box>
    );
};

export default EditProjectModal;