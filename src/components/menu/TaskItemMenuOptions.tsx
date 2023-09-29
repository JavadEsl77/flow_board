import React from 'react';
import {Box, Fade, Menu, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

interface propsT {
    handlerUpdateTask: () => void;
    handlerDeleteTask: () => void;
    color: string;
    event: any,
    handleCloseMenu: () => void,
    showOption: boolean;
    projectId: any
    boardId: any

}

const TaskItemMenuOptions = ({

                                 handlerUpdateTask,
                                 handlerDeleteTask,
                                  color,
                                  event,
                                  handleCloseMenu,
                                  showOption,
                              }: propsT) => {


    return (
        <div>
            <Menu
                sx={{borderRadius: "0.8em", boxShadow: "0"}}
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
                open={showOption}
                onClose={handleCloseMenu}
                TransitionComponent={Fade}
                transitionDuration={500}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "0.7em",
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
                    }} onClick={handlerUpdateTask}>
                        <EditIcon sx={{fontSize: "medium", color: "grey.500", marginRight: "0.5em"}}/>
                        <Typography sx={{
                            color: "grey.600",
                            fontSize: "0.8em",
                        }}>Edit</Typography>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: "0.5em",
                        ':hover': {backgroundColor: "#eeeeee"},
                        borderRadius: "0.4em",
                    }} onClick={handlerDeleteTask}>
                        <Box sx={{
                            display: "flex"
                        }}>
                            <DeleteSweepIcon sx={{fontSize: "medium", color: "grey.500", marginRight: "0.5em"}}/>
                            <Typography sx={{
                                color: "grey.600",
                                fontSize: "0.8em",
                            }}>Delete</Typography>
                        </Box>

                    </Box>

                </Box>

            </Menu>

        </div>
    );
};

export default TaskItemMenuOptions;