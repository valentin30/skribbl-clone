import { Button, ButtonProps } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

export const SecondaryButton: FunctionComponent<ButtonProps> = ({
    children,
    ...props
}) => {
    return (
        <Button variant='outlined' color='primary' fullWidth {...props}>
            {children}
        </Button>
    )
}
