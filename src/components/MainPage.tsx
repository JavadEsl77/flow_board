import React, {useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Lottie from "react-lottie";
import mainAnimation from "../assets/lotties/mainAnimation.json";
import MyButton from "../modules/buttons/MyButton";
import AboutUsItem from "../modules/items/AboutUsItem";
import LoginModal from "./modals/LoginModal";
import UseAuth from "../routes/auth/UseAuth";
import {useNavigate} from "react-router-dom";
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import logo from '../assets/img/flow_board_logo.png';

const MainPage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: mainAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const aboutUs = [
        {
            title: "scalability",
            description: "We have designed the system so that you can use it at any scale",
            icon: <AspectRatioOutlinedIcon/>
        },
        {
            title: "Assessment",
            description: "We have the possibility to evaluate and calculate the performance of our team",
            icon: <AssessmentOutlinedIcon/>
        },
        {
            title: "easy to use",
            description: "You can use us with any level of knowledge",
            icon: <AccessibilityNewOutlinedIcon/>
        }]
    const [loginModal, setLoginModal] = useState<boolean>(false)
    let auth = UseAuth();
    const navigate = useNavigate()
    const handlerDashboard = () => {

        auth.login(() => {
            navigate("/dashboard")
        })
    }

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "white"
        }}>
            <Box sx={{
                width: "100%",
                height: "5.5em",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "primary.main",
                padding: "0.5em 1.5em",
            }}>
                <img style={{height: "50%", alignSelf: "center"}}
                     src={logo}
                     alt={""}/>

                <Typography sx={{
                    alignSelf: "center",
                    marginLeft: "0.5em",
                    fontSize: "2em",
                    fontWeight: "bold",
                    color: "white"
                }}>FlowBoard</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                width: {xs: "100%", lg: "80%"},
                height: {xs: "unset", md: "60%"},
                padding: "2.5em",
                flexDirection: {xs: "column", sm: "row"}
            }}>

                <Box sx={{display: "flex", flexDirection: "column", flex: 2, justifyContent: "center", height: "100%"}}>
                    <Typography sx={{fontSize: "2.5rem", fontWeight: "bold"}}>
                        Task Management Service
                    </Typography>
                    <Typography sx={{fontSize: "1.2rem", marginTop: "0.5em"}}>
                        Assign tasks to staff members who have different set of skills, or are in different locations.
                        Schedule tasks so they are either done one after another
                    </Typography>

                    <MyButton onclick={() => {
                        auth.isAuthenticated ? handlerDashboard() : setLoginModal(true)
                    }} title={auth.isAuthenticated ? "My Dashboard" : "Get Started - It's Free"}
                              sx={{marginTop: "1em"}}/>
                </Box>

                <Box sx={{alignSelf: "center"}}>
                    <Lottie style={{marginRight: "0em"}}
                            options={defaultOptions}
                            height={280}
                            width={280}
                    />
                </Box>

            </Box>
            <Box sx={{
                width: "100%",
                padding: "2.5em",
                backgroundColor: "#f7fafb",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>

                <Typography sx={{width: "100%", textAlign: "center", fontSize: "1.5rem", marginBottom: "1em"}}>why
                    customers trust us?</Typography>

                <Box sx={{margin: {xs: "0 0em", sm: "0 7em", md: "0 7em", lg: "0 10em"},}}>
                    <Grid container direction={{xs: 'column', md: 'row'}} spacing={2}>
                        {aboutUs.map((items: any) => {
                            return <Grid item xs={4}>
                                <AboutUsItem itemValue={items}/>
                            </Grid>
                        })}

                    </Grid>
                </Box>


            </Box>
            {loginModal && (
                <LoginModal onClose={() => setLoginModal(false)}/>
            )}
        </Box>
    );
};

export default MainPage;