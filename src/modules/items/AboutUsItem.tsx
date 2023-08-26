import React from 'react';
import {Box, Fade, Typography} from "@mui/material";

interface aboutUsType {
    title: string
    description: string
    icon: React.ReactElement;
}

interface propsT {
    itemValue: aboutUsType
}

const AboutUsItem = ({itemValue}: propsT) => {
    return (
        <Fade in={true} timeout={700}>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "max-content",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                flexDirection: "column",
                padding: "1em",
                borderRadius: "0.8em",
                alignItems: "center",
                backgroundColor: "white"
            }}>


                {React.cloneElement(itemValue.icon, {style: {fontSize: '3em', color: 'grey'}})}

                <Typography sx={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginTop: "1em",
                    marginBottom: "1em"
                }}>{itemValue.title}</Typography>

                <Typography sx={{
                    fontSize: "0.8rem",
                    color: "grey.500",
                    textAlign: "center",
                    height: "calc(1.2 * 2.8 * 16px)"
                }}>{itemValue.description}</Typography>
            </Box>
        </Fade>
    );
};

export default AboutUsItem;