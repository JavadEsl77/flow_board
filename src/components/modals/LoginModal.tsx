import React, {useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import UseAuth from "../../routes/auth/UseAuth";
import {useNavigate} from "react-router-dom";
import {login} from "../../config/fetchData";

interface propsT {
    onClose: () => void
}

const LoginModal = ({onClose}: propsT) => {
    const style = {
        width: {xs: "90%", md:"60%" , lg:"50%"},
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
                open={true}
                onClose={onClose}
            >
                <Box sx={style}>

                    <Box sx={{
                        display: "flex",
                        padding: ".8em",
                        width: "100%",
                        borderRadius: "1em",
                        backgroundColor: "#fefefe"
                    }}>

                        <Box sx={{
                            display: {xs: "none", sm: "flex"},
                            flexDirection: "column",
                            backgroundColor: "primary.main",
                            padding: "1em",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: "1em",
                            width: "40%"
                        }}>

                            <Typography sx={{color: "rgba(255,255,255,0.8)", fontSize: ".8em"}}>Empower</Typography>

                            <img style={{height: "25%"}}
                                 src={"https://assets.ifttt.com/images/channels/1192573238/icons/monochrome_large.png"}
                                 alt={""}/>


                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                padding: "1em",
                                borderRadius: "1em",
                                backgroundColor: "rgba(0,0,0,0.3)"
                            }}>
                                <Typography sx={{color: "rgba(255,255,255,0.8)", fontSize: ".8em"}}>Empower your
                                    productivity
                                    journey by logging in to our FlowBoard platform and unleash the potential of
                                    efficient task
                                    management.</Typography>

                                <Box sx={{display: "flex", marginTop: "1em", alignItems: "center"}}>

                                    <Avatar sx={{width: "35px", height: "35px"}} src={developerImage}/>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "left",
                                        marginLeft: "0.5em"
                                    }}>
                                        <Typography sx={{color: "white", fontSize: "0.8em"}}>JavadEslamian</Typography>
                                        <Typography sx={{color: "white", fontSize: "0.6em"}}>developer</Typography>
                                    </Box>

                                </Box>
                            </Box>


                        </Box>

                        <Box sx={{
                            width: {xs: "100%", sm: "60%"},
                            display: "flex",
                            flexDirection: "column",
                            padding: "2.5em",
                        }}>

                            <Typography sx={{fontSize: "1.6em", fontWeight: 'bold', color: "black"}}>Login</Typography>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                                <Typography sx={{fontSize: "1rem", color: "black"}}>Don't have an account?</Typography>
                                <Typography sx={{
                                    fontSize: "1rem",
                                    fontWeight: 'bold',
                                    color: "primary.main",
                                }}>No problem, we will make it for you baby</Typography>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "3em",
                            }}>
                                <TextField sx={{width: "100%"}} label="username" variant="outlined" type={"text"}
                                           value={userName} onChange={handlerChangeUserName}/>
                                <TextField sx={{marginTop: "1.5em", width: "100%"}} label="password" variant="outlined"
                                           type={"password"} value={password} onChange={handlerChangePassword}/>

                                {error && <Typography sx={{
                                    fontSize: "0.8em",
                                    color: "red",
                                    marginLeft: "0.5em",
                                    marginTop: "1.5em",
                                    fontWeight: "bold"
                                }}>{'- ' + error}</Typography>}

                                <Box
                                    sx={{display: "flex", alignItems: "center", marginTop: error ? "0.2em" : "1.5em",}}>
                                    <Button onClick={handleLogin} variant={"contained"} sx={{
                                        textTransform: "unset",
                                        fontSize: "0.875rem",
                                        width: "13em",
                                        padding: "0.5rem",
                                        color: "white",
                                        marginRight: "0.5em",
                                        backgroundColor: "primary.main",
                                        borderRadius: "0.5em"

                                    }}>Create account</Button>
                                    {isLoading && <CircularProgress size={20}/>}
                                </Box>

                            </Box>

                        </Box>

                    </Box>
                </Box>

            </Modal>
        </div>
    );
};

export default LoginModal;