import React, {useEffect, useState} from 'react';
import {Box, Fade, Typography} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TasksItem from "./TasksItem";
import {getTasks, updateOrderingTask, updateTask} from "../../config/fetchData";
import AddTaskModal from "../../components/modals/AddTaskModal";
import BorderLinearProgress from "../progressBar/BorderLinearProgress";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardItemMenuOptions from "../../components/menu/BoardItemMenuOptions";
import DeleteTodoModal from "../../components/modals/DeleteBoardModal";
import EditBoardModal from "../../components/modals/EditBoardModal";
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {NotificationToast} from "../Notification/NotificationToast";


interface propsT {
    borderName: string
    boardId: number
    projectId: any,
    onBoardChange: () => void
    onTaskInfo: (info: any | null) => void
    onChangeList: any
    taskId: string | null
}

const BoardItem = ({boardId, borderName, projectId, onBoardChange, onChangeList, taskId, onTaskInfo}: propsT) => {

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

    useEffect(() => {
        const result = taskList && taskList.find((item: any) => (item.id == taskId))
        if (result != undefined) {
            localStorage.setItem('task_info', JSON.stringify(result));
            onTaskInfo(result)
        }

    }, [taskId])


    const requestChangeTaskBoard = async (boardId: any, taskId: any) => {
        const task = localStorage.getItem('task_info')
        if (task) {
            const item = JSON.parse(task);
            return await updateTask(boardId, taskId, projectId, item.name, item.description, item.status, "")
        }
    }

    const handlerChangeTask = (boardId: any, taskId: any) => {
        requestChangeTaskBoard(boardId, taskId).then()
    }

    const requestChangeTaskOrdering = async (borderId: any, task_ids: any) => {
        return await updateOrderingTask(projectId, borderId, task_ids)
    }

    const handlerChangeOrderTask = (borderId: any, task_ids: any) => {
        requestChangeTaskOrdering(borderId, task_ids).then()
    }

    useEffect(() => {

        if (onChangeList != null) {
            if (parseInt(onChangeList.destination.droppableId) === boardId) {
                const task = localStorage.getItem('task_info')
                if (task && taskList) {
                    const newItem = JSON.parse(task);
                    newItem.board.id = onChangeList.destination.droppableId
                    const existingItemIndex = taskList.findIndex((item: { id: any; }) => item.id === newItem.id);
                    if (existingItemIndex === -1) {
                        const updatedTaskList = [...taskList];

                        updatedTaskList.splice(onChangeList.destination.index, 0, newItem);
                        setTaskList(updatedTaskList);
                        handlerChangeTask(boardId, newItem.id)
                        
                        let sortArray: any[] = []
                        updatedTaskList.forEach((item: any) => {
                            sortArray.push(item.id)
                        })

                        handlerChangeOrderTask(boardId, sortArray)

                    } else {
                        const taskIndex = onChangeList.source.index
                        const targetIndex = onChangeList.destination.index
                        const updatedTaskList = [...taskList];
                        const [movedTask] = updatedTaskList.splice(taskIndex, 1);
                        updatedTaskList.splice(targetIndex, 0, movedTask);
                        setTaskList(updatedTaskList);

                        let sortArray: any[] = []
                        updatedTaskList.forEach((item: any) => {
                            sortArray.push(item.id)
                        })

                        handlerChangeOrderTask(boardId, sortArray)
                    }
                }

            } else {
                if (parseInt(onChangeList.source.droppableId) === boardId) {
                    if (taskList) {
                        const updatedTaskList = [...taskList];
                        updatedTaskList.splice(onChangeList.source.index, 1)
                        setTaskList(updatedTaskList)
                    }
                }
            }
        }
    }, [onChangeList]);

    const handlerShowAddTaskModal = () => {
        setShowAddTaskModal(!showAddTaskModal)
    }

    const handlerShowTaskMenu = (event: any) => {
        setShowTaskMenu(!showTaskMenu)
        setAnchorEl(event.currentTarget)
    }
    return (
        <Fade in={true} timeout={700}>
            <Box sx={{
                width: "100%",
                minHeight: "66vh",
                minWidth: "350px",
                padding: "1em",
                marginInline: "0.5rem",
                marginBottom: "0.5rem",
                display: "flex",
                backgroundColor: "#f9f9f9",
                flexDirection: "column",
                borderRadius: "0.875em"
            }}>

                <Box sx={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "0.8rem",
                    padding: "0.5rem 1rem"
                }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            flex: 1,
                            fontWeight: "bold",
                            color: "grey.600"
                        }}>{borderName}</Typography>
                    <MoreHorizIcon onClick={handlerShowTaskMenu}
                                   sx={{cursor: "pointer", color: "primary.main", marginInlineEnd: "0.5rem"}}/>
                    <AddBoxRoundedIcon onClick={handlerShowAddTaskModal}
                                       sx={{cursor: "pointer", color: "primary.main"}}/>
                </Box>

                <Droppable droppableId={boardId.toString()}>
                    {(provided) => (
                        <div style={{flex: 1}} {...provided.droppableProps} ref={provided.innerRef}
                             className="task-list">
                            {taskList && taskList.map((item: any, index: number) => {
                                return <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="task"
                                        >
                                            <TasksItem boardId={boardId} projectId={projectId} item={item} updateTask={(didUpdate) => {
                                                if (didUpdate) handlerGetTask()
                                            }}/>
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
                                  onAddTask={(done) => {
                                      NotificationToast("The new Task was Added", "success")
                                      handlerGetTask()
                                  }}
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
                    }} didUpdate={() => {
                        NotificationToast("The Board was deleted", "success")
                        onBoardChange()
                    }} boardId={boardId} projectId={projectId}/>
                )}

                {showEditBoardModal && (
                    <EditBoardModal openModal={showEditBoardModal} closeModal={() => setShowEditBoardModal(false)}
                                    onUpdateBoard={() => {
                                        NotificationToast("The Board was edited", "success")
                                        onBoardChange()
                                    }} projectId={projectId} boardName={borderName}
                                    boardId={boardId}/>
                )}

            </Box></Fade>
    );
};

export default BoardItem;