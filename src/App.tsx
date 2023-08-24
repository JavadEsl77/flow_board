import React from 'react';
import "./assets/css/main.css"
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import {lightTheme} from "./theme";
import Routs from "./routes/Routs";
import store from "./redux/store/store";
import {Slide, ToastContainer} from "react-toastify";

const App = () => {
    return (
        <div className={"App"}>
            <Provider store={store}>
                <ThemeProvider theme={lightTheme}>
                    <Routs/>
                    <ToastContainer autoClose={2500} transition={Slide}/>
                </ThemeProvider>
            </Provider>
        </div>
    );
};

export default App;
