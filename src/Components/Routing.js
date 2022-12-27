import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from "./SignupPage";
import App from "./App";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";

export default function Routing(){
    //console.log("Routing")
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path='/*' element={<PrivateRoute component={<App/>}/>}/>
                    <Route path="/LoginPage" element={<LoginPage/>}/>
                    <Route path="/SignupPage" element={<SignupPage/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}