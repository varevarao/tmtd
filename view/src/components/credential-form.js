import { Button, Card, CardActions, CardContent, FormGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/components/credential-form.scss';

export const CREDS_TYPE = {
    LOGIN: 'LOGIN',
    SIGNUP: 'SIGN UP'
};

class CredentialForm extends Component {
    state = {
        toggled: false
    }

    static propTypes = {
        error: PropTypes.string,
        type: PropTypes.oneOf(Object.values(CREDS_TYPE)).isRequired,
        onSubmit: PropTypes.func.isRequired,
        onRedirect: PropTypes.func,
        redirectPath: PropTypes.string
    }

    static defaultProps = {
        error: '',
        type: CREDS_TYPE.LOGIN
    }

    performRedirect(path) {
        const { history } = this.props;
        history.push(`/${path}`);
    }

    render() {
        const { children, error, type, onSubmit, redirectPath, onRedirect } = this.props;
        const { toggled } = this.state;

        return (
            <div className="creds-container">
                <div className="logo-text" />
                <Card className="creds-card">
                    <CardContent>
                        {!!error ? <div className={`creds-error ${toggled ? 'max' : ''}`} onClick={() => this.setState({ toggled: !toggled })}>{error}</div> : null}
                        <FormGroup>
                            {children}
                        </FormGroup>
                    </CardContent>
                    <CardActions className="creds-actions">
                        <Button onClick={onSubmit}>
                            {type}
                        </Button>
                        <div className="creds-switch">
                            <span>{type === CREDS_TYPE.SIGNUP ? 'Already have' : 'Do not have'} an account?</span>
                            <Button onClick={() => {
                                if (onRedirect) onRedirect();
                                if (redirectPath) this.performRedirect(redirectPath);
                            }}>{type === CREDS_TYPE.SIGNUP ? CREDS_TYPE.LOGIN : CREDS_TYPE.SIGNUP}</Button>
                            <span>instead</span>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withRouter(CredentialForm);