import {
    Button,
    Card,
    CardContent,
    ClickAwayListener,
    IconButton,
    Tooltip,
    Typography
} from '@material-ui/core'
import { ColorLensOutlined, ExpandMore } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useState } from 'react'
import styles from './Colors.module.scss'

interface Props {
    onColorChange: (color: string) => void
}

const colors = [
    '#333333',
    '#4F4F4F',
    '#828282',
    '#BDBDBD',
    '#E0E0E0',
    '#F2F2F2',
    '#EB5757',
    '#F2994A',
    '#F2C94C',
    '#219653',
    '#27AE60',
    '#6FCF97',
    '#2F80ED',
    '#2D9CDB',
    '#56CCF2',
    '#9B51E0',
    '#BB6BD9',
    '#E400FF'
]

export const Colors: FunctionComponent<Props> = props => {
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
                <CardContent>
                    <Typography variant='button' color='textSecondary'>
                        <ColorLensOutlined /> Colors
                        <Tooltip title={open ? 'Close' : 'Open'}>
                            <IconButton onClick={toggleColorsHandler}>
                                <ExpandMore
                                    style={
                                        open
                                            ? {
                                                  transform: 'rotate(180deg)'
                                              }
                                            : undefined
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <div className={!open ? styles.Closed : styles.Opened}>
                        {colors.map((color: string) => (
                            <Button
                                key={color}
                                onClick={() => {
                                    props.onColorChange(color)
                                    setOpen(false)
                                }}
                                style={{
                                    background: color
                                }}></Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ClickAwayListener>
    )
}
