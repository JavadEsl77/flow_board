import React, {useEffect, useState} from 'react';
import {Avatar, Box, Chip, Divider, Grid, IconButton, InputBase, Modal, Tooltip, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from '@mui/icons-material/EditNote';
import BorderLinearProgress from "../../modules/progressBar/BorderLinearProgress";
import {searchAssignUser, taskAssignUser, taskUnAssignUser, updateTask} from "../../config/fetchData";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

interface props {
    openModal: boolean,
    closeModal: (updateStatus:boolean) => void,
    projectId: any;
    boarderId: any;
    taskDetail: any
    members: any[];
}

const ShowTaskDetailModal = ({projectId, boarderId, openModal, closeModal, taskDetail, members}: props) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        borderRadius: "1em",
        width: {xs: "90%", md: 500},
        bgcolor: 'background.paper',
        boxShadow: 10,
        p: 3,
    };

    const [searchValue, setSearchValue] = useState<string>("");
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [newUserList, setNewUserList] = useState<any>([]);
    const [addUserError, setAddUserError] = useState<any>('');
    const [memberList, setMemberList] = useState(members)
    const [didUpdate, setDidUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const requestSearchUser = async (searchValue: string) => {
        return await searchAssignUser(searchValue, projectId)
    }

    useEffect(() => {
        const delayTimeout = setTimeout(() => {
            if (searchValue.trim() !== '') {
                setSearchLoading(true)
                // ارسال درخواست به سرور
                requestSearchUser(searchValue).then((response) => {
                    setNewUserList(response.data)
                    setSearchLoading(false)
                })

            }
        }, 700);

        return () => {
            clearTimeout(delayTimeout);
        };
    }, [searchValue]);

    const handlerChangeSearchInput = (event: any) => {
        const value = event.target.value;
        setSearchValue(value)
    };

    const requestAssignUser = async (userId: any) => {
        return await taskAssignUser(projectId, boarderId, taskDetail.id, userId)
    }

    const handlerAttachUser = (userId: any, username: any) => {
        const userExists = memberList.some(user => user.id === userId && user.username === username);
        if (userExists) {
            setAddUserError(`User "${username}" has already been added`)
        } else {
            setSearchLoading(true)
            requestAssignUser(userId).then((response) => {
                if (response.status === 201) {
                    const updatedUserList = [...memberList, {id: userId, username: username}];
                    setMemberList(updatedUserList);
                    setAddUserError('')
                    setDidUpdate(true)
                    setSearchLoading(false)
                }
            })
        }
    }

    const requestUnAssignUser = async (userId: any) => {
        return await taskUnAssignUser(projectId, boarderId, taskDetail.id, userId)
    }

    const handlerUnAssignUser = (userId: any) => {
        setSearchLoading(true)
        requestUnAssignUser(userId).then((response) => {
            if (response.status === 201) {
                const updatedUserList = memberList.filter(user => user.id !== userId);
                setMemberList(updatedUserList);
                setAddUserError('')
                setDidUpdate(true)

                setSearchLoading(false)
            }
        })
    }


    const [title, setTitle] = useState(taskDetail.name)
    const [defaultTitle, setDefaultTitle] = useState("")
    const [editTitle, setEditTitle] = useState(false)
    const handlerEditTitle = (event: any) => {

        setTitle(event.target.value)
    }
    const [description, setDescription] = useState(taskDetail.description)

    const [defaultDescription, setDefaultDescription] = useState("")
    const [editDescription, setEditDescription] = useState(false)

    const handlerEdtDescription = (event: any) => {
        setDescription(event.target.value)
    }

    const [showAssigned, setShowAssigned] = useState(false)

    const handlerShowAssignedUser = () => {
        setShowAssigned(!showAssigned)
        setAddUserError('')
        setSearchValue('')
        setNewUserList([])
    }


    const UpdateTask = async (taskId: any, name: string, description: string, status: string) => {
        return await updateTask(boarderId, taskId, projectId, name, description, status, "")
    }

    const handlerUpdateTask = () => {
        setIsLoading(true)
        UpdateTask(taskDetail.id, title, description, taskDetail.status).then(() => {
            setIsLoading(false)
            setDidUpdate(true)
        })
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={()=>closeModal(didUpdate)}
            >
                <Box sx={style}>

                    <Box sx={{display: "flex", marginLeft: "0.5em", alignItems: "center"}}>
                        <Box sx={{flex: 1,}}>
                            <Box sx={{display: "flex"}}>

                                {!editTitle && (
                                    <Typography sx={{fontSize: "1rem", fontWeight: "bold"}}>
                                        {title}
                                    </Typography>
                                )}

                                {editTitle && (
                                    <InputBase
                                        sx={{
                                            width: "50%",
                                            fontSize: "1rem",
                                            backgroundColor: "grey.100",
                                            borderRadius: "0.5rem",
                                            paddingInlineStart: ".5rem"
                                        }}
                                        onChange={handlerEditTitle}
                                        value={title}/>
                                )}

                                <Tooltip title={editTitle ? "done" : "change title"} placement="right" arrow>

                                    <IconButton sx={{width: "1.8rem", height: "1.8rem", marginInlineStart: "0.25rem"}}
                                                onClick={() => {
                                                    if (editTitle) {
                                                        setEditTitle(!editTitle)
                                                        if (title !== defaultTitle)
                                                            handlerUpdateTask()
                                                    } else {
                                                        setDefaultTitle(title)
                                                        setEditTitle(!editTitle)
                                                    }

                                                }}>
                                        {!editTitle && (
                                            <EditNoteIcon sx={{fontSize: "20px", color: "grey.500"}}/>
                                        )}

                                        {editTitle && (
                                            <DoneRoundedIcon sx={{fontSize: "20px", color: "primary.main"}}/>
                                        )}

                                    </IconButton>
                                </Tooltip>

                            </Box>

                            <Box sx={{display: "flex"}}>
                                <Typography sx={{fontSize: ".875rem", color: "grey.500"}}>
                                    {"in board "}
                                </Typography>
                                <Typography
                                    sx={{
                                        marginInlineStart: "0.25rem",
                                        fontSize: ".875rem",
                                        fontWeight: "bold",
                                        color: "primary.main"
                                    }}>
                                    {taskDetail.board.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{marginTop: "0.75rem"}}/>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5rem",
                        marginLeft: "0.5em",
                        marginBottom: "0.25rem"
                    }}>

                        <Typography sx={{
                            fontSize: "0.875rem",
                            color: "grey.500",
                        }}>Description</Typography>

                        <Tooltip title={editDescription ? "done" : "edit description"} placement="right" arrow>
                            <IconButton sx={{width: "1.8rem", height: "1.8rem", marginInlineStart: "0.25rem"}}
                                        onClick={() => {
                                            if (editDescription) {
                                                setEditDescription(!editDescription)
                                                if (description !== defaultDescription)
                                                    handlerUpdateTask()
                                            } else {
                                                setDefaultDescription(description)
                                                setEditDescription(!editDescription)
                                            }
                                        }}>
                                {!editDescription && (
                                    <EditNoteIcon sx={{fontSize: "20px", color: "grey.500"}}/>
                                )}

                                {editDescription && (
                                    <DoneRoundedIcon sx={{fontSize: "20px", color: "primary.main"}}/>
                                )}
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box sx={{
                        display: "flex",
                        marginTop: "0.25rem",
                        marginLeft: "0.5em",
                    }}>

                        {!editDescription && (
                            <Typography sx={{
                                width: "100%",
                                fontSize: "0.875rem",
                                color: "grey.500",

                                direction: "rtl",
                                backgroundColor: "grey.50",
                                borderRadius: "0.5rem",
                                textAlign: "end",
                                overflowWrap: "break-word",
                                padding: "0.5rem"
                            }}>{description}</Typography>
                        )}


                        {editDescription && (
                            <InputBase
                                sx={{
                                    border: 1,
                                    borderColor: "primary.main",
                                    width: "100%",
                                    fontSize: "0.875rem",
                                    backgroundColor: "grey.50",
                                    borderRadius: "0.5rem",
                                    paddingInlineStart: ".5rem",
                                }}
                                multiline={true}
                                onChange={handlerEdtDescription}
                                value={description}/>
                        )}

                    </Box>

                    <Box sx={{display: "flex", marginTop: "1.5rem"}}>
                        <Typography sx={{
                            fontSize: "0.875rem",
                            color: "grey.500",

                        }}>Assigned :</Typography>
                        <IconButton sx={{
                            width: "1.8rem",
                            height: "1.8rem",
                            backgroundColor: "grey.100",
                            marginInlineStart: "0.5rem"
                        }}
                                    onClick={handlerShowAssignedUser}>
                            {!showAssigned && (<AddIcon fontSize={"small"} sx={{color: "gray.50"}}/>)}
                            {showAssigned && (<DoneRoundedIcon fontSize={"small"} sx={{color: "gray.50"}}/>)}
                        </IconButton>
                    </Box>

                    <Box sx={{marginTop: "0.5rem", marginBottom: addUserError !== '' ? "unset" : "1rem"}}>



                        <Grid sx={{
                            overflowY: "auto",
                        }} container spacing={0.5}>
                            {memberList.length > 0 && (
                                memberList.map((item: any) => {
                                    return <Grid item>
                                        <Chip
                                            sx={{fontSize: "0.875rem"}}
                                            avatar={<Avatar/>}
                                            label={item.username}
                                            onDelete={() => handlerUnAssignUser(item.id)}
                                        />
                                    </Grid>
                                })
                            )}
                        </Grid>


                        {memberList.length == 0 && (
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                borderRadius: "0.3rem",
                                justifyContent: "start",
                                alignItems: "center"
                            }}>
                                <Typography sx={{textAlign: "center", color: "grey.400", fontSize: "0.75rem"}}>User not
                                    Assigned!</Typography>
                            </Box>
                        )}


                    </Box>

                    {showAssigned && (<Box>
                        <Typography sx={{
                            fontSize: ".875rem",
                            fontWeight: "bold",
                            marginInlineStart: "0.5rem",
                        }}>Add new member</Typography>
                        <Box sx={{
                            height: "35px",
                            display: "flex",
                            marginBottom: ".5rem",
                            backgroundColor: "grey.100",
                            borderRadius: "0.3rem",
                            marginTop: "0.5rem",
                            paddingInline: "1rem"
                        }}>

                            <InputBase sx={{
                                width: "100%",
                                fontSize: ".8em"
                            }}
                                       onChange={handlerChangeSearchInput}
                                       value={searchValue}
                                       placeholder={"searching username ..."}
                                       size="small"></InputBase>

                        </Box>
                        <Grid sx={{
                            overflowY: "auto",
                            maxHeight: {xs: "250px", md: "500px"},
                        }} container spacing={0.5}>
                            {!searchLoading && newUserList.length > 0 && (
                                newUserList.map((item: any) => {
                                    return <Grid item>
                                        <Chip
                                            sx={{fontSize: "0.875rem"}}
                                            avatar={<Avatar/>}
                                            label={item.username}
                                            deleteIcon={<AddCircleRoundedIcon sx={{color: "primary.main"}}/>}
                                            onDelete={() => handlerAttachUser(item.id, item.username)}
                                        />

                                    </Grid>
                                })
                            )}
                        </Grid>
                    </Box>)}

                    {addUserError !== '' && (<Typography sx={{
                        marginBottom: ".5rem",
                        marginTop: "0.5rem",
                        fontSize: "0.75rem",
                        marginInlineStart: "0.5rem",
                        color: "red",
                        fontWeight: "bold"
                    }}>- {addUserError}</Typography>)}

                    {searchLoading && (
                        <BorderLinearProgress sx={{marginX: "0.5rem", marginBottom: "0.5rem"}}/>
                    )}

                    {isLoading && (
                        <BorderLinearProgress sx={{marginX: "0.5rem", marginBottom: "0.5rem"}}/>
                    )}

                </Box>
            </Modal>
        </div>
    );
};

export default ShowTaskDetailModal;