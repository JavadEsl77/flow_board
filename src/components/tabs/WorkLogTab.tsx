import React, {useEffect} from 'react';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {deleteWorkLog, getWorkLogs, setWorkLog} from "../../config/fetchData";
import workLogLost from "../../assets/img/workLogLost.svg"
import BorderLinearProgress from "../../modules/progressBar/BorderLinearProgress";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

interface props {
    projectId: any;
    boarderId: any;
    taskId: any;
    didUpdate: (update: boolean) => void
}

const WorkLogTab = ({projectId, boarderId, taskId, didUpdate}: props) => {

    const [unit, setUnit] = React.useState('hour');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState('1');
    const [date, setDate] = React.useState('');
    const [workLogList, setWorkLogList] = React.useState([]);
    const [workLogListIsLoading, setWorkLogListIsLoading] = React.useState(false);
    const [workLogDeleteIsLoading, setWorkLogDeleteIsLoading] = React.useState(false);


    const [isLoading, setIsLoading] = React.useState(false);

    const handleChangeUnit = (event: SelectChangeEvent) => {
        setUnit(event.target.value as string);
    };

    const handlerChangeDuration = (event: any) => {
        const duration = event.target.value
        if (duration > 0  &&  duration <= 24){
            setDuration(duration)
        }
    }

    const handlerChangeDescription = (event: any) => {
        const description = event.target.value
        setDescription(description)
    }

    const handlerChangeDateTime = (value: any) => {
        const date = value._d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        setDate(date)
    }

    const requestSetWorkLog = async () => {
        setIsLoading(true)
        const dataValue = {
            duration: duration,
            unit: unit,
            description: description,
            date: date
        }
        return await setWorkLog(projectId, boarderId, taskId, dataValue)
    }
    const handlerSetWorkLog = () => {
        requestSetWorkLog().then(() => {
            handlerGetWorkLogs()
            setIsLoading(false)
            setDuration('')
            setDescription('')
            didUpdate(true)
        })
    }

    const requestDeleteWorkLog = async (logId: any) => {
        setWorkLogDeleteIsLoading(true)
        return await deleteWorkLog(projectId, boarderId, taskId, logId)
    }

    const handlerDeleteWorkLog = (logId:any) => {
        requestDeleteWorkLog(logId).then(()=>{
            const updatedWorkLogList = [...workLogList];
            const newWorkLogList = updatedWorkLogList.filter((item:{ id: any; }) => item.id !== logId);
            setWorkLogList(newWorkLogList)
            setWorkLogDeleteIsLoading(false)
        })
    }


    const requestGetWorkLogs = async () => {
        setWorkLogListIsLoading(true)
        return await getWorkLogs(projectId, boarderId, taskId)
    }

    const handlerGetWorkLogs = () => {
        requestGetWorkLogs().then((response) => {
            setWorkLogListIsLoading(false)
            setWorkLogList(response.data)
        })
    }

    useEffect(() => {
        handlerGetWorkLogs()
    }, [])

    return (
        <Box sx={{marginTop: "-15px", marginX: "-20px"}}>

            <Box sx={{
                display: "flex",
                width: "100%",
                padding: "0.875rem",
            }}>
                <Box sx={{flex: 0.5, display: "flex", flexDirection: "column", alignItems: "start"}}>
                    <Typography sx={{fontSize: "0.875rem", color: "grey.500", marginBottom: "1rem"}}>Work
                        Duration:</Typography>
                    <Box sx={{display: "flex", marginBottom: "1rem", alignItems: "center"}}>
                        <TextField
                            size={"small"}
                            sx={{
                                maxWidth: 85,
                                marginInlineEnd: "0.5rem",
                                textAlign: "center"
                            }}
                            placeholder={"1..24"}
                            inputProps={{maxLength: 2}}
                            type={"number"}
                            value={duration}
                            onChange={(event) => handlerChangeDuration(event)}/>
                        <Box sx={{minWidth: 120}}>
                            <Select
                                size={"small"}
                                value={unit}
                                onChange={handleChangeUnit}
                            >
                                {/*<MenuItem value={"minutes"}>Minutes</MenuItem>*/}
                                <MenuItem value={"hour"}>Hours</MenuItem>
                                {/*<MenuItem value={"day"}>Day</MenuItem>*/}
                            </Select>
                        </Box>
                    </Box>
                    <DatePicker sx={{marginBottom: "2rem"}} label="work date" onChange={handlerChangeDateTime}/>
                </Box>

                <Box sx={{display: "flex", flexDirection: "column", flex: 1}}>
                    <Typography sx={{fontSize: "0.875rem", color: "grey.500", marginBottom: "1rem"}}>
                        Work Description:</Typography>
                    <TextField sx={{
                        width: "100%",
                        fontSize: ".75rem",
                        maxLines: "4",
                        direction: "rtl",
                        textAlignLast: "end",
                    }}
                               onChange={(event) => handlerChangeDescription(event)}
                               rows={4}
                               maxRows={4}
                               value={description}
                               size="small"
                               label={" Description in three lines"}
                               multiline/>

                    <Box sx={{display: "flex", alignItems: "center", marginTop: "1em", alignSelf: "end",}}>
                        <Button sx={{
                            marginInlineEnd: "0.5rem",
                            width: "fit-content",
                            textTransform: "unset",
                            fontSize: "0.8rem",
                            backgroundColor: "secondary.main",

                            color: "white",
                            boxShadow: 0,
                            '&:hover': {
                                boxShadow: 0
                            }
                        }}
                                disabled={unit === '' || description === "" || duration === "" || date === ''}
                                variant="contained"
                                onClick={() => {
                                    handlerSetWorkLog()
                                }}>Set workLog</Button>

                        {isLoading && (<CircularProgress size={24}/>)}
                    </Box>


                </Box>
            </Box>

            {workLogList.length > 0 &&
                <Divider sx={{marginY: "1rem", fontSize: "0.75rem", color: "grey.500", fontWeight: "bold"}}>work log -
                    list</Divider>}

            {!workLogListIsLoading && workLogList.length > 0 && (
                workLogList.map((item: any) => {
                    return <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "grey.50",
                        borderRadius: "0.5rem",
                        padding: "0.5rem",
                        marginTop: "0.5rem"
                    }}>
                        <Avatar
                            sx={{
                                cursor: "auto",
                                alignSelf: "start",
                                width: 30,
                                height: 30,
                                marginInlineEnd: "0.5rem",
                                marginTop: "0.5rem",
                                backgroundColor: "secondary.light"
                            }}
                            alt="Remy Sharp" src=""
                            title={"aref"}>
                            <p style={{fontSize: ".875rem"}}> {item.user.username.charAt(0) + item.user.username.charAt(1)}</p>
                        </Avatar>

                        <Box sx={{flex: 1}}>
                            <Typography
                                sx={{fontSize: "0.75rem", color: "grey.500"}}>{item.user.username}</Typography>
                            <Box sx={{display: "flex"}}>
                                <Typography sx={{
                                    fontSize: "0.75rem",
                                    color: "grey.500",
                                }}>{item.date}</Typography>

                                <Typography sx={{
                                    fontSize: "0.75rem",
                                    color: "primary.main",
                                    marginInlineStart: "0.5rem",
                                    fontWeight: "bold"
                                }}>{item.duration + " " + item.unit}</Typography>
                            </Box>


                            <Typography sx={{
                                fontSize: "0.875rem",
                                color: "grey.500",
                                // direction: detectedLanguage === "eng" ? "ltr":"rtl",
                                display: '-webkit-box',
                                '-webkit-line-clamp': '3',
                                '-webkit-box-orient': 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>{item.description}</Typography>
                        </Box>

                        <IconButton sx={{width: "2rem", height: "2rem", alignSelf: "start"}} onClick={()=>handlerDeleteWorkLog(item.id)}
                        >
                            <DeleteOutlineRoundedIcon
                                sx={{width: "1.2rem", height: "1.2rem", color: "grey.500"}}/>
                        </IconButton>

                    </Box>
                })
            )}

            <Box>
                {!workLogListIsLoading && workLogList.length === 0 && (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        marginTop: "2rem"
                    }}>
                        <Box sx={{maxWidth: {xs: "160px", md: "160px"}}}>
                            <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={workLogLost}
                                 alt="empty Image"/>
                        </Box>
                        <Typography sx={{fontSize: "0.875rem", color: "grey.300", marginTop: "1rem"}}>Work log has
                            not been registered yet</Typography>
                    </Box>
                )}
            </Box>

            {workLogListIsLoading && (
                <BorderLinearProgress sx={{marginTop: "2rem"}}/>
            )}

            {workLogDeleteIsLoading && (
                <BorderLinearProgress sx={{marginTop: "0.5rem"}}/>
            )}


        </Box>
    );
};

export default WorkLogTab;