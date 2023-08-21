import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Divider, IconButton, Typography} from "@mui/material";
import {getUserInfo} from "../../config/fetchData";
import ShowProfileModal from "../../components/modals/ShowProfileModal";
import {useNavigate} from "react-router-dom";

interface propsT {
    toolbarTitle: string
}

const ToolBar = ({toolbarTitle}: propsT) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null)

    const navigate = useNavigate()

    const [showProfileModal, setShowProfileModal] = useState<boolean>(false)

    const getUserInfoRequest = () => {
        const getData = async () => {
            setIsUserLoading(true)
            setError('');
            try {
                const response = await getUserInfo();
                if (response.status === 200) {
                    setUserInfo(response.data)
                }

            } catch (error: any) {
                setError(error)
            } finally {
                setIsUserLoading(false)
            }
        }
        getData()
    }

    const handlerLoadProfile = () => {
        setShowProfileModal(true)
    }

    useEffect(() => {
        getUserInfoRequest()
    }, [])

    const handlerRedirectDashboard = () => {
        navigate(`/dashboard`)
    }

    return (
        <div>
            <Box sx={{
                alignItems: "center",
                padding: {xs: "0em 1em", md: "0em 2em"},
                display: "flex",
                top: "0",
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0,0,0,0.06)",
                height: "5.5em",
                width: "100%",
                zIndex: "1",
                justifyContent: "space-between",
                position: "absolute"
            }}>

                <Box sx={{display: "flex", height: "100%"}}>
                    <Box sx={{height: {xs: "50%", sm: "70%", alignSelf: "center"}}}>
                        <img style={{height: "100%"}}
                             src={"https://assets.ifttt.com/images/channels/1192573238/icons/monochrome_large.png"}
                             alt={""}/>
                    </Box>


                    <Box sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                            marginLeft: "1em",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}>

                        <Typography
                            sx={{
                                alignSelf: "center",
                                fontSize: {xs: "1.2rem", sm: "2rem"},
                                fontWeight: "bold",
                                color: "white",
                                cursor: "pointer",
                            }} onClick={handlerRedirectDashboard}>FlowBoard </Typography>

                        <Divider sx={{
                            height: "0.1em",
                            width: "4em",
                            backgroundColor: "white",
                            display: {xs: "flex", sm: "none"}
                        }} variant={"middle"}/>
                        <Divider orientation={"vertical"} sx={{
                            height: "40%",
                            marginLeft: "0.5em",
                            width: "0.2em",
                            display: {xs: "none", sm: "flex"},
                            backgroundColor: "white"
                        }} variant={"middle"}/>

                        <Typography sx={{
                            alignSelf: "center",
                            marginLeft: {xs: "unset", sm: "0.5em"},
                            fontSize: {xs: "0.8rem", sm: "1rem"},
                            fontWeight: {xs: "unset", sm: "bold"},
                            color: "white"
                        }}> {toolbarTitle}</Typography>
                    </Box>


                </Box>

                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                    <Typography sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: {xs: "0.8rem", md: "1rem"},
                        marginBottom: "0.5em"
                    }}>Welcome Back</Typography>

                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <IconButton
                            sx={{
                                borderRadius: "2em",
                                backgroundColor: "rgba(255,255,255,0.6)",
                                padding: {xs: "0.1em 0.5em", sm: ".2em 1em"}
                            }}
                            onClick={handlerLoadProfile}>
                            {isUserLoading && (
                                <CircularProgress size={20}/>
                            )}

                            {!isUserLoading && (
                                <Typography
                                    sx={{fontSize: "0.5em"}}>{!isUserLoading && userInfo !== null ? userInfo.username : ''}</Typography>
                            )}

                        </IconButton>
                        {isLoading && <CircularProgress size={20}/>}
                    </Box>
                </Box>


            </Box>

            <ShowProfileModal userInfo={userInfo} openModal={showProfileModal} closeModal={() => {
                setShowProfileModal(false)
            }}/>
        </div>
    );
};

export default ToolBar;