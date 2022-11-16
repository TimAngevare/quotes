import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignupPage from "./SignupPage";
import App from "./App";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";

function Routing(){
    return(
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={App}/>
                    <Route path="./LoginPage" component={LoginPage}/>
                    <Route path="./SignupPage" component={SignupPage}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}