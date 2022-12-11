import React from "react";
import {Navigate} from 'react-router-dom';
import { auth } from '../Firebase'

//...rest
export default function PrivateRoute({ component: Component}){
    const user = auth.currentUser;
    var loggedIn = false;
    console.log(Component)
    console.log(loggedIn)

    if (!user){
        return <Navigate to="/LoginPage" replace />;
    } else {
        return Component
    }

    // return(
    //     // <Routes>
    //     //     <Route {...rest} render={props => {
    //     //     return loggedIn ? <App {...props} /> : <Navigate replace to="/LoginPage" />
    //     // }}>

    //     //     </Route>
    //     // </Routes>
        
    // );
}