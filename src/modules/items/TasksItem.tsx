import React, {useState} from 'react';
import {Avatar, Box, Fade, IconButton, Typography} from "@mui/material";
import {NotificationToast} from "../Notification/NotificationToast";
import ShowTaskDetailModal from "../../components/modals/ShowTaskDetailModal";
import {AvatarGroup} from "@mui/lab";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import TaskItemMenuOptions from "../../components/menu/TaskItemMenuOptions";
import DeleteTaskModal from "../../components/modals/DeleteTaskModal";

interface propsT {
    item: any
    boardId: number
    projectId: any,
    updateTask: (didUpdate: boolean) => void
}

const TasksItem = ({item, updateTask , boardId , projectId}: propsT) => {
    const [showDetailTaskModal, setShowDetailTaskModal] = useState<boolean>(false)
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState<boolean>(false)
    const [showTaskMenu, setShowTaskMenu] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handlerShowTaskMenu = (event: any) => {
        setShowTaskMenu(!showTaskMenu)
        setAnchorEl(event.currentTarget)
    }

    return (
        <div>
            <Fade in={true} timeout={700}>
                <Box sx={{position:"relative"}}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "0.5rem",
                        padding: "1em",
                        borderRadius: "0.8rem",
                        backgroundColor: "white",
                        alignItems: "top",
                        ":hover": {
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 30px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                        },
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                        transition: "box-shadow 0.3s ease-in-out"
                    }}>
                        <Box>

                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    direction: "rtl",
                                    textAlign: "end",
                                    color: "grey.600"
                                }}>{item.name}</Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.8rem",
                                    color: "grey.600",
                                    direction: "rtl",
                                    textAlign: "end",
                                    display: '-webkit-box',
                                    '-webkit-line-clamp': '3',
                                    '-webkit-box-orient': 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>{item.description}</Typography>

                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                            <Typography
                                sx={{fontSize: "0.8rem", color: "grey.500", flex: 1}}>{item.created_at}
                            </Typography>
                            {item.assign_user.length > 0 && (<AvatarGroup max={5}>
                                    {item.assign_user.map((users: any) => {
                                        return <Avatar
                                            sx={{cursor: "auto", width: 30, height: 30, backgroundColor: "secondary.light"}}
                                            alt="Remy Sharp" src=""
                                            title={users.username}>
                                            <p style={{fontSize: ".875rem"}}> {users.username.charAt(0) + users.username.charAt(1)}</p>
                                        </Avatar>
                                    })}
                                </AvatarGroup>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{position:"absolute",  margin: ".45em .5rem" , top:0 , right:0}}>
                                <IconButton sx={{
                                    width: "1.9rem",
                                    height: "1.9rem",
                                    ":hover":{backgroundColor:"grey.100"}
                                }} onClick={handlerShowTaskMenu}>
                                    <MoreVertRoundedIcon sx={{color: "grey.500", fontSize: "16px"}}/>
                                </IconButton>
                    </Box>
                </Box>

            </Fade>

            {showTaskMenu && (
                <TaskItemMenuOptions
                    projectId={projectId}
                    boardId={boardId}
                    handlerUpdateTask={() => {
                        setShowDetailTaskModal(true)
                        setShowTaskMenu(false)
                    }}
                    handlerDeleteTask={() => {
                        setShowDeleteTaskModal(true)
                        setShowTaskMenu(false)
                    }}
                    color={"grey.500"}
                    event={anchorEl}
                    handleCloseMenu={() => {
                        setAnchorEl(null)
                        setShowTaskMenu(!showTaskMenu)
                    }}
                    showOption={showTaskMenu}/>
            )}

            {showDeleteTaskModal && (
                <DeleteTaskModal openModal={showDeleteTaskModal} closeModal={() => {
                    setShowDeleteTaskModal(false)
                }} didUpdate={() => {
                    NotificationToast("The Task was deleted", "success")
                    updateTask(true)
                }} boardId={boardId} projectId={projectId} taskId={item.id}/>
            )}

            {showDetailTaskModal && (
                <ShowTaskDetailModal
                    members={item.assign_user}
                    projectId={item.project.id} taskDetail={item}
                    boarderId={item.board.id}
                    openModal={showDetailTaskModal}
                    closeModal={(updateStatus) => {
                        if (updateStatus) {
                            updateTask(updateStatus)
                            NotificationToast("The Task was Update", "success")
                        }
                        setShowDetailTaskModal(false)
                    }}
                />
            )}
        </div>
    );
};

export default TasksItem;