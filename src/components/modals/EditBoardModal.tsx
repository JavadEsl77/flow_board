import React, {useState} from 'react';
import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import {updateBoard} from "../../config/fetchData";

interface props {
    openModal: boolean,
    closeModal: () => void,
    onUpdateBoard: (done: boolean) => void,
    projectId: any
    boardName: string
    boardId: any
}

const EditBoardModal = ({boardName, boardId, projectId, openModal, closeModal, onUpdateBoard}: props) => {
    const [name, setName] = useState<string>(boardName)
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
        setName(event.target.value)
    }

    const requestUpdateBoard = async () => {
        setError("")
        setIsLoading(true)
        return await updateBoard(projectId,boardId, name, 9999, "active")
    }

    const handlerUpdateBoard = () => {
        if (name.trim() !== "") {
            requestUpdateBoard().then((response) => {
                if (response.status === 200) {
                    setIsLoading(false)
                    closeModal()
                    onUpdateBoard(true)
                }
            }).catch((error: any) => {
                setError(error)
                setIsLoading(false)
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
                        Edit Board Information
                    </Typography>

                    <TextField
                        label={"Board name"}
                        sx={{fontSize: ".8rem", marginTop: "1rem"}}
                        onChange={handlerChangeTitle}
                        value={name}
                        size="small"/>


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
                            }} variant="contained" onClick={handlerUpdateBoard}>Update Board</Button>
                            {isLoading && <CircularProgress size={20}/>}
                        </Box>
                    </Box>
                </Box>

            </Modal>
        </Box>
    );
};

export default EditBoardModal;