import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TasksItem from "./TasksItem";
import {getTasks} from "../../config/fetchData";
import AddTaskModal from "../../components/modals/AddTaskModal";
import BorderLinearProgress from "../progressBar/BorderLinearProgress";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardItemMenuOptions from "../../components/menu/BoardItemMenuOptions";
import DeleteTodoModal from "../../components/modals/DeleteBoardModal";
import EditBoardModal from "../../components/modals/EditBoardModal";
import {Draggable, Droppable} from 'react-beautiful-dnd';


interface propsT {
    borderName: string
    boardId: number
    projectId: any,
    onBoardChange: () => void
}

const BoardItem = ({boardId, borderName, projectId, onBoardChange}: propsT) => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [taskList, setTaskList] = useState<any>(null)
    const [taskIsLoading, setTaskIsLoading] = useState<boolean>(false)
    const [taskError, setTaskError] = useState('')

    const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false)
    const [showTaskMenu, setShowTaskMenu] = useState<boolean>(false)


    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState<boolean>(false)
    const [showEditBoardModal, setShowEditBoardModal] = useState<boolean>(false)


    const requestGetTasks = async () => {
        setTaskError('')
        setTaskIsLoading(true)
        return await getTasks(projectId, boardId)
    }

    const handlerGetTask = () => {
        requestGetTasks().then((response) => {
            if (response.status === 200) {
                setTaskList(response.data)
                setTaskIsLoading(false)
            }
        }).catch((error) => {
            setTaskError(error)
            setTaskIsLoading(false)
        })
    }

    useEffect(() => {
        handlerGetTask()
    }, [])


    const handlerShowAddTaskModal = () => {
        setShowAddTaskModal(!showAddTaskModal)
    }

    const handlerShowTaskMenu = (event: any) => {
        setShowTaskMenu(!showTaskMenu)
        setAnchorEl(event.currentTarget)
    }

    return (
        <Box sx={{
            margin: 'auto',
            width: "100%",
            padding: "1em",
            display: "flex",
            backgroundColor: "white",
            flexDirection: "column",
            borderRadius: "0.8em"
        }}>

            <Box sx={{
                display: "flex",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "0.8rem",
                padding: "0.5rem 1rem"
            }}>
                <Typography
                    sx={{fontSize: "1.2rem", flex: 1, fontWeight: "bold", color: "grey.600"}}>{borderName}</Typography>
                <MoreHorizIcon onClick={handlerShowTaskMenu}
                               sx={{cursor: "pointer", color: "primary.main", marginInlineEnd: "0.5rem"}}/>
                <AddBoxRoundedIcon onClick={handlerShowAddTaskModal} sx={{cursor: "pointer", color: "primary.main"}}/>
            </Box>

            <Droppable droppableId={boardId.toString()}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
                        {taskList && taskList.map((item: any, index: number) => {
                            return <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className="task"
                                    >
                                        <TasksItem item={item}/>
                                    </div>
                                )}
                            </Draggable>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>


            {taskIsLoading && (
                <Box sx={{textAlign: "center", width: "100%", marginTop: "0.5rem"}}>
                    <BorderLinearProgress sx={{marginX: "1.5rem"}}/>
                </Box>
            )}

            {showAddTaskModal && (
                <AddTaskModal openModal={showAddTaskModal} closeModal={() => setShowAddTaskModal(false)}
                              onAddTask={(done) => handlerGetTask()}
                              projectId={projectId} boardId={boardId}/>
            )}

            {showTaskMenu && (
                <BoardItemMenuOptions
                    projectId={projectId}
                    boardId={boardId}
                    handlerUpdateBoard={() => {
                        setShowEditBoardModal(true)
                        setShowTaskMenu(false)
                    }}
                    handlerDeleteBoard={() => {
                        setShowDeleteBoardModal(true)
                        setShowTaskMenu(false)
                    }}
                    color={"primary.main"}
                    event={anchorEl}
                    handleCloseMenu={() => {
                        setAnchorEl(null)
                        setShowTaskMenu(!showTaskMenu)
                    }}
                    showOption={showTaskMenu}/>
            )}


            {showDeleteBoardModal && (
                <DeleteTodoModal openModal={showDeleteBoardModal} closeModal={() => {
                    setShowDeleteBoardModal(false)
                }} didUpdate={() => onBoardChange()} boardId={boardId} projectId={projectId}/>
            )}

            {showEditBoardModal && (
                <EditBoardModal openModal={showEditBoardModal} closeModal={() => setShowEditBoardModal(false)}
                                onUpdateBoard={() => onBoardChange()} projectId={projectId} boardName={borderName}
                                boardId={boardId}/>
            )}

        </Box>
    );
};

export default BoardItem;