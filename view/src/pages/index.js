import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../components/authenticated-route';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import NotFound from '../pages/not-found';
import Register from '../pages/register';
import '../styles/app.scss';

const Pages = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute path="/" component={Dashboard} />
        <AuthenticatedRoute path="" component={Dashboard} />
        {/* Default to a HTTP 404 page */}
        <Route component={NotFound} />
    </Switch>
)

export default Pages;