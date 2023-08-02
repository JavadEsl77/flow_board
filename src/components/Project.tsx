import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import BordersItem from "../modules/items/BordersItem";
import NewBorderItem from "../modules/items/NewBorderItem";
import {getBorders, getProjectInfo} from "../config/fetchData";
import AddIcon from '@mui/icons-material/Add';
import AddBoardModal from "./modals/AddBoardModal";


const Project = () => {
    const {projectId} = useParams();
    const getRandomColor = () => {
        const randomR = Math.floor(Math.random() * 50) + 180;
        const randomG = Math.floor(Math.random() * 50) + 80;
        const randomB = Math.floor(Math.random() * 200) + 100;
        return `rgba(${randomR}, ${randomG}, ${randomB},0.4)`;
    };

    const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
    const [infoError, setInfoError] = useState('');
    const [projectInfo, setProjectInfo] = useState<any>(null)

    const [isBorderLoading, setIsBorderLoading] = useState<boolean>(false);
    const [boardError, setBoardError] = useState('');
    const [boardList, setBoardList] = useState<any[]>([])

    const [showAddNewBoardModal, setShowAddNewBoardModal] = useState<boolean>(false)

    const requestGetProjectInfo = async () => {
        setInfoError('')
        setIsInfoLoading(true)
        try {
            const response = await getProjectInfo(projectId)
            if (response.status === 200) {
                setProjectInfo(response.data)
                setIsInfoLoading(false)
            }
        } catch (error: any) {
            setInfoError(error)
        }

    }

    const requestGetBoard = async () => {
        setIsBorderLoading(true)
        setBoardError('')
        return await getBorders(projectId);
    }

    const handlerGetBoard = () => {
        requestGetBoard().then((response) => {
            if (response.status === 200) {
                setBoardList(response.data)
                setIsBorderLoading(false)
            }
        }).catch((error) => {
            setBoardError(error)
        })
    }
    useEffect(() => {
        handlerGetBoard()
    }, [projectInfo])

    useEffect(() => {
        requestGetProjectInfo().then(() => {
        })
    }, [projectId])

    const handlerAddNewBoard = () => {
        setShowAddNewBoardModal(!showAddNewBoardModal)
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{width: "100%", position: "relative", paddingBottom: "1.5em"}}>

                <img style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute"}}
                     src={"https://marketplace.canva.com/EAENvqzqoT0/1/0/1600w/canva-corporate-work-linkedin-banner-YjnYKO7wUkE.jpg"}
                     alt={"banner"}/>
                <Box sx={{
                    background: `linear-gradient(45deg, ${getRandomColor()} 50%, ${getRandomColor()} 90%)`,
                    height: "100%", width: "100%", position: "absolute", top: "0",
                    left: "0"
                }}/>

                <ToolBar toolbarTitle={"Project"}/>

                <Box sx={{
                    display: "flex",
                    marginTop: "6.6em",
                    width: {xs: "95%", md: "97%"},
                    marginRight: "auto",
                    marginLeft: "auto",
                    borderRadius: "0.8em",
                    padding: "1.5em",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(0,0,0,0.09)",
                    flexDirection: {xs: "column", sm: "row"}
                }}>
                    <Box sx={{display: "flex", alignItems: "top", flex: {xs: 1, md: 1.5, lg: 2}}}>
                        <Box sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: "rgba(122,122,122,0.39)",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}><p> {projectInfo && projectInfo.name.charAt(0)}</p></Box>
                        <Box sx={{display: "flex", flexDirection: "column", marginLeft: "0.8em", flex: 1}}>
                            <Typography sx={{
                                fontSize: "1.5rem",
                                color: "rgba(255,255,255,0.8)",
                                fontWeight: "bold"
                            }}>{projectInfo && projectInfo.name}</Typography>
                            <Typography sx={{
                                fontSize: "1rem",
                                width: "80%",
                                color: "rgba(255,255,255,0.6)",
                            }}>{projectInfo && projectInfo.description}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{display: "flex", flex: 1, flexDirection: "column", marginTop: {xs: "3em", md: "unset"}}}>

                        <Box sx={{display: "flex", alignItems: "center", marginBottom: "1em"}}>
                            <AccessTimeIcon sx={{color: "rgba(255,255,255,0.5)"}}/>
                            <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                <Typography sx={{
                                    flex: 0.5,
                                    fontSize: "1rem",
                                    color: "rgb(255,255,255)",
                                }}>Created at</Typography>
                                <Typography sx={{
                                    flex: 1,
                                    fontSize: "0.9rem",
                                    color: "rgba(255,255,255,0.5)",
                                }}>{projectInfo && projectInfo.created_at}</Typography>

                            </Box>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", marginBottom: "1em"}}>
                            <TroubleshootOutlinedIcon sx={{color: "rgba(255,255,255,0.5)"}}/>
                            <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                <Typography sx={{
                                    flex: 0.5,
                                    fontSize: "1rem",
                                    color: "rgb(255,255,255)",
                                }}>status</Typography>
                                <Typography sx={{
                                    flex: 1,
                                    fontSize: "0.9rem",
                                    color: "rgba(255,255,255,0.5)",
                                }}>{projectInfo && projectInfo.status}</Typography>

                            </Box>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", marginBottom: "0em"}}>
                            <Diversity2OutlinedIcon sx={{color: "rgba(255,255,255,0.5)"}}/>
                            <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                <Typography sx={{
                                    flex: 0.5,
                                    fontSize: "1rem",
                                    color: "rgb(255,255,255)",
                                }}>Assign</Typography>
                                {!isInfoLoading && projectInfo && (
                                    <Box sx={{display: "flex", flex: 1, alignItems: "center"}}>
                                        {projectInfo.members.slice(0, 2).map((item: any) => {
                                            return <Box sx={{
                                                borderRadius: '0.5em',
                                                padding: "0 1em",
                                                marginLeft: "0.2em",
                                                display: 'flex',
                                                backgroundColor: "rgba(94,94,94,0.2)",
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'white',
                                                fontSize: "0.9em",
                                            }}><p> @{item.name}</p></Box>
                                        })}

                                        {projectInfo.member_count === 0 && (
                                            <Box sx={{borderRadius: "0.5em"}}>
                                                <Typography sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    color: "rgba(255,255,255,0.5)",
                                                    alignSelf: "center"
                                                }}>No
                                                    member</Typography>
                                            </Box>
                                        )}

                                        <Box sx={{
                                            cursor: "pointer",
                                            marginInlineStart: "0.5em",
                                            textAlign: "center",
                                            backdropFilter: "blur(4px)",
                                            padding: "0.25em",
                                            borderRadius: "0.2em",
                                            width: "24px",
                                            ":hover": {backgroundColor: "rgba(0,0,0,0.25)"}
                                        }}>
                                            <AddIcon sx={{fontSize: "0.8rem", color: "white"}}/>
                                        </Box>
                                    </Box>
                                )}

                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>

            <Button variant={"contained"} startIcon={<AddIcon/>} onClick={handlerAddNewBoard}
                    sx={{
                        alignSelf: "start",
                        textTransform: "unset",
                        color: "white",
                        marginX: "1.5em",
                        marginY: "1em",
                        width: "fit-content"
                    }}>
                <Typography sx={{fontSize: "1rem"}}>New Board</Typography>
            </Button>

            <Box sx={{
                display: 'flex'
            }}>

                {boardList && boardList.length > 0 && (
                    <Grid container spacing={2}>
                        {boardList.map((item: any) => {
                            if (item === 'new') {
                                return <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <NewBorderItem/>
                                </Grid>
                            } else {
                                return <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <BordersItem projectId={projectId} borderName={item.name} bordId={item.id}/>
                                </Grid>
                            }
                        })}
                    </Grid>
                )}
            </Box>

            {showAddNewBoardModal && (
                <AddBoardModal
                    projectId={projectId}
                    openModal={showAddNewBoardModal}
                    closeModal={() => setShowAddNewBoardModal(false)}
                    onAddBord={() => handlerGetBoard()}/>
            )}

        </Box>
    );
};

export default Project;