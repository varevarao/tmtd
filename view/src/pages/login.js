import { FormControl, Input, InputLabel } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CredentialForm, { CREDS_TYPE } from '../components/credential-form';
import { hideHeader } from '../store/actions/ui';
import { login, register } from '../store/actions/user';
import '../styles/pages/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: '',
            lName: '',
            email: '',
            password: '',

            error: '',
            loading: false,
            returnPath: '/dashboard'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    async handleSubmit() {
        const { fName, lName, email, password, returnPath } = this.state;
        const { type, doLogin, doRegister } = this.props;

        let error = null;
        // Reset the error field, and set loading
        this.setState({ error, loading: true });

        try {
            await ((type === CREDS_TYPE.LOGIN) ? doLogin({ email, password }) : doRegister({ fName, lName, email, password }));
        } catch (err) {
            error = err;
        } finally {
            if (!error) {
                const { history } = this.props;
                history.push(returnPath);
            } else {
                this.setState({ error, loading: false })
            }
        }
    }

    handleRedirect() {
        const { type, history } = this.props;
        
        this.setState({ error: '' });
        history.push(`/${type === CREDS_TYPE.LOGIN ? 'register' : 'login'}`);
    }

    componentDidMount() {
        const { toggleHeader } = this.props;
        toggleHeader();
    }

    componentWillReceiveProps(props) {
        const { loggedIn, location, history } = props;

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
        const { type, loggedIn } = this.props;
        const { error, loading, fName, lName, email, password } = this.state;

        return loggedIn ? null : (
            <CredentialForm error={error} loading={loading} type={type} onSubmit={this.handleSubmit} onRedirect={this.handleRedirect}>
                {type === CREDS_TYPE.SIGNUP &&
                    < FormControl >
                        <InputLabel>First Name</InputLabel>
                        <Input type="email" className="login-field" value={fName} onChange={evt => this.setState({ fName: evt.target.value })} />
                    </FormControl>
                }
                {type === CREDS_TYPE.SIGNUP &&
                    <FormControl>
                        <InputLabel>Last Name</InputLabel>
                        <Input type="email" className="login-field" value={lName} onChange={evt => this.setState({ lName: evt.target.value })} />
                    </FormControl>
                }
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input type="email" value={email} onChange={evt => this.setState({ email: evt.target.value })} />
                </FormControl>
                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input type="password" value={password} onChange={evt => this.setState({ password: evt.target.value })} />
                </FormControl>
            </CredentialForm >
        )
    }
}

const mapStateToProps = ({ user }) => ({
    loggedIn: user.authenticated
})

const mapDispatchToProps = dispatch => ({
    doLogin: (fields) => dispatch(login(fields)),
    doRegister: (fields) => dispatch(register(fields)),
    toggleHeader: () => dispatch(hideHeader())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));