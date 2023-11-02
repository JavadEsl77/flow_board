import React, {useState} from 'react';
import {Box, Divider, IconButton, InputBase, Modal, Tab, Tooltip, Typography} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import {updateTask} from "../../config/fetchData";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseIcon from '@mui/icons-material/Close';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import WorkLogTab from "../tabs/WorkLogTab";
import AssignedUserTab from "../tabs/AssignedUserTab";
import {franc} from "franc";

interface props {
    openModal: boolean,
    closeModal: (updateStatus: boolean) => void,
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
        minHeight:"95vh",
        maxHeight:"95vh",
        borderRadius: "1em",
        width: {xs: "90%", md: 1000},
        bgcolor: 'background.paper',
        boxShadow: 10,
        p: 3,
    };

    const [didUpdate, setDidUpdate] = useState(false)

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


    const UpdateTask = async (taskId: any, name: string, description: string, status: string) => {
        return await updateTask(boarderId, taskId, projectId, name, description, status, "")
    }

    const handlerUpdateTask = () => {
        UpdateTask(taskDetail.id, title, description, taskDetail.status).then(() => {
            setDidUpdate(true)
        })
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    let detectedLanguage = franc(description);
    const descriptionParagraphs = description.split("\n").map((line: any) =>
        <Typography sx={{
            width: "100%",
            fontSize: "0.875rem",
            textAlign: "end",
            overflowWrap: "break-word",
        }}>{line}</Typography>);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => closeModal(didUpdate)}
            >
                <Box sx={style}>

                    <Box sx={{display: "flex", marginLeft: "0.5em", alignItems: "center"}}>
                        <Box sx={{flex: 1}}>
                            <Typography sx={{
                                fontSize: "0.875rem",
                                color: "grey.600",
                            }}>Title</Typography>
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
                        </Box>

                        <IconButton onClick={() => closeModal(didUpdate)}>
                            <CloseIcon/>
                        </IconButton>
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
                            color: "grey.600",
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
                                backgroundColor: "grey.50",
                                borderRadius: "0.5rem",
                                textAlign: "end",
                                overflowWrap: "break-word",
                                padding: "0.5rem"
                            }}> {descriptionParagraphs}</Typography>
                        )}


                        {editDescription && (
                            <InputBase
                                sx={{
                                    border: 1,
                                    direction: detectedLanguage === "eng" ? "ltr" : "rtl",
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


                    <Box sx={{marginX: "0.5rem", marginY: "1rem"}}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab sx={{fontSize: "small", textTransform: "unset",}} label="work log" value="1"/>
                                    <Tab sx={{fontSize: "small", textTransform: "unset",}} label="assigned member"
                                         value="2"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1"><WorkLogTab didUpdate={(update) => setDidUpdate(update)}
                                                            projectId={projectId} boarderId={boarderId}
                                                            taskId={taskDetail.id}/></TabPanel>
                            <TabPanel value="2"><AssignedUserTab didUpdate={(update) => setDidUpdate(update)}
                                                                 projectId={projectId} boarderId={boarderId}
                                                                 taskId={taskDetail.id} members={members}/></TabPanel>
                        </TabContext>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};

export default ShowTaskDetailModal;