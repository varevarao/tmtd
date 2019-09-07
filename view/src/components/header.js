import { faCartArrowDown, faPlus, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Hidden } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import '../styles/components/header.scss';

export const isTouchEnabled = () => {
    try {
        let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

        let mq = function (query) {
            return window.matchMedia(query).matches;
        };

        if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
            return true;
        }

        return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
    } catch (e) {
        console.error('(Touch detect failed)', e);
        return false;
    }
}

export const SWIPE_THRESHOLD = 40;
export const SWIPE_READY_THRESHOLD = 30;
export const SWIPE_DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}
export const SWIPE_INTENSITY = {
    FULL: 'FULL',
    READY: 'READY'
}
export const SWIPE_DETECTION_MAX_X = 0;

class Header extends Component {
    state = {
        visible: true,
        ready: false,
        timer: null,
        // Keyed by a unique identifier for each touch point
        touchPoints: {}
    }

    constructor(props) {
        super(props);

        this.handleSwipeStart = this.handleSwipeStart.bind(this);
        this.handleSwipeMove = this.handleSwipeMove.bind(this);
        this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
    }

    handleProfileAction(action) {
        const { history } = this.props;
        switch (action) {
            case 'register':
                history.push('/register');
                break;
            case 'login':
                history.push('/login');
                break;
            case 'logout':
                AuthenticationService.logout();
                history.replace('/');
                break;
            default:
                break;
        }
    }

    handleSwipeStart({ changedTouches }) {
        const { touchPoints: oldTouchPoints } = this.state;
        const newTouchPoints = {};

        for (let i = 0; i < changedTouches.length; i++) {
            let { pageX, pageY, identifer } = changedTouches[i];
            if (SWIPE_DETECTION_MAX_X === 0 || pageX <= SWIPE_DETECTION_MAX_X) {
                newTouchPoints[identifer] = { pageX, pageY };
            }
        }

        this.setState({ touchPoints: { ...oldTouchPoints, ...newTouchPoints } });
    }

    handleSwipeMove({ changedTouches }) {
        const { touchPoints: oldTouchPoints } = this.state;
        const newTouchPoints = {};

        for (let i = 0; i < changedTouches.length; i++) {
            let { pageX: currX, pageY: currY, identifer } = changedTouches[i];

            if (identifer in oldTouchPoints) {
                let { pageX: oldX } = oldTouchPoints[identifer];
                let diff = currX - oldX;
                let direction = diff < 0 ? SWIPE_DIRECTION.LEFT : SWIPE_DIRECTION.RIGHT;
                let diffPercent = (diff < 0 ? -1 : 1) * (diff / window.innerWidth) * 100;

                console.log(diff, `${diffPercent}%`);

                // A full swipe!
                if (diffPercent >= SWIPE_THRESHOLD) {
                    // Update the touch tracking
                    newTouchPoints[identifer] = { pageX: currX, pageY: currY };
                    // That's what I'm talking about!
                    this.handleSwiped(direction, SWIPE_INTENSITY.FULL);
                }
                // Jumped by a half since last touch track
                else if (diffPercent >= SWIPE_READY_THRESHOLD) {
                    // Update the touch tracking
                    newTouchPoints[identifer] = { pageX: currX, pageY: currY };
                    // That's what I'm talking about!
                    this.handleSwiped(direction, SWIPE_INTENSITY.READY);
                }
            }
        }

        this.setState({ touchPoints: { ...oldTouchPoints, ...newTouchPoints } });
    }

    handleSwipeEnd({ changedTouches }) {
        const { touchPoints: oldTouchPoints } = this.state;

        for (let i = 0; i < changedTouches.length; i++) {
            let { identifer } = changedTouches[i];
            if (identifer in oldTouchPoints) delete oldTouchPoints[identifer];
        }

        this.setState({ touchPoints: { ...oldTouchPoints } });
    }

    handleSwiped(direction, intensity) {
        const { visible, ready, timer } = this.state;
        switch (direction) {
            case SWIPE_DIRECTION.LEFT:
                if (visible || ready) {
                    // Cancel the timer, and set visible
                    if (timer) clearTimeout(timer);
                    this.setState({ ready: false, visible: false, timer: null });
                }
                break;
            case SWIPE_DIRECTION.RIGHT:
                if (!visible) {
                    if (ready || intensity === SWIPE_INTENSITY.FULL) {
                        // Cancel the timer, and set visible
                        if (timer) clearTimeout(timer);
                        this.setState({ ready: true, visible: true, timer: null });
                    }
                    else if (!ready) {
                        this.setState({ ready: true, timer: this.startReadyTimer() });
                    }
                }
                break;
            default:
                break;
        }
    }

    addSwipeHandlers(remove = false) {
        let method = window.addEventListener;
        if (remove) method = window.removeEventListener;

        method('touchstart', this.handleSwipeStart, true);
        method('touchmove', this.handleSwipeMove, true);
        method('touchend', this.handleSwipeEnd, true);
        method('touchcancel', this.handleSwipeEnd, true);
    }

    startReadyTimer() {
        return setTimeout(() => this.setState({ visible: false, ready: false, timer: null }), 1000);
    }

    componentDidMount() {
        if (isTouchEnabled()) {
            // Probably a touch enabled device.
            // Hide header by default,
            // enable swipe events to show header
            this.addSwipeHandlers();

            // Show the header for a second, and hide
            this.setState({ timer: this.startReadyTimer() });
        } else {
            // By default the header is visible
        }
    }

    componentWillUnmount() {
        if (isTouchEnabled) {
            this.addSwipeHandlers(true);
        }
    }

    render() {
        const { user, cart, onCreate, onCheckout } = this.props;
        const { visible, ready } = this.state;
        return (
            <div className={`header ${ready ? 'ready' : ''} ${visible ? 'active' : ''}`} position="sticky">

                <div className="logo-text" />
                <div className="header-tabs">

                </div>
                <div className="header-end">
                    {!!user && <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>}
                </div>
                <div className="user-actions">
                    {!!user && !!onCreate &&
                        <Button className="action new-product" variant="outlined" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} />
                            <Hidden smDown>
                                New Listing
                                    </Hidden>
                        </Button>
                    }
                    {!!cart && cart.length > 0 && !!onCheckout &&
                        <Button className="action user-checkout" variant="outlined" onClick={onCheckout}>
                            <FontAwesomeIcon icon={faCartArrowDown} />
                            <Hidden smDown>
                                Checkout
                                    </Hidden>
                        </Button>
                    }
                    {!!!user &&
                        <Button className={`action user-register`} variant="contained" onClick={() => this.handleProfileAction('register')}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <Hidden smDown>
                                sign up
                                    </Hidden>
                        </Button>
                    }
                    <Button className={`action user-${!!!user ? 'login' : 'logout'}`} variant="text" onClick={() => this.handleProfileAction(!!user ? 'logout' : 'login')}>
                        <FontAwesomeIcon icon={!!user ? faSignOutAlt : faSignInAlt} />
                        {!!user ? 'sign out' : 'Login'}
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);