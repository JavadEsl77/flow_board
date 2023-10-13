import React, {useEffect, useState} from 'react';
import {Avatar, Box, Chip, Grid, IconButton, InputBase, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BorderLinearProgress from "../../modules/progressBar/BorderLinearProgress";
import {searchAssignUser, taskAssignUser, taskUnAssignUser} from "../../config/fetchData";

interface props{
    projectId: any;
    boarderId: any;
    taskId:any
    members: any[];
    didUpdate:(update:boolean)=>void
}

const AssignedUserTab = ({projectId, boarderId, taskId , members , didUpdate}:props) => {
    const [showAssigned, setShowAssigned] = useState(false)
    const [addUserError, setAddUserError] = useState<any>('');
    const [searchValue, setSearchValue] = useState<string>("");
    const [newUserList, setNewUserList] = useState<any>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false)
    const [memberList, setMemberList] = useState(members)

    const requestSearchUser = async (searchValue: string) => {
        return await searchAssignUser(searchValue, projectId)
    }

    useEffect(() => {
        const delayTimeout = setTimeout(() => {
            if (searchValue.trim() !== '') {
                setSearchLoading(true)
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



    const requestAssignUser = async (userId: any) => {
        return await taskAssignUser(projectId, boarderId, taskId, userId)
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
                    didUpdate(true)
                    setSearchLoading(false)
                }
            })
        }
    }

    const requestUnAssignUser = async (userId: any) => {
        return await taskUnAssignUser(projectId, boarderId, taskId, userId)
    }

    const handlerUnAssignUser = (userId: any) => {
        setSearchLoading(true)
        requestUnAssignUser(userId).then((response) => {
            if (response.status === 201) {
                const updatedUserList = memberList.filter(user => user.id !== userId);
                setMemberList(updatedUserList);
                setAddUserError('')
                didUpdate(true)

                setSearchLoading(false)
            }
        })
    }

    const handlerChangeSearchInput = (event: any) => {
        const value = event.target.value;
        setSearchValue(value)
    };

    const handlerShowAssignedUser = () => {
        setShowAssigned(!showAssigned)
        setAddUserError('')
        setSearchValue('')
        setNewUserList([])
    }
    return (
        <Box sx={{marginTop: "-24px", marginX: "-20px"}}>
            <Box sx={{display: "flex", marginTop: "1.5rem", marginInlineStart: "0.5rem"}}>
                <Typography sx={{
                    fontSize: "0.875rem",
                    color: "grey.500",

                }}>Assigned</Typography>
                <IconButton sx={{
                    width: "1.6rem",
                    height: "1.6rem",
                    backgroundColor: "secondary.light",
                    ":hover": {backgroundColor: "secondary.light"},
                    marginInlineStart: "0.5rem"
                }}
                            onClick={handlerShowAssignedUser}>
                    {!showAssigned && (<AddIcon fontSize={"small"} sx={{color: "white"}}/>)}
                    {showAssigned && (<DoneRoundedIcon fontSize={"small"} sx={{color: "white"}}/>)}
                </IconButton>
            </Box>

            <Box sx={{
                marginTop: "0.5rem",
                marginInlineStart: "0.5rem",
                marginBottom: addUserError !== '' ? "unset" : "1rem"
            }}>


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

            {showAssigned && (<Box sx={{marginInlineStart: "0.5rem"}}>
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
    );
};

export default AssignedUserTab;