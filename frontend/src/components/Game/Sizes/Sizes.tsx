import {
    Button,
    Card,
    CardContent,
    ClickAwayListener,
    Tooltip
} from '@material-ui/core'
import { Adjust, ExpandMore, FiberManualRecord } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useState } from 'react'
import styles from './Sizes.module.scss'

interface Props {
    size: number
    onSizeChange: (size: number) => void
}

const sizes: number[] = [2, 4, 8, 16, 32]

export const Sizes: FunctionComponent<Props> = props => {
    const { onSizeChange, size } = props

    const [open, setOpen] = useState<boolean>(false)

    const toggleColorsHandler = useCallback(() => {
        setOpen((open: boolean) => !open)
    }, [])

    return (
        <ClickAwayListener
            onClickAway={() => {
                setOpen(false)
            }}>
            <Card className={styles.root} variant='outlined'>
                <Tooltip title='Sizes'>
                    <Button onClick={toggleColorsHandler}>
                        <Adjust />
                        <ExpandMore
                            style={
                                open
                                    ? { transform: 'rotate(180deg)' }
                                    : undefined
                            }
                        />
                    </Button>
                </Tooltip>
                <CardContent className={!open ? styles.Closed : styles.Opened}>
                    {sizes.map((s: number) => (
                        <Button
                            className={s === size ? styles.Selected : undefined}
                            key={s}
                            onClick={() => {
                                onSizeChange(s)
                                setOpen(false)
                            }}>
                            <FiberManualRecord
                                style={{ width: `${s + 5}px` }}
                            />
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </ClickAwayListener>
    )
}
