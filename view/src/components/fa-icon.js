import { faWindowClose, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus, faSignInAlt, faSignOutAlt, faSpinner, faUserPlus, faSortUp, faSortDown, faFolderPlus, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

export const ICON_MAP = {
    'sign-in': faSignInAlt,
    'sign-out': faSignOutAlt,
    'sign-up': faUserPlus,
    'plus': faPlus,
    'minus': faMinus,
    'close': faWindowClose,
    'spinner': faSpinner,
    'up-solid': faSortUp,
    'down-solid': faSortDown,
    'folder-plus': faFolderPlus,
    'calendar-plus': faCalendarPlus,
    'invoice': faFileInvoiceDollar
}

const FAIcon = ({ icon, ...rest }) => (
    (icon in ICON_MAP) ? <FontAwesomeIcon icon={ICON_MAP[icon]} {...rest} /> : null
)

export default FAIcon;