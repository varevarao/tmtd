import { Button } from "@material-ui/core"
import React, { useState } from 'react'
import Draggable from "react-draggable"

const DragButton = ({ onClick, className, children, ...rest }) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <Draggable
            onDrag={() => setDisabled(true)}
            onStop={() => setDisabled(false)}
            {...rest}
        >
            <Button
                disabled={disabled}
                className={className}
                onClick={onClick}
            >
                {children}
            </Button>
        </Draggable>
    )
}

export default DragButton;