import React, {useState} from 'react';
import {Box, Button, CircularProgress, Modal, Typography} from "@mui/material";
import {deleteBoard} from "../../config/fetchData";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

interface props {
    openModal: boolean,
    closeModal: () => void,
    didUpdate: (done: boolean) => void
    boardId: any
    projectId: any
}

const DeleteTodoModal = ({openModal, closeModal, boardId, projectId, didUpdate}: props) => {

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
        p: 4,
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const requestDeleteBoard = async () => {
        setError('')
        setIsLoading(true)
        return await deleteBoard(projectId, boardId)
    }

    const handlerDeleteBoard = () => {
        requestDeleteBoard().then((response) => {
            if (response.status === 204) {
                setIsLoading(false)
                didUpdate(true)
                closeModal()
            }
        }).catch((error) => {
            setError(error)
        })
    }


    return (
        <div>
            <div>
                <Modal
                    open={openModal}
                    onClose={closeModal}
                >
                    <Box sx={style}>

                        <DeleteSweepIcon sx={{fontSize: "48px", color: "red"}}/>
                        <Typography sx={{marginTop: "0.5em", marginLeft: "0.5em", fontSize: "1em", fontWeight: "bold"}}>
                            Delete Board
                        </Typography>
                        <Typography
                            sx={{marginTop: "0.2em", marginLeft: "0.5em", fontSize: "0.8em", color: "grey.400"}}>
                            this action cannot be undone
                        </Typography>

                        {error && <Typography sx={{
                            fontSize: "0.8em",
                            color: "red",
                            marginLeft: "0.5em",
                            marginTop: "1.5em",
                            fontWeight: "bold"
                        }}>{'- ' + error}</Typography>}
                        <Box sx={{display: "flex", marginTop: error ? "0.2em" : "2em"}}>
                            <Button sx={{
                                fontSize: "0.8em",
                                backgroundColor: "grey.300",
                                boxShadow: 0,
                                '&:hover': {backgroundColor: 'grey.400', boxShadow: 0}
                            }} variant="contained" onClick={closeModal}> cancel</Button>

                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Button sx={{
                                    fontSize: "0.8em",
                                    backgroundColor: "red",
                                    marginLeft: "1em",
                                    color: "white",
                                    marginRight: "0.5em",
                                    boxShadow: 0,
                                    '&:hover': {
                                        boxShadow: 0
                                    }
                                }} variant="contained" onClick={() => handlerDeleteBoard()}>Delete</Button>
                                {isLoading && <CircularProgress size={20}/>}
                            </Box>

                        </Box>

                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default DeleteTodoModal;