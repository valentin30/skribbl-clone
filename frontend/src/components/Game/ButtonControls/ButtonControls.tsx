import {
    Button,
    ButtonGroup,
    IconButton,
    Popover,
    Tooltip,
    Typography
} from '@material-ui/core'
import { BorderColor, Delete, ExpandMore, Lens, Undo } from '@material-ui/icons'
import React, { FunctionComponent, useRef, useState } from 'react'
import { Colors } from '../Colors'
import styles from './ButtonControls.module.scss'

interface Props {}

export const ButtonControls: FunctionComponent<Props> = props => {
    const ref = useRef<HTMLButtonElement | null>(null)

    const [open, setOpen] = useState<boolean>(false)
    return (
        <ButtonGroup size='large' variant='outlined'>
            <Tooltip title='Brush Color'>
                <IconButton>
                    <BorderColor htmlColor='#219653' color='error' />
                </IconButton>
            </Tooltip>
            <Tooltip title='Brush Size'>
                <IconButton
                    ref={ref}
                    onClick={() => {
                        setOpen(true)
                    }}>
                    <Lens />
                    <ExpandMore />
                </IconButton>
            </Tooltip>
            <Popover
                anchorEl={ref.current}
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}>
                <div>big, small, tall</div>
            </Popover>
            <Tooltip title='Undo'>
                <IconButton>
                    <Undo />
                </IconButton>
            </Tooltip>
            <Tooltip title='Remove'>
                <IconButton>
                    <Delete />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    )
}
