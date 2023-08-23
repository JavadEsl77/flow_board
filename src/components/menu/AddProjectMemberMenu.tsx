import React, {useEffect, useState} from 'react';
import {Avatar, Box, Chip, Divider, Fade, Grid, InputBase, Menu, Typography} from "@mui/material";
import {projectMemberAttach, projectMemberDetach, searchUser} from "../../config/fetchData";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BorderLinearProgress from "../../modules/progressBar/BorderLinearProgress";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

interface propsT {
    showMenu: boolean;
    color: string;
    event: any;
    handleCloseMenu: (update: boolean) => void;
    projectId: any;
    members: any[];
}

const AddProjectMemberMenu = ({showMenu, color, event, handleCloseMenu, members, projectId}: propsT) => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [newUserList, setNewUserList] = useState<any>([]);
    const [addUserError, setAddUserError] = useState<any>('');
    const [memberList, setMemberList] = useState(members)
    const [didUpdate, setDidUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const requestSearchUser = async (searchValue: string) => {
        return await searchUser(searchValue)
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

    const requestAttachUser = async (userId: any) => {
        return await projectMemberAttach(projectId, userId)
    }

    const handlerAttachUser = (userId: any, username: any) => {
        const userExists = memberList.some(user => user.id === userId && user.username === username);
        if (userExists) {
            setAddUserError(`User "${username}" has already been added`)
        } else {
            setIsLoading(true)
            requestAttachUser(userId).then((response) => {
                if (response.status === 201) {
                    const updatedUserList = [...memberList, {id: userId, username: username}];
                    setMemberList(updatedUserList);
                    setAddUserError('')
                    setDidUpdate(true)
                    setIsLoading(false)
                }

            })

        }
    }

    const requestDetachUser = async (userId: any) => {
        return await projectMemberDetach(projectId, userId)
    }

    const handlerDeleteAttachUser = (userId: any) => {
        setIsLoading(true)
        requestDetachUser(userId).then((response) => {
            if (response.status === 204) {
                const updatedUserList = memberList.filter(user => user.id !== userId);
                setMemberList(updatedUserList);
                setAddUserError('')
                setDidUpdate(true)
                setIsLoading(false)
            }
        })


    }

    return (
            <div>
                <Menu
                    sx={{borderRadius: "0.8em", boxShadow: "0", maxWidth: "560px"}}
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    PaperProps={{
                        elevation: 2,
                        sx: {
                            borderRadius: "0.8em",
                            overflow: 'visible',
                            backgroundColor: color,
                            boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: color,
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    anchorEl={event}
                    open={showMenu}
                    onClose={() => handleCloseMenu(didUpdate)}
                    TransitionComponent={Fade}
                    transitionDuration={500}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "0.8em",
                        padding: "0.8em",
                        textAlign: "left",
                        marginBottom: "-0.5em",
                        backgroundColor: "white"
                    }}>

                        <Typography sx={{
                            fontSize: ".875rem",
                            color: "grey.500",
                            marginInlineStart: "0.5rem",
                            fontWeight: "bold"
                        }}>Members</Typography>


                        <Box sx={{marginTop: "0.5rem", marginBottom: addUserError !== '' ? "unset" : "1.5rem"}}>

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
                                                onDelete={() => handlerDeleteAttachUser(item.id)}
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
                                    padding: "0.5rem",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <AdminPanelSettingsOutlinedIcon
                                        sx={{color: "grey.500", marginInlineEnd: "0.5rem"}}/>
                                    <Typography sx={{textAlign: "center", color: "grey.500"}}>User not
                                        registered!</Typography>

                                </Box>
                            )}


                        </Box>

                        {addUserError !== '' && (<Typography sx={{
                            marginBottom: ".5rem",
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            marginInlineStart: "0.5rem",
                            color: "red",
                            fontWeight: "bold"
                        }}>- {addUserError}</Typography>)}

                        {isLoading && (
                            <BorderLinearProgress sx={{
                                marginBottom: "0.5rem",
                                marginTop: addUserError == '' ? "-1rem" : "unset",
                                marginX: "0.5rem"
                            }}/>
                        )}

                        <Divider sx={{marginBottom: "1.5rem"}}/>


                        <Typography sx={{fontSize: ".875rem", fontWeight: "bold", marginInlineStart: "0.5rem"}}>Add new
                            member</Typography>


                        <Box sx={{
                            width: {xs: "260px", md: "500px"},
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

                        {/*<Divider sx={{marginTop:"0.5rem" , marginBottom:"0.2rem" , marginInlineStart:"-.7rem" , marginInlineEnd:"1rem"}}/>*/}

                        {searchLoading && (
                            <BorderLinearProgress sx={{marginX: "0.5rem", marginBottom: "0.5rem"}}/>
                        )}

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

                        {/*{newUserList.length == 0 && searchValue !=='' && (*/}
                        {/*    <Box sx={{*/}
                        {/*        width: "100%",*/}
                        {/*        display: "flex",*/}
                        {/*        borderRadius: "0.3rem",*/}
                        {/*        padding: "0.5rem",*/}
                        {/*        justifyContent: "center",*/}
                        {/*        alignItems: "center"*/}
                        {/*    }}>*/}
                        {/*        <SearchOffOutlinedIcon sx={{color: "grey.500", marginInlineEnd: "0.5rem"}}/>*/}
                        {/*        <Typography sx={{textAlign: "center", color: "grey.500"}}>User with this username was not found!</Typography>*/}

                        {/*    </Box>*/}
                        {/*)}*/}

                    </Box>

                </Menu>

            </div>
    );
};

export default AddProjectMemberMenu;