import React from "react";
import {Navigate} from 'react-router-dom';
import {auth} from '../Firebase'

//...rest
export default function PrivateRoute({ component: Component}){
    const user = auth.currentUser;

    if (!user){
        return <Navigate to="/loginPage" replace/>;
    } else {
        return Component
    }
}