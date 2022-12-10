import React from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest}){
    const { currentUser } = useAuth();

    return(
        <Routes>
            <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Navigate replace to="/LoginPage" />
        }}>

            </Route>
        </Routes>
    );
}