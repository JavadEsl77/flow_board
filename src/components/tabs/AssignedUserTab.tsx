import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Grid, IconButton, InputBase, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import BorderLinearProgress from "../../modules/progressBar/BorderLinearProgress";
import {searchAssignUser, taskAssignUser, taskUnAssignUser} from "../../config/fetchData";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import addUser from "../../assets/img/addUser.svg";

interface props{
    projectId: any;
    boarderId: any;
    taskId:any
    members: any[];
    didUpdate:(update:boolean)=>void
}

const AssignedUserTab = ({projectId, boarderId, taskId , members , didUpdate}:props) => {
    const [addUserError, setAddUserError] = useState<any>('');
    const [newUserList, setNewUserList] = useState<any>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false)
    const [memberList, setMemberList] = useState(members)

    const requestSearchUser = async (searchValue: string) => {
        return await searchAssignUser(searchValue, projectId)
    }

    useEffect(() => {
        const delayTimeout = setTimeout(() => {
                setSearchLoading(true)
                requestSearchUser("").then((response) => {
                    setNewUserList(response.data)
                    setSearchLoading(false)
                })
        }, 700);

        return () => {
            clearTimeout(delayTimeout);
        };
    }, []);

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


    const checkUsersList = (userId:number) => {
        return memberList.some(user => user.id === userId);
    }

    return (
        <Box sx={{marginTop: "-24px", marginX: "-20px"}}>

            <Box sx={{
                marginTop: "0.5rem",
                marginInlineStart: "0.5rem",
                marginBottom: addUserError !== '' ? "unset" : "1rem"
            }}>


                <Grid sx={{
                    overflowY: "auto",
                }} container spacing={1}>
                    {memberList.length > 0 && (
                        memberList.map((item: any) => {
                            return <Grid item xs={6} >
                                <Box sx={{display:"flex", width:"100%" , padding:"0.5rem" , alignItems:"center" , backgroundColor:"grey.50" , borderRadius:"0.8rem"}}>

                                    <Box sx={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: "#d6d6d6",
                                        marginInlineEnd:"0.75rem",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}><p> {item.username.charAt(0)}</p></Box>
                                    <Typography sx={{flex:1}}>{item.username}</Typography>

                                    <Button variant={"contained"}
                                            onClick={() => handlerUnAssignUser(item.id)}
                                            startIcon={<CloseRoundedIcon/>}
                                            sx={{
                                                textTransform: "unset",
                                                color: "white",
                                                height:"2rem",
                                                padding: "0.7rem 1rem",
                                                marginInlineEnd:"0.5rem",
                                                borderRadius: "0.5rem",
                                                backgroundColor: "secondary.main",
                                                width: "fit-content",
                                                ":hover": {
                                                    boxShadow: "rgba(0, 0, 0, 0.2) 0 2px 5px",
                                                    backgroundColor: "secondary.main"
                                                },
                                                boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                                transition: "box-shadow 0.3s ease-in-out"
                                            }}>
                                        <Typography sx={{  fontSize: "0.75rem"}}>remove</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        })
                    )}
                </Grid>

                {memberList.length == 0 && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        marginTop: "2rem"
                    }}>
                        <Box sx={{maxWidth: {xs: "160px", md: "160px"}}}>
                            <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={addUser}
                                 alt="empty Image"/>
                        </Box>
                        <Typography sx={{fontSize: "0.875rem", color: "grey.300", marginTop: "1rem"}}>
                            No users have signed in to this task yet</Typography>
                    </Box>
                )}

                <Divider sx={{marginY: "1.5rem", fontSize: "0.75rem", color: "grey.500", fontWeight: "bold"}}>Project members - list</Divider>

                <Grid sx={{
                    overflowY: "auto",
                    maxHeight: {xs: "250px", md: "500px"},
                }} container spacing={0.5}>
                    {!searchLoading && newUserList.length > 0 && (
                        newUserList.map((item: any) => {
                            return <Grid item  xs={6}>

                                <Box sx={{display:"flex", width:"100%" , padding:"0.5rem" , alignItems:"center" , backgroundColor:"grey.50" , borderRadius:"0.8rem"}}>

                                    <Box sx={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: "#d6d6d6",
                                        marginInlineEnd:"0.75rem",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}><p> {item.username.charAt(0)}</p></Box>
                                    <Typography sx={{flex:1}}>{item.username}</Typography>

                                    <Button variant={"contained"}
                                            disabled={checkUsersList(item.id)}
                                            onClick={() => handlerAttachUser(item.id, item.username)}
                                            startIcon={<AddIcon/>}
                                            sx={{
                                                textTransform: "unset",
                                                color: "white",
                                                height:"2rem",
                                                padding: "0.7rem 1rem",
                                                marginInlineEnd:"0.5rem",
                                                borderRadius: "0.5rem",
                                                backgroundColor: "primary.main",
                                                width: "fit-content",
                                                ":hover": {
                                                    boxShadow: "rgba(0, 0, 0, 0.2) 0 2px 5px",
                                                    backgroundColor: "primary.main"
                                                },
                                                boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
                                                transition: "box-shadow 0.3s ease-in-out"
                                            }}>
                                        <Typography sx={{  fontSize: "0.75rem"}}>Assigned</Typography>
                                    </Button>
                                </Box>

                                {/*<Chip*/}
                                {/*    sx={{fontSize: "0.875rem"}}*/}
                                {/*    avatar={<Avatar/>}*/}
                                {/*    label={item.username}*/}
                                {/*    deleteIcon={<AddCircleRoundedIcon sx={{color: "primary.main"}}/>}*/}
                                {/*    onDelete={() => handlerAttachUser(item.id, item.username)}*/}
                                {/*/>*/}

                            </Grid>
                        })
                    )}
                </Grid>

            </Box>

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