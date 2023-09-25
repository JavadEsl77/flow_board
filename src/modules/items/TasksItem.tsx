import React, {useState} from 'react';
import {Avatar, Box, Fade, IconButton, Tooltip, Typography} from "@mui/material";
import {NotificationToast} from "../Notification/NotificationToast";
import ShowTaskDetailModal from "../../components/modals/ShowTaskDetailModal";
import {AvatarGroup} from "@mui/lab";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

interface propsT {
    item: any
    updateTask: (didUpdate: boolean) => void
}

const TasksItem = ({item, updateTask}: propsT) => {
    const [showDetailTaskModal, setShowDetailTaskModal] = useState<boolean>(false)
    return (
        <div>
            <Fade in={true} timeout={700}>
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

                    <Box sx={{display: "flex"}}>
                        <Box sx={{flex: 1}}>
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

                        {/*<IconButton sx={{width:"2rem" , height:"2rem" ,marginInline:"0.25rem" }}>*/}
                        {/*    <DeleteOutlineRoundedIcon sx={{color:"error.main"}} fontSize={"small"}/>*/}
                        {/*</IconButton>*/}
                        <Tooltip title={"edit task"} placement={"left"} arrow >
                            <IconButton sx={{
                                width: "1.8rem",
                                height: "1.8rem",
                                backgroundColor: "grey.100",
                                marginInlineEnd: "2px",
                                ":hover":{backgroundColor:"grey.200"}
                            }} onClick={() => setShowDetailTaskModal(true)}>
                                <CreateRoundedIcon sx={{color: "grey.400", fontSize: "16px"}}/>
                            </IconButton>
                        </Tooltip>


                    </Box>


                    <Box sx={{display: "flex", alignItems: "center", marginTop: "1rem"}}>
                        <Typography
                            sx={{fontSize: "0.8rem", color: "grey.500", flex: 1}}>{item.created_at}</Typography>
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
            </Fade>
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