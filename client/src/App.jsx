import store, { getLinks } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import LeftNavbar from "./components/LeftNavbar";
import { Container } from "@mui/system";
import MainPage from "./pages/MainPage";
import "./styles/Chirp_Bold.otf"
import "./styles/Chirp.otf"
import "./styles/index.css"
import { Grid } from "@mui/material";
import RightNavbar from "./components/RightNavbar";
import Interceptor from "./http/Interceptor";
import Messages from "./pages/Messages";

const App = () => {

    console.log(document.cookie)

    return (
        <Grid container spacing={0} sx={{ height: '100%' }}>
            <Interceptor/>
            <Grid item xs={3}>
                <LeftNavbar/>
            </Grid>
            <Grid item xs={5} sx={{ 
                    border: 1, 
                    borderColor: 'grey.200', 
                    borderBottom: 'none',
                    height: '100%' }}>
                <Routes>
                    <Route element={<MainPage/>} path="/"></Route>
                    <Route element={<Messages/>} path="/messages"></Route>
                </Routes>
            </Grid>
            <Grid item xs={4}>
                <RightNavbar />
            </Grid>
        </Grid>
    )
}

export default App;