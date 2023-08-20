import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Grid, Tooltip, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import BoardItem from "../modules/items/BoardItem";
import NewBorderItem from "../modules/items/NewBorderItem";
import {getBorders, getProjectInfo} from "../config/fetchData";
import AddIcon from '@mui/icons-material/Add';
import AddBoardModal from "./modals/AddBoardModal";
import Lottie from "react-lottie";
import emptyList from "../assets/lotties/empty_list.json";
import loadingList from "../assets/lotties/loading.json";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from "./modals/EditProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import {DragDropContext} from 'react-beautiful-dnd';
import AddProjectMemberMenu from "./menu/AddProjectMemberMenu";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Project = () => {
    const {projectId} = useParams();
    const navigate = useNavigate()
    // const getRandomColor = () => {
    //     const randomR = Math.floor(Math.random() * 50) + 180;
    //     const randomG = Math.floor(Math.random() * 50) + 80;
    //     const randomB = Math.floor(Math.random() * 200) + 100;
    //     return `rgba(${randomR}, ${randomG}, ${randomB},0.4)`;
    // };

    const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
    const [infoError, setInfoError] = useState('');
    const [projectInfo, setProjectInfo] = useState<any>(null)

    const [isBorderLoading, setIsBorderLoading] = useState<boolean>(false);
    const [boardError, setBoardError] = useState('');
    const [boardList, setBoardList] = useState<any[]>([])

    const [showAddNewBoardModal, setShowAddNewBoardModal] = useState<boolean>(false)
    const [showEditProjectModal, setShowEditProjectModal] = useState<boolean>(false)
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState<boolean>(false)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showAddMemberMenu, setShowAddMemberMenu] = useState<boolean>(false)


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: !isBorderLoading ? emptyList : loadingList,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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

    const handlerGetProject = () => {
        requestGetProjectInfo().then(() => {
        })
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
            setIsInfoLoading(false)
        })
    }


    useEffect(() => {
        handlerGetBoard()
    }, [])

    useEffect(() => {
        handlerGetProject()
    }, [projectId])


    const handlerAddNewBoard = () => {
        setShowAddNewBoardModal(!showAddNewBoardModal)
    }

    const handlerShowEditProjectModal = () => {
        setShowEditProjectModal(!showEditProjectModal)
    }

    const handlerShowDeleteProject = () => {
        setShowDeleteProjectModal(!showDeleteProjectModal)
    }

    const handlerShowAddMemberMenu = (event: any) => {
        setShowAddMemberMenu(!showAddMemberMenu)
        setAnchorEl(event.currentTarget)
    }

    const [changeList, setChangeList] = useState<any>(null)
    const [taskId, setTaskId] = useState(null)

    const handlerDragStart = (result: any) => {
        setTaskId(result.draggableId)
    }

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        setChangeList(result)

    };
    return (
        <Box sx={{display: "flex", flexDirection: "column", backgroundColor: "white"}}>
            <Box sx={{width: "100%", position: "relative", paddingBottom: "1.5em"}}>

                <img style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute"}}
                     src={"https://marketplace.canva.com/EAENvqzqoT0/1/0/1600w/canva-corporate-work-linkedin-banner-YjnYKO7wUkE.jpg"}
                     alt={"banner"}/>
                <Box sx={{
                    height: "100%", width: "100%", position: "absolute", top: "0",
                    left: "0"
                }}/>

                <ToolBar toolbarTitle={"Project"}/>


                <Box sx={{position: "relative"}}>
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
                                }}>{projectInfo ? projectInfo.name : "Loading name ..."}</Typography>
                                <Typography sx={{
                                    fontSize: "1rem",
                                    width: "80%",
                                    color: "rgba(255,255,255,0.6)",
                                }}>{projectInfo ? projectInfo.description : "Loading description ..."}</Typography>
                                <Box sx={{display: "flex", marginTop: "1.5rem"}}>
                                    <Box sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        backdropFilter: "blur(8px)",
                                        borderRadius: "0.5em",
                                        justifyContent: "center",
                                        width: "30px",
                                        height: "30px",
                                        ":hover": {backgroundColor: "rgba(0,0,0,0.50)"}
                                    }} onClick={handlerShowDeleteProject}>
                                        {isInfoLoading && (
                                            <CircularProgress size={"16px"}
                                                              sx={{color: "#d6d6d6", alignSelf: "center",}}/>
                                        )}
                                        {!isInfoLoading && (<DeleteOutlineIcon fontSize={"small"} sx={{
                                            alignSelf: "center",
                                            color: "white"
                                        }}/>)}
                                    </Box>

                                    <Box sx={{
                                        display: "flex",
                                        marginInlineStart: "0.5rem",
                                        cursor: "pointer",
                                        backdropFilter: "blur(8px)",
                                        borderRadius: "0.5em",
                                        justifyContent: "center",
                                        width: "30px",
                                        height: "30px",
                                        ":hover": {backgroundColor: "rgba(0,0,0,0.50)"}
                                    }} onClick={handlerShowEditProjectModal}>

                                        {isInfoLoading && (
                                            <CircularProgress size={"16px"}
                                                              sx={{color: "#d6d6d6", alignSelf: "center",}}/>
                                        )}
                                        {!isInfoLoading && (
                                            <EditIcon fontSize={"small"} sx={{alignSelf: "center", color: "white"}}/>
                                        )}
                                    </Box>


                                </Box>
                            </Box>

                        </Box>

                        <Box sx={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            marginTop: {xs: "3em", md: "unset"}
                        }}>

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
                                    }}>{projectInfo ? projectInfo.created_at : " Loading ..."}</Typography>

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
                                    }}>{projectInfo ? projectInfo.status : "Loading ..."}</Typography>

                                </Box>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", marginBottom: "0em"}}>
                                <Diversity2OutlinedIcon sx={{color: "rgba(255,255,255,0.5)"}}/>
                                <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                    <Typography sx={{
                                        flex: 0.5,
                                        fontSize: "1rem",
                                        color: "rgb(255,255,255)",
                                    }}>Members</Typography>
                                    {!isInfoLoading && projectInfo && (
                                        <Box sx={{display: "flex", flex: 1, alignItems: "center"}}>
                                            {projectInfo.members.slice(0, 2).map((item: any) => {
                                                return <Box sx={{
                                                    borderRadius: '0.5em',
                                                    padding: "0.3em 1em",
                                                    marginLeft: "0.2em",
                                                    display: 'flex',
                                                    backgroundColor: "rgba(94,94,94,0.2)",
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    fontSize: "0.9em",
                                                }}><p> @{item.username}</p></Box>
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

                                            <Tooltip arrow
                                                     title={projectInfo.member_count <= 2 ? "add member" : "show more"}>
                                                <Box sx={{
                                                    cursor: "pointer",
                                                    marginInlineStart: "0.5em",
                                                    textAlign: "center",
                                                    backdropFilter: "blur(4px)",
                                                    padding: "0.25em",
                                                    borderRadius: "0.3em",
                                                    width: "24px",
                                                    ":hover": {backgroundColor: "rgba(0,0,0,0.25)"}
                                                }} onClick={handlerShowAddMemberMenu}>
                                                    {projectInfo.member_count <= 2 ?
                                                        <AddIcon sx={{fontSize: "0.8rem", color: "white"}}/> :
                                                        <MoreHorizIcon sx={{fontSize: "0.8rem", color: "white"}}/>}

                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    )}

                                    {isInfoLoading && (
                                        <Box
                                            sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                            <CircularProgress size={"16px"}
                                                              sx={{color: "#333333", alignSelf: "center",}}/>
                                        </Box>
                                    )}

                                </Box>
                            </Box>
                        </Box>

                        {isInfoLoading && (
                            <Box sx={{
                                position: "absolute",
                                display: "flex",
                                alignSelf: "center",
                                right: "50%",
                                top: "20%",
                                borderRadius: "0.8em",
                                padding: "1.5em",
                                backdropFilter: "blur(4px)",
                                backgroundColor: "rgba(0,0,0,0.09)",
                            }}>

                                <CircularProgress sx={{color: "#d6d6d6"}}/>

                            </Box>
                        )}
                    </Box>

                </Box>


            </Box>

            <Button variant={"contained"} startIcon={<AddIcon/>} onClick={handlerAddNewBoard}
                    sx={{
                        alignSelf: "start",
                        textTransform: "unset",
                        color: "white",
                        marginX: "1.5em",
                        marginTop: "1em",
                        width: "fit-content"
                    }}>
                <Typography sx={{fontSize: "0.8rem"}}>New Board</Typography>
            </Button>

            <DragDropContext onDragStart={handlerDragStart} onDragEnd={handleDragEnd}>
                <Box sx={{
                    display: 'flex',
                    height: "100%",
                    borderRadius: "0.8rem",
                    padding: "0.5rem",
                    margin: "1rem"
                }}>

                    {!isBorderLoading && boardList && boardList.length > 0 && (
                        boardList.map((item: any) => {
                            if (item === 'new') {
                                return <NewBorderItem/>
                            } else {
                                return <BoardItem
                                    onTaskInfo={(info: any) => {
                                        localStorage.setItem('taskInfo', info);
                                    }}
                                    taskId={taskId}
                                    onChangeList={changeList}
                                    projectId={projectId}
                                    borderName={item.name}
                                    boardId={item.id}
                                    onBoardChange={() => handlerGetBoard()}
                                />
                            }
                        })
                    )}

                    {
                        isBorderLoading && (
                            <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
                                <Lottie style={{margin: "0"}}
                                        options={defaultOptions}
                                        height={150}
                                        width={150}
                                />
                            </Box>
                        )
                    }
                </Box>
            </DragDropContext>

            {
                showAddNewBoardModal && (
                    <AddBoardModal
                        projectId={projectId}
                        openModal={showAddNewBoardModal}
                        closeModal={() => setShowAddNewBoardModal(false)}
                        onAddBord={() => handlerGetBoard()}/>
                )
            }

            {
                showEditProjectModal && (
                    <EditProjectModal
                        openModal={showEditProjectModal}
                        closeModal={() => setShowEditProjectModal(false)}
                        onUpdateProject={() => handlerGetProject()}
                        projectInfo={projectInfo}/>
                )
            }

            {
                showDeleteProjectModal && (
                    <DeleteProjectModal
                        openModal={showDeleteProjectModal}
                        closeModal={() => setShowDeleteProjectModal(false)}
                        didUpdate={() => {
                            //navigate to dashBoard
                            navigate(`/dashboard`)
                        }}
                        projectId={projectId}/>
                )
            }

            {
                showAddMemberMenu && (
                    <AddProjectMemberMenu
                        projectId={projectId}
                        members={projectInfo.members}
                        showMenu={showAddMemberMenu}
                        color={"#d6d6d6"}
                        event={anchorEl}
                        handleCloseMenu={(update) => {
                            if (update) {
                                handlerGetProject()
                                setShowAddMemberMenu(!showAddMemberMenu)
                            } else {
                                setShowAddMemberMenu(!showAddMemberMenu)
                            }

                        }}
                    />
                )
            }


        </Box>
    );
};

export default Project;