import React, {useState} from 'react';
import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import {setBoard} from "../../config/fetchData";

interface props {
    openModal: boolean,
    closeModal: () => void,
    onAddBord: (done: boolean) => void,
    projectId: any
}

const AddBoardModal = ({openModal, closeModal, onAddBord, projectId}: props) => {
    const [title, setTitle] = useState<string>("")
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

    const handlerChangeTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const requestSetBord = async () => {
        setError("")
        setIsLoading(true)
        return await setBoard(projectId, title, 9999, "active")
    }

    const handlerCreateBord = () => {
        if (title.trim() !== "") {
            setError("")
            requestSetBord().then((response) => {
                if (response.status === 201) {
                    setIsLoading(false)
                    closeModal()
                    onAddBord(true)
                }
            }).catch((error: any) => {
                setError(error)
            })
        } else {
            setError("Enter title !")
        }
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
                        Add Board Information
                    </Typography>
                    <Typography sx={{marginTop: "0.2em", marginLeft: "0.5em", fontSize: "0.8rem", color: "grey.400"}}>
                        Completion of information Board ...
                    </Typography>


                    <Typography sx={{
                        marginTop: "2em",
                        marginLeft: "0.2em",
                        marginBottom: "0.1em",
                        fontSize: "1rem",
                        color: "grey.400"
                    }}>title</Typography>
                    <TextField sx={{fontSize: ".8rem"}} onChange={handlerChangeTitle} value={title} size="small"
                               placeholder={"Bord title"}/>


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
                            }} variant="contained" onClick={handlerCreateBord}>Create Board</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>
                    </Box>
                </Box>

            </Modal>
        </Box>
    );
};

export default AddBoardModal;