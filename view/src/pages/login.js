import { FormControl, Input, InputLabel } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CredentialForm, { CREDS_TYPE } from '../components/credential-form';
import { login } from '../store/actions/user';
import '../styles/pages/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            returnPath: '/dashboard'
        }

        this.performLogin = this.performLogin.bind(this);
    }

    async performLogin() {
        const { email, password, returnPath } = this.state;
        const { login } = this.props;

        try {
            await login(email, password);
            
            const { history } = this.props;
            history.push(returnPath);
        } catch (error) {
            this.setState({ error })
        };
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        const { location, history } = this.props;

        let { returnPath } = this.state;
        if (location && location.state && location.state.from) {
            returnPath = location.state.from;
        }

        if (loggedIn) {
            history.replace(returnPath);
        } else {
            this.setState({ returnPath });
        }
    }

    render() {
        const { error, email, password } = this.state;
        return (
            <CredentialForm error={error} type={CREDS_TYPE.LOGIN} onSubmit={this.performLogin} redirectPath='register'>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input type="email" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input type="password" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                </FormControl>
            </CredentialForm>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    loggedIn: !!user.profile
})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));