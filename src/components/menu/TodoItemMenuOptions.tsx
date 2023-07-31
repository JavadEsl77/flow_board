import React from 'react';
import {Box, CircularProgress, Fade, Menu, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

interface propsT {
    handlerChangeStatus: (state: string) => void;
    handlerChangeTodoInfo: () => void;
    handlerDeleteTodo: () => void;
    color: string;
    event: any,
    handleCloseMenu: () => void,
    showOption: boolean;
    status: string
    statusIsLoading?: boolean;

}

const TodoItemMenuOptions = ({
                                 handlerChangeStatus,
                                 handlerChangeTodoInfo, handlerDeleteTodo,
                                 color,
                                 event,
                                 handleCloseMenu,
                                 status,
                                 showOption,
                                 statusIsLoading = false
                             }: propsT) => {
    return (
        <div>
            <Menu
                sx={{borderRadius: "0.4em", boxShadow: "0"}}
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: "0.4em",
                        overflow: 'visible',
                        backgroundColor: color,
                        filter: `drop-shadow(0px 0px 4px rgba(0,0,0,5%))`,
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
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
                open={showOption}
                onClose={handleCloseMenu}
                TransitionComponent={Fade}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "0.4em",
                    padding: "0.5em",
                    textAlign: "left",
                    marginBottom: "-0.5em",
                    backgroundColor: "white"
                }}>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "0.5em",
                        ':hover': {backgroundColor: "#eeeeee"},
                        borderRadius: "0.4em",
                    }} onClick={handlerChangeTodoInfo}>
                        <EditIcon sx={{fontSize: "medium", color: "grey.500", marginRight: "0.5em"}}/>
                        <Typography sx={{
                            color: "grey.600",
                            fontSize: "0.8em",
                        }}>Edit</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "0.5em",
                        ':hover': {backgroundColor: "#eeeeee"},
                        borderRadius: "0.4em",
                    }} onClick={handlerDeleteTodo}>
                        <DeleteSweepIcon sx={{fontSize: "medium", color: "grey.500", marginRight: "0.5em"}}/>
                        <Typography sx={{
                            color: "grey.600",
                            fontSize: "0.8em",
                        }}>Delete</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "0.5em",
                        ':hover': {backgroundColor: "#eeeeee"},
                        borderRadius: "0.4em",
                    }} onClick={() => handlerChangeStatus(status === "active" ? "deactive" : "active")}>
                        <AssignmentTurnedInRoundedIcon
                            sx={{fontSize: "medium", color: "grey.500", marginRight: "0.5em"}}/>
                        <Typography sx={{
                            color: "grey.600",
                            fontSize: "0.8em",
                        }}>{status === "active" ? "Complete" : "Todo"}</Typography>

                        {statusIsLoading && <CircularProgress sx={{marginLeft: "0.5em"}} size={20}/>}
                    </Box>

                </Box>

            </Menu>

        </div>
    );
};

export default TodoItemMenuOptions;