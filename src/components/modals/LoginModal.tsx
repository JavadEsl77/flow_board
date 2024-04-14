import React, {useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Fade, Modal, TextField, Typography} from "@mui/material";
import UseAuth from "../../routes/auth/UseAuth";
import {useNavigate} from "react-router-dom";
import {login} from "../../config/fetchData";
import Backdrop from '@mui/material/Backdrop';
import logo from '../../assets/img/flow_board_logo.png'

interface propsT {
    onClose: () => void
    id?:string
}

const LoginModal = ({onClose , id}: propsT) => {
    const style = {
        width: {xs: "90%", md: "60%", lg: "40%"},
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "1em",
        bgcolor: 'background.paper',
        boxShadow: 10,
    }

    const developerImage: string = require('../../assets/img/developer.jpg');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    let auth = UseAuth();
    const navigate = useNavigate();


    const LoginRequest = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await login(userName, password);
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                auth.login(() => {
                    navigate("/dashboard")
                })
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

    }
    const handleLogin = () => {// توکن را از جای دیگر دریافت کنید
        LoginRequest()
    };
    const handlerChangeUserName = (event: any) => {
        setUserName(event.target.value)
    }

    const handlerChangePassword = (event: any) => {
        setPassword(event.target.value)
    }


    return (
        <div>
            <Modal
                id={id}
                open={true}
                onClose={onClose}
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 700,
                    },
                }}
            >
                <Fade in={true} timeout={700}>
                    <Box sx={style}>
                        <Box sx={{
                            display: "flex",
                            flexDirection:{xs:"column" , sm:"row"},
                            padding: ".8em",
                            width: "100%",
                            borderRadius: "1em",
                            backgroundColor: "#fefefe"
                        }}>

                            <Box sx={{
                                display:"flex",
                                flexDirection: "column",
                                backgroundColor: "primary.main",
                                padding: "1em",
                                alignItems: "center",
                                textAlign: "center",
                                justifyContent: "center",
                                borderRadius: "1em",
                                width: {xs:"100%" , sm:"40%"}
                            }}>

                                <img style={{height: "6rem"}}
                                     src={logo}
                                     alt={""}/>

                                <Typography sx={{fontSize:"1.2rem" , color:"white" , fontWeight:"bold"}}>Welcome Back</Typography>
                                <Typography sx={{fontSize:"0.75rem" , color:"white"}}>Sign in to Continue</Typography>

                            </Box>

                            <Box sx={{
                                width: {xs: "100%", sm: "60%"},
                                display: "flex",
                                flexDirection: "column",
                                padding: {xs:"1rem",sm:"2.5em"},
                            }}>

                                <Typography
                                    sx={{fontSize: {xs:"1.35rem",sm:"1.5em"}, fontWeight: 'bold', color: "black"}}>Login | Register</Typography>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: {xs:"1.75rem",sm:"2em"},
                                }}>
                                    <TextField size={"small"} sx={{ width: "100%"}} label="username" variant="outlined" type={"text"}
                                               value={userName} onChange={handlerChangeUserName}/>
                                    <TextField size={"small"} sx={{marginTop: "1.5em", width: "100%"}} label="password"
                                               variant="outlined"
                                               type={"password"} value={password} onChange={handlerChangePassword}/>

                                    {error && <Typography sx={{
                                        fontSize: "0.8em",
                                        color: "red",
                                        marginLeft: "0.5em",
                                        marginTop: "1.5em",
                                        fontWeight: "bold"
                                    }}>{'- ' + error}</Typography>}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: error ? "0.2em" : "1.5em",
                                        }}>
                                        <Button id={'login-register-button'} onClick={handleLogin} variant={"contained"} sx={{
                                            textTransform: "unset",
                                            fontSize: "0.75rem",
                                            width: "13em",
                                            padding: "0.5rem",
                                            color: "white",
                                            marginRight: "0.5em",
                                            backgroundColor: "primary.main",
                                            ":hover": {
                                                boxShadow: "rgba(0, 0, 0, 0.2) 0 8px 15px",
                                                backgroundColor: "primary.main",
                                            },
                                            boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                            transition: "box-shadow 0.3s ease-in-out",
                                            borderRadius: "0.5em"

                                        }}>Create account OR Login</Button>
                                        {isLoading && <CircularProgress size={20}/>}
                                    </Box>

                                </Box>

                            </Box>

                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default LoginModal;