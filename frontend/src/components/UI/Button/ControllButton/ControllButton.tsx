import { Tooltip } from '@material-ui/core'
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab'
import React, { FunctionComponent } from 'react'
import styles from './ControllButton.module.scss'

interface Props extends ToggleButtonProps {
    tooltip: string
}

export const ControllButton: FunctionComponent<Props> = ({
    tooltip,
    children,
    className,
    ...rest
}) => {
    return (
        <Tooltip title={tooltip} arrow>
            <ToggleButton
                {...rest}
                className={[styles.root, className].join(' ')}>
                {children}
            </ToggleButton>
        </Tooltip>
    )
}
