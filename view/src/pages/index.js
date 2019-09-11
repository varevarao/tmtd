import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import { CREDS_TYPE } from '../components/credential-form';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import '../styles/app.scss';

const Pages = () => (
    <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} type={CREDS_TYPE.LOGIN} />} />
        <Route exact path="/register" render={(props) => <Login {...props} type={CREDS_TYPE.SIGNUP} />} />
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute path="/" component={Dashboard} />
        <AuthenticatedRoute path="" component={Dashboard} />
        {/* Default to a HTTP 404 page */}
        <Route component={NotFound} />
    </Switch>
)

export default Pages;