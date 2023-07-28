import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import BordersItem from "../modules/items/BordersItem";
import NewBorderItem from "../modules/items/NewBorderItem";
import {getProjectInfo} from "../config/fetchData";


const Project = () => {
    const {projectId} = useParams();
    const getRandomColor = () => {
        const randomR = Math.floor(Math.random() * 80) + 220;
        const randomG = Math.floor(Math.random() * 80) + 150;
        const randomB = Math.floor(Math.random() * 80) + 150;
        return `rgb(${randomR}, ${randomG}, ${randomB})`;
    };

    const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
    const [infoError, setInfoError] = useState('');
    const [projectInfo,setProjectInfo] =useState<any>(null)

    const borders = ["open", "in progress", "done", "new"]

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

    useEffect(() => {
        requestGetProjectInfo().then(() =>{} )
    }, [projectId])


    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{width: "100%", position: "relative", paddingBottom: "1.5em"}}>
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
                                    flex: 1,
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
                                    flex: 1,
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
                                    flex: 1,
                                    fontSize: "1rem",
                                    color: "rgb(255,255,255)",
                                }}>Assign</Typography>

                                {!isInfoLoading && projectInfo && (
                                    <Box sx={{display: "flex", flex: 1}}>
                                        {projectInfo.members.slice(0,2).map((item: any) => {
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
                                    </Box>
                                )}
                            </Box>
                        </Box>


                    </Box>
                </Box>

            </Box>

            <Box sx={{
                display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'
            }}>
                {borders.map((item: any, index: number) => {

                    if (item === 'new') {
                        return <NewBorderItem/>
                    } else {
                        return <BordersItem item={item}/>
                    }
                })}
            </Box>

        </Box>
    );
};

export default Project;