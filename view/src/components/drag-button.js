import { Button } from "@material-ui/core"
import React, { useState } from 'react'
import Draggable from "react-draggable"

const DragButton = ({ onClick, children }) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <Draggable
            bounds='body'
            onDrag={() => setDisabled(true)}
            onStop={() => setDisabled(false)}
        >
            <Button
                disabled={disabled}
                className="create-button"
                onClick={onClick}
            >
                {children}
            </Button>
        </Draggable>
    )
}

export default DragButton;