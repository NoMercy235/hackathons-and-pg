import React, { Component, Fragment } from 'react';
import Header from "../components/shared/Header";
import Body from "../components/shared/Body";
import Footer from "../components/shared/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import LoginContainer from "./LoginContainer";
import HomeContainer from "./HomeContianer";

class BaseContainer extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Body>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={LoginContainer} />
                            <Route exact path="/home" component={HomeContainer} />
                        </Switch>
                    </Router>
                </Body>
                <Footer/>
            </Fragment>
        );
    }
}

export default BaseContainer;
