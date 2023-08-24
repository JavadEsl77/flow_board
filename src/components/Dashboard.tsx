import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Divider, Fade, Grid, IconButton, InputBase, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ProjectsItem from "../modules/items/ProjectsItem";
import AddProjectModal from "./modals/AddProjectModal";
import {getProjects, searchProjects} from "../config/fetchData";
import bannerImage from '../assets/img/banner.jpg'
import addProject from "../assets/img/add_project.svg";
import notFound from "../assets/img/no_data.svg";
import AddIcon from "@mui/icons-material/Add";
import {NotificationToast} from "../modules/Notification/NotificationToast";


const Dashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [searchValue, setSearchValue] = useState<string>("");
    const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);
    const [showModalAddProject, setShowModalAddProject] = useState<boolean>(false)
    const [projectList, setProjectList] = useState<any>(null)
    const [searchEmptyChecking, setSearchEmptyChecking] = useState<boolean>(false)


    const handlerChangeSearchInput = (event: any) => {
        event.preventDefault();
        setSearchValue(event.target.value)
    }
    const handlerClearSearchInput = () => {
        setSearchValue("")
        setSearchEmptyChecking(false)
        handlerGetProjectList()
    }

    const requestSearch = async () => {
        setError('')
        setIsLoading(true)
        return await searchProjects(searchValue)
    }
    const handlerSearch = () => {
        requestSearch().then((response) => {
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setProjectList(response.data)
                    setSearchEmptyChecking(false)
                } else {
                    setSearchEmptyChecking(true)
                }
                setIsLoading(false)

            }
        }).catch((error) => {
            setError(error)
            setIsLoading(false)
        })
    }

    const requestGetProjectsList = async () => {
        setIsLoading(true);
        setError('');
        return await getProjects()
    }
    const handlerGetProjectList = () => {
        requestGetProjectsList().then((response) => {
            if (response.status == 200) {
                setProjectList(response.data)
                setIsLoading(false)
            }
        }).catch((error) => {
            setError(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        handlerGetProjectList()
    }, [])

    useEffect(() => {
        if (searchValue !== "") {
            setClearSearchIcon(true)
        } else {
            setClearSearchIcon(false)
        }
    }, [searchValue])

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{height: "400px", width: "100%", position: "relative"}}>

                <Box className={"gradient-overlay"} sx={{
                    height: "100%", width: "100%", position: "absolute", top: "0",
                    left: "0"
                }}/>

                <ToolBar toolbarTitle={"Dashboard"}/>

                <img style={{width: "100%", height: "100%", objectFit: "cover"}}
                     src={bannerImage}
                     alt={"banner"}/>

                <Box sx={{
                    display: "flex", flexDirection: "column", position: "absolute",
                    top: " 0",
                    width: "100%",
                    height: "100%",
                    padding: "0 1em",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <Typography sx={{
                        marginBottom: "1em",
                        color: "white",
                        fontSize: {xs: "1em", md: "1.5em"},
                        textAlign: "center"
                    }}>Next Step Notebook | Create Your Task</Typography>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: {xs: "80%", sm: "60%", md: "50%", lg: "40%"},
                        paddingRight: "0.2em",
                        paddingLeft: "1.5em",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "2em",
                    }}>
                        <InputBase sx={{
                            width: "100%",
                            height: "100%",
                            fontSize: "1rem",
                        }}
                                   onChange={handlerChangeSearchInput}
                                   value={searchValue}
                                   placeholder={"searching todo title"}
                                   size="small"></InputBase>

                        {clearSearchIcon && (
                            <Box sx={{display: "flex", height: "100%", alignItems: "center"}}>
                                <IconButton onClick={handlerClearSearchInput} sx={{color: "grey.400"}}>
                                    <ClearIcon/>
                                </IconButton>
                                <Divider sx={{
                                    width: "0.1em",
                                    height: "40%",
                                    backgroundColor: "grey.300",
                                    marginRight: "0.5em"
                                }}/>
                            </Box>
                        )}


                        <IconButton sx={{
                            backgroundColor: "primary.main",
                            marginTop: "0.1em",
                            marginBottom: "0.1em",
                            color: "white",
                            ":hover": {backgroundColor: "primary.main"}
                        }} onClick={() => handlerSearch()}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>


                </Box>

            </Box>

            <Box sx={{display: "flex", flexDirection: "column", padding: "1.5em"}}>

                {projectList && projectList.length > 0 && (
                    <Fade in={true} timeout={700}>
                        <Box>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <AccountTreeOutlinedIcon sx={{color: "secondary.main"}}/>
                                <Typography
                                    sx={{marginLeft: "0.5em", fontWeight: "bold", fontSize: "1rem"}}>YourProjects
                                    | {projectList && projectList.length} items</Typography>

                                <span style={{flex: 1}}/>

                                <Button variant={"contained"} startIcon={<AddIcon/>}
                                        sx={{
                                            alignSelf: "start",
                                            textTransform: "unset",
                                            color: "white",
                                            padding: "0.7rem 1rem",
                                            borderRadius: "0.7rem",
                                            width: "fit-content",
                                            ":hover": {
                                                boxShadow: "rgba(0, 0, 0, 0.2) 0 8px 15px",
                                                backgroundColor: "secondary.main"
                                            },
                                            boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                            transition: "box-shadow 0.3s ease-in-out",
                                            backgroundColor: "secondary.main"

                                        }}
                                        onClick={() => setShowModalAddProject(true)}>
                                    <Typography sx={{fontSize: "0.8rem"}}>New Project</Typography>
                                </Button>

                            </Box>
                            <Divider sx={{marginTop: "0.8em", marginBottom: "0.8em"}}/>
                        </Box>
                    </Fade>
                )}


                {!isLoading && projectList && (
                    <Grid container spacing={2}>
                        {projectList.map((item: any, index: number) => {
                            return <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <ProjectsItem itemValue={item}/>
                            </Grid>
                        })}
                    </Grid>
                )}

                {!isLoading && !searchEmptyChecking && projectList && projectList.length == 0 && (
                    <Fade in={true} timeout={700}>
                        <Box sx={{
                            width: "100%",
                            height: "60vh",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column"
                        }}>

                            <Box sx={{maxWidth: {xs: "130px", md: "200px"}}}>
                                <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={addProject}
                                     alt="empty Image"/>
                            </Box>
                            <Typography
                                sx={{marginTop: "1.5rem", color: "black", fontSize: {xs: "1rem", md: "1.2rem"}}}>No
                                project has been created yet</Typography>
                            <Typography sx={{
                                marginTop: ".5rem",
                                color: "grey.400",
                                fontSize: {xs: "0.875rem", md: "1rem"}
                            }}>looks
                                like you don`t have any Project in your account</Typography>
                            <Button variant={"contained"} startIcon={<AddIcon/>}
                                    onClick={() => setShowModalAddProject(true)}
                                    sx={{
                                        textTransform: "unset",
                                        color: "white",
                                        fontSize: "1rem",
                                        marginTop: {xs: "1.5rem", md: "2rem"},
                                        padding: "0.7rem 1rem",
                                        borderRadius: "0.7rem",
                                        backgroundColor: "secondary.main",
                                        width: "fit-content",
                                        ":hover": {
                                            boxShadow: "rgba(0, 0, 0, 0.2) 0 8px 15px",
                                            backgroundColor: "secondary.main"
                                        },
                                        boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                        transition: "box-shadow 0.3s ease-in-out"
                                    }}>
                                <Typography sx={{fontSize: "0.8rem"}}>New Project</Typography>
                            </Button>
                        </Box>
                    </Fade>
                )}

                {!isLoading && searchEmptyChecking && projectList && projectList.length == 0 && (
                    <Fade in={true} timeout={700}>
                        <Box sx={{
                            width: "100%",
                            height: "60vh",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column"
                        }}>

                            <Box sx={{maxWidth: {xs: "130px", md: "200px"}}}>
                                <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={notFound}
                                     alt="empty Image"/>
                            </Box>
                            <Typography
                                sx={{marginTop: "1.5rem", color: "black", fontSize: {xs: "1rem", md: "1.2rem"}}}>
                                Oops! No project found</Typography>
                        </Box>
                    </Fade>
                )}


                {isLoading && (
                    <Fade in={true} timeout={700}><Box
                        sx={{display: "flex", width: "100%", height: "50vh", justifyContent: "center"}}>
                        <Box sx={{
                            display: "flex",
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: "1em",
                            padding: "1.5em",
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
                            backdropFilter: "blur(4px)",
                            backgroundColor: "rgba(0,0,0,0.4)",
                        }}>

                            <CircularProgress disableShrink sx={{color: "#ffffff"}}/>

                        </Box>
                    </Box></Fade>
                )}

            </Box>


            {showModalAddProject && (
                <AddProjectModal openModal={showModalAddProject} closeModal={() => setShowModalAddProject(false)}
                                 onAddProject={(done) => {
                                     NotificationToast("The project was built","success")
                                     handlerGetProjectList()
                                 }}/>
            )}



        </Box>
    );
};

export default Dashboard;