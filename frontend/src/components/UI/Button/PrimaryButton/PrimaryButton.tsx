import { Button, ButtonProps } from '@material-ui/core'
import React, { FunctionComponent } from 'react'

export const PrimaryButton: FunctionComponent<ButtonProps> = ({
    children,
    ...props
}) => {
    return (
        <Button
            variant='contained'
            size='large'
            color='primary'
            fullWidth
            {...props}>
            {children}
        </Button>
    )
}
