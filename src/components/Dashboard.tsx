import React, {useState} from 'react';
import {Box, Divider, Grid, IconButton, InputBase, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ProjectsItem from "../modules/items/ProjectsItem";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddProjectModal from "./modals/AddProjectModal";

const Dashboard = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);
    const [showModalAddProject, setShowModalAddProject] = useState<boolean>(false)
    const handlerChange = (event: any) => {
        event.preventDefault();
        setSearchValue(event.target.value)
    }
    const handlerClearSearchInput = () => {
        setSearchValue("")
    }

    const projects = [
        {id: "11", title: "ArchTech", description: "small and concise headline", status: "active"},
        {id: "12", title: "Flower Shop", description: "small and concise headline", status: "deactive"},
        {id: "13", title: "Orixon", description: "small and concise headline", status: "deactive"},
        {id: "14", title: "Gamer Boy", description: "small and concise headline", status: "active"}]
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{height: "400px", width: "100%", position: "relative"}}>

                <Box className={"gradient-overlay"} sx={{
                    height: "100%", width: "100%", position: "absolute", top: "0",
                    left: "0"
                }}/>

                <ToolBar toolbarTitle={"Dashboard"}/>

                <img style={{width: "100%", height: "100%", objectFit: "cover"}}
                     src={"https://marketplace.canva.com/EAENvqzqoT0/1/0/1600w/canva-corporate-work-linkedin-banner-YjnYKO7wUkE.jpg"}
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
                            fontSize: ".8em"
                        }}
                                   onChange={handlerChange}
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
                        }} onClick={() => {
                        }}>
                            <SearchIcon/>
                        </IconButton>
                    </Box>


                </Box>

            </Box>

            <Box sx={{display: "flex", flexDirection: "column", padding: "1.5em"}}>

                <Box sx={{display: "flex"}}>
                    <AccountTreeOutlinedIcon sx={{color: "secondary.main"}}/>
                    <Typography
                        sx={{marginLeft: "0.5em", fontWeight: "bold", fontSize: "1rem"}}>YourProjects
                        | {projects.length} items</Typography>

                    <span style={{flex: 1}}/>

                    <IconButton sx={{
                        width: "40px",
                        height: "40px",
                        color: "white",
                        '&:hover': {
                            backgroundColor: 'secondary.dark'
                        },
                        backgroundColor: "secondary.main"
                    }}
                                onClick={() => setShowModalAddProject(true)}>
                        <AddOutlinedIcon/>
                    </IconButton>

                </Box>
                <Divider sx={{marginTop: "0.8em", marginBottom: "0.8em"}}/>

                <Grid container spacing={2}>
                    {projects.map((item: any, index: number) => {
                        return <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ProjectsItem itemValue={item}/>
                        </Grid>
                    })}

                </Grid>

            </Box>

            {showModalAddProject && (
                <AddProjectModal openModal={showModalAddProject} closeModal={() => setShowModalAddProject(false)}
                                 onAddProject={() => {
                                 }}/>
            )}

        </Box>
    );
};

export default Dashboard;