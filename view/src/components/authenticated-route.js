import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class AuthenticatedRoute extends Component {
    render() {
        const { component: Component, authed, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={(props) => authed === true
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
            />
        )
    }
}

const mapStateToProps = ({ user }) => ({
    authed: user.authenticated
})

export default connect(mapStateToProps)(AuthenticatedRoute);