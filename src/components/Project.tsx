import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Fade, Tooltip, Typography} from "@mui/material";
import ToolBar from "../modules/toolbar/ToolBar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import BoardItem from "../modules/items/BoardItem";
import NewBorderItem from "../modules/items/NewBorderItem";
import {getBorders, getProjectInfo} from "../config/fetchData";
import AddIcon from '@mui/icons-material/Add';
import AddBoardModal from "./modals/AddBoardModal";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from "./modals/EditProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import {DragDropContext} from 'react-beautiful-dnd';
import AddProjectMemberMenu from "./menu/AddProjectMemberMenu";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import bannerImage from '../assets/img/banner.jpg'
import emptyIcon from '../assets/img/add_notes.svg';
import {NotificationToast} from "../modules/Notification/NotificationToast";

const Project = () => {
    const {projectId} = useParams();
    const navigate = useNavigate()

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
                     src={bannerImage}
                     alt={"banner"}/>

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
                                background: "rgba(0,0,0,0.2)",
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
                                    color: "rgba(0,0,0,0.8)",
                                    fontWeight: "bold"
                                }}>{projectInfo ? projectInfo.name : "Loading name ..."}</Typography>
                                <Typography sx={{
                                    fontSize: "1rem",
                                    width: "80%",
                                    color: "rgba(0,0,0,0.8)",
                                }}>{projectInfo ? projectInfo.description : "Loading description ..."}</Typography>
                                <Box sx={{display: "flex", marginTop: "1.5rem"}}>
                                    <Box sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        backdropFilter: "blur(8px)",
                                        backgroundColor:"rgba(0,0,0,0.2)",
                                        borderRadius: "0.5em",
                                        justifyContent: "center",
                                        width: "30px",
                                        height: "30px",
                                        transition: "background-color 0.3s ease-in-out",
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
                                        backgroundColor:"rgba(0,0,0,0.2)",
                                        justifyContent: "center",
                                        width: "30px",
                                        height: "30px",
                                        transition: "background-color 0.3s ease-in-out",
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
                                <AccessTimeIcon sx={{color: "rgba(0,0,0,0.5)"}}/>
                                <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                    <Typography sx={{
                                        flex: 0.5,
                                        fontSize: "1rem",
                                        color: "rgba(0,0,0,0.8)",
                                    }}>Created at</Typography>
                                    <Typography sx={{
                                        flex: 1,
                                        fontSize: "0.9rem",
                                        fontWeight:"bold",
                                        color: "rgba(0,0,0,0.8)",
                                    }}>{projectInfo ? projectInfo.created_at : " Loading ..."}</Typography>

                                </Box>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", marginBottom: "1em"}}>
                                <TroubleshootOutlinedIcon sx={{color: "rgba(0,0,0,0.5)"}}/>
                                <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                    <Typography sx={{
                                        flex: 0.5,
                                        fontSize: "1rem",
                                        color: "rgba(0,0,0,0.8)",
                                    }}>status</Typography>
                                    <Typography sx={{
                                        flex: 1,
                                        fontSize: "0.9rem",
                                        fontWeight:"bold",
                                        color: "rgba(0,0,0,0.8)",
                                    }}>{projectInfo ? projectInfo.status : "Loading ..."}</Typography>

                                </Box>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", marginBottom: "0em"}}>
                                <Diversity2OutlinedIcon sx={{color: "rgba(0,0,0,0.5)"}}/>
                                <Box sx={{display: "flex", flex: 1, flexDirection: "row", marginLeft: "0.8rem"}}>
                                    <Typography sx={{
                                        flex: 0.5,
                                        fontSize: "1rem",
                                        color: "rgba(0,0,0,0.8)",
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
                                                    color: "rgba(0,0,0,0.8)",
                                                    textAlign: 'center',
                                                    fontSize: "0.875em",
                                                }}><p style={{   marginBottom:"0.1rem",}}> @{item.username}</p></Box>
                                            })}

                                            {projectInfo.member_count === 0 && (
                                                <Box sx={{borderRadius: "0.5em"}}>
                                                    <Typography sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "0.875rem",
                                                        marginBottom:"0.2rem",
                                                        color: "rgba(0,0,0,0.8)",
                                                        alignSelf: "center"
                                                    }}>No
                                                        member</Typography>
                                                </Box>
                                            )}

                                            <Tooltip arrow
                                                     title={projectInfo.member_count <= 2 ? "add member" : "show more"}>
                                                <Box sx={{
                                                    cursor: "pointer",
                                                    marginInlineStart: "0.2em",
                                                    textAlign: "center",
                                                    backdropFilter: "blur(4px)",
                                                    padding: "0.25em",
                                                    borderRadius: "0.4em",
                                                    width: "24px",
                                                    transition: "background-color 0.3s ease-in-out",
                                                    ":hover": {backgroundColor: "rgba(0,0,0,0.25)"}
                                                }} onClick={handlerShowAddMemberMenu}>
                                                    {projectInfo.member_count <= 2 ?
                                                        <AddIcon sx={{fontSize: "0.8rem",  color: "rgba(0,0,0,0.8)",}}/> :
                                                        <MoreHorizIcon sx={{fontSize: "0.8rem", color: "rgba(0,0,0,0.8)"}}/>}

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
                    </Box>

                </Box>


            </Box>


            {boardList.length > 0 && (
                <Fade in={true} timeout={700}><Button id={'add-new-board-header-button'} variant={"contained"} startIcon={<AddIcon/>}
                                                      onClick={handlerAddNewBoard}
                                                      sx={{
                                                          alignSelf: "start",
                                                          textTransform: "unset",
                                                          color: "white",
                                                          marginX: "1.5em",
                                                          marginTop: "1em",
                                                          padding: "0.7rem 1rem",
                                                          borderRadius: "0.7rem",
                                                          width: "fit-content",
                                                          ":hover": {
                                                              boxShadow: "rgba(0, 0, 0, 0.2) 0 8px 15px",
                                                              backgroundColor: "primary.main"
                                                          },
                                                          boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                                          transition: "box-shadow 0.3s ease-in-out"
                                                      }}>
                    <Typography sx={{fontSize: "0.8rem"}}>New Board</Typography>
                </Button></Fade>
            )}

            <DragDropContext onDragStart={handlerDragStart} onDragEnd={handleDragEnd}>
                <Box sx={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    display: 'flex',
                    borderRadius: "0.8rem",
                    margin: "1rem",
                    flexDirection: 'row',

                }}>

                    {!isBorderLoading && boardList && boardList.length > 0 && (
                        boardList.map((item: any,index) => {
                            if (item === 'new') {
                                return <NewBorderItem/>
                            } else {
                                return <BoardItem
                                    id={`boardItem-${index}`}
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

                    {isBorderLoading && (
                        <Fade in={true} timeout={700}><Box
                            sx={{display: "flex", width: "100%", height: "60vh", justifyContent: "center"}}>
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

                    {!isBorderLoading && boardList && boardList.length == 0 && (
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
                                    <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={emptyIcon}
                                         alt="empty Image"/>
                                </Box>
                                <Typography
                                    sx={{marginTop: "1.5rem", color: "black", fontSize: {xs: "1rem", md: "1.2rem"}}}>Oops!
                                    it`s
                                    Empty</Typography>
                                <Typography sx={{
                                    marginTop: ".5rem",
                                    color: "grey.400",
                                    fontSize: {xs: "0.875rem", md: "1rem"}
                                }}>looks
                                    like you don`t have any Board in your project</Typography>
                                <Button id={'add-new-board-button'} variant={"contained"} startIcon={<AddIcon/>} onClick={handlerAddNewBoard}
                                        sx={{
                                            textTransform: "unset",
                                            color: "white",
                                            fontSize: "1rem",
                                            marginTop: {xs: "1.5rem", md: "2rem"},
                                            padding: "0.7rem 1rem",
                                            borderRadius: "0.7rem",
                                            width: "fit-content",
                                            ":hover": {
                                                boxShadow: "rgba(0, 0, 0, 0.2) 0 8px 15px",
                                                backgroundColor: "primary.main"
                                            },
                                            boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                            transition: "box-shadow 0.3s ease-in-out"
                                        }}>
                                    <Typography sx={{fontSize: "0.8rem"}}>New Board</Typography>
                                </Button>
                            </Box>
                        </Fade>
                    )}
                </Box>
            </DragDropContext>

            {
                showAddNewBoardModal && (
                    <AddBoardModal
                        id={'add-board-modal'}
                        projectId={projectId}
                        openModal={showAddNewBoardModal}
                        closeModal={() => setShowAddNewBoardModal(false)}
                        onAddBord={() => {
                            NotificationToast("The Board was built","success")
                            handlerGetBoard()
                        }}/>
                )
            }

            {
                showEditProjectModal && (
                    <EditProjectModal
                        openModal={showEditProjectModal}
                        closeModal={() => setShowEditProjectModal(false)}
                        onUpdateProject={() => {
                            NotificationToast("The project was edited", "success")
                            handlerGetProject()
                        }}
                        projectInfo={projectInfo}/>
                )
            }

            {
                showDeleteProjectModal && (
                    <DeleteProjectModal
                        openModal={showDeleteProjectModal}
                        closeModal={() => setShowDeleteProjectModal(false)}
                        didUpdate={() => {
                            NotificationToast("The project was deleted", "success")
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