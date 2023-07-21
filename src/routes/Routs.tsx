import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../components/MainPage";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Dashboard from "../components/Dashboard";
import Project from "../components/Project";

const Routs = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/dashboard"} element={<RequireAuth><Dashboard/></RequireAuth>}/>
                    <Route path={"/dashboard/project/:projectId"} element={<Project/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Routs;