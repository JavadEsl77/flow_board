import React from 'react';
import {Box, Typography} from "@mui/material";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useNavigate} from "react-router-dom";

interface projectItemType {
    id:string
    title: string
    description: string
    status: string
}

interface propsT {
    itemValue: projectItemType
}

const ProjectsItem = ({itemValue}: propsT) => {
    const getRandomBrightColor = () => {
        // Generate random RGB values between 150 and 255
        const randomR = Math.floor(Math.random() * 100) + 150;
        const randomG = Math.floor(Math.random() * 100) + 150;
        const randomB = Math.floor(Math.random() * 100) + 150;

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
        }} onClick={()=>{navigate(`/dashboard/project/${itemValue.id}`)}}>

            <Box sx={{
                width: '100%',
                height: '100px',
                borderRadius: "0.5em",
                marginBottom: "0.5em",
                background: `linear-gradient(45deg, ${getRandomBrightColor()} 30%, ${getRandomBrightColor()} 90%)`
            }}></Box>

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
                }}><p> {itemValue.title.charAt(0)}</p></Box>

                <Box sx={{display: "flex", flexDirection: "column", marginLeft: "0.5em", flex: 1}}>
                    <Typography sx={{fontSize: "1rem", fontWeight: "bold"}}>{itemValue.title}</Typography>
                    <Typography sx={{
                        fontSize: "0.7rem",
                        color: "grey.400",
                        height: "calc(1.2 * 1 * 12px)"
                    }}>{itemValue.description}</Typography>
                </Box>

                <MoreHorizOutlinedIcon sx={{alignSelf: "start", color: "grey.600"}}/>

            </Box>

        </Box>
    );
};

export default ProjectsItem;