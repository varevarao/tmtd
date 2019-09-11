import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus, faSignInAlt, faSignOutAlt, faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

export const ICON_MAP = {
    signIn: faSignInAlt,
    signOut: faSignOutAlt,
    signUp: faUserPlus,
    plus: faPlus,
    minus: faMinus,
    close: faWindowClose,
    spinner: faSpinner
}

const FAIcon = ({ icon, ...rest }) => (
    (icon in ICON_MAP) ? <FontAwesomeIcon icon={ICON_MAP[icon]} {...rest} /> : null
)

export default FAIcon;