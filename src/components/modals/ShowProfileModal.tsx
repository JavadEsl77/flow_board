import React, {useState} from 'react';
import {Box, CircularProgress, IconButton, Modal, Typography} from "@mui/material";
import moment from 'moment'
import Lottie from 'react-lottie';
import profileLottie from '../../assets/lotties/profile.json'
import {logout} from "../../config/fetchData";
import UseAuth from "../../routes/auth/UseAuth";
import {useNavigate} from "react-router-dom";

interface props {
    openModal: boolean,
    closeModal: () => void
    userInfo: any
}

const ShowProfileModal = ({openModal, closeModal, userInfo}: props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const style = {
        display: "flex",
        flexDirection: "row",
        position: 'absolute' as 'absolute',
        borderRadius: "1em",
        alignItems: "center",
        top: "0",
        right: "0",
        marginRight: "1em",
        marginTop: "4em",
        bgcolor: 'background.paper',
        boxShadow: 20,
        p: 4,
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: profileLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    let auth = UseAuth();
    const navigate = useNavigate();

    const logoutRequest = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await logout();
            if (response.status === 204) {
                localStorage.setItem('access_token', '')
                auth.logout(() => {
                    navigate('/login');
                })
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = () => {
        logoutRequest()
    };

    return (
        <div>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <Box sx={style}>

                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Lottie style={{margin: "-40px"}}
                                options={defaultOptions}
                                height={150}
                                width={150}
                        />
                        <IconButton sx={{
                            borderRadius: "2em",
                            padding: "0.2em 0.5em",
                            backgroundColor: "rgba(255,0,0,0.1)",
                            marginTop: "0.8em",
                            color: "#ff0000",
                            ':hover': {backgroundColor: "rgba(255,0,0,0.1)"}
                        }} onClick={handleLogout}>
                            {isLoading && (
                                <CircularProgress sx={{color: "#ff0000"}} size={20}/>
                            )}
                            {!isLoading && <Typography sx={{fontSize: "0.5em"}}>Log Out</Typography>}
                        </IconButton>
                    </Box>

                    <Box sx={{display: "flex", flexDirection: "column", marginLeft: "1.5em"}}>
                        <Box sx={{display: "flex"}}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                                <Typography sx={{fontSize: "0.9em", marginLeft: "0.5em"}}>username</Typography>
                                <Typography sx={{
                                    textAlign: "left",
                                    fontSize: "0.8em",
                                    color: "grey.500",
                                    borderRadius: "15px",
                                    padding: "0.2em 0.8em"
                                }}>{userInfo?.username}</Typography>
                            </Box>
                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "left", marginLeft: "1em"}}/>
                        </Box>
                        <Box sx={{display: "flex", marginTop: "1em"}}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                                <Typography sx={{fontSize: "0.9em", marginLeft: "0.5em"}}>Create at</Typography>
                                <Typography sx={{
                                    textAlign: "left",
                                    fontSize: "0.8em",
                                    color: "grey.500",
                                    borderRadius: "15px",
                                    padding: "0.2em 0.8em"
                                }}>{moment(userInfo?.created_at).format('YYYY-MM-DD')}</Typography>
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "left", marginLeft: "1em"}}>
                                <Typography sx={{fontSize: "0.9em", marginLeft: "0.5em"}}>Last Login</Typography>
                                <Typography sx={{
                                    textAlign: "left",
                                    fontSize: "0.8em",
                                    color: "grey.500",
                                    borderRadius: "15px",
                                    padding: "0.2em 0.8em"
                                }}>{moment(userInfo?.last_login).format('YYYY-MM-DD | h:mm')}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
};

export default ShowProfileModal;