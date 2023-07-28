import React from 'react';
import {Box, Tooltip, Typography} from "@mui/material";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useNavigate} from "react-router-dom";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

interface userType {
    id: number
    created_at: string
    updated_at: string
    username: string
    token: string
    last_login: string
}

interface membersType {
    id: number
    name: string
}

interface projectItemType {
    id: string
    created_at: string
    updated_at: string
    name: string
    description: string
    status: string
    own: boolean
    user: userType
    member_count: number
    members: membersType[]

}

interface propsT {
    itemValue: projectItemType
}

const ProjectsItem = ({itemValue}: propsT) => {
    const getRandomBrightColor = () => {
        // Generate random RGB values between 150 and 255
        const randomR = Math.floor(Math.random() * 80) + 220;
        const randomG = Math.floor(Math.random() * 80) + 150;
        const randomB = Math.floor(Math.random() * 80) + 150;

        // Return a string with the random RGB values
        return `rgb(${randomR}, ${randomG}, ${randomB})`;
    };

    const navigate = useNavigate()

    return (
        <Box sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "0.5em",
            borderRadius: "0.5em",
            border: 2,
            borderColor: "white",
            ":hover": {border: 2, borderColor: getRandomBrightColor(), borderRadius: "0.5em"}
        }} onClick={() => {
            navigate(`/dashboard/project/${itemValue.id}`)
        }}>

            <Box sx={{
                position: "relative",
                width: '100%',
                height: '100px',
                borderRadius: "0.5em",
                marginBottom: "0.5em",
                background: `linear-gradient(45deg, ${getRandomBrightColor()} 30%, ${getRandomBrightColor()} 90%)`
            }}>
                {itemValue.own && (
                    <Tooltip placement={"top"} arrow title={"Owner"}>
                        <WorkspacePremiumIcon sx={{
                            position: "absolute",
                            bottom: 0, right: 0, marginRight: "0.5em", marginBottom: "0.5em", color: "rgba(68,68,68,0.66)"
                        }}/>
                    </Tooltip>

                )}

                <Box sx={{position:"absolute",left: 0,  bottom: 0,display:"flex"}}>

                    <Box sx={{
                        display: "flex",
                        padding: "0.2em 0.5em",
                        borderRadius: "0.5em",
                        marginLeft: "0.5em",
                        color: "grey.100",
                        alignItems: "center",
                        backgroundColor: "rgba(94,94,94,0.2)",
                        marginBottom: "0.5em"
                    }}>
                        <TroubleshootOutlinedIcon sx={{fontSize: "18px", color: "rgba(255,255,255,0.61)"}}/>
                        <Typography sx={{
                            marginLeft: "0.5em",
                            fontSize: "0.8rem"
                        }}>{"Status : " + itemValue.status}</Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        padding: "0.2em 0.5em",
                        borderRadius: "0.5em",
                        marginLeft: "0.5em",
                        color: "grey.100",
                        alignItems: "center",
                        backgroundColor: "rgba(94,94,94,0.2)",
                        marginBottom: "0.5em"
                    }}>
                        <Diversity2OutlinedIcon sx={{fontSize: "18px", color: "rgba(255,255,255,0.61)"}}/>
                        <Typography sx={{
                            marginLeft: "0.5em",
                            fontSize: "0.8rem"
                        }}>{"Members : " + itemValue.member_count}</Typography>
                    </Box>


                </Box>




            </Box>

            <Box sx={{display: "flex", alignItems: "center"}}>
                <Box sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: getRandomBrightColor(),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                }}><p> {itemValue.name.charAt(0)}</p></Box>

                <Box sx={{display: "flex", flexDirection: "column", marginLeft: "0.5em", flex: 1}}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "bold"}}>{itemValue.name}</Typography>
                    <Typography sx={{
                        fontSize: "0.7rem",
                        color: "grey.400",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        height: "calc(1.2 * 2 * 12px)"
                    }}>{itemValue.description + " ..."} </Typography>
                </Box>

                <MoreHorizOutlinedIcon sx={{alignSelf: "start", color: "grey.600"}}/>

            </Box>

        </Box>
    );
};

export default ProjectsItem;