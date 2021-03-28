import { Button, TextField } from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import styles from './AddPlayers.module.scss'

interface Props {
    roomID: string
}

export const AddPlayers: FunctionComponent<Props> = props => {
    const { roomID } = props

    const link = useMemo<string>(() => `${window.origin}/room?id=${roomID}`, [
        roomID
    ])

    const copyToClipboardHandler = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!navigator.clipboard) {
                toast.error('Clipboard not accessable')
                return
            }

            try {
                await navigator.clipboard.writeText(link)

                toast.success('Copied to clipboard', {
                    position: 'bottom-left'
                })
            } catch (error) {
                toast.error('Clipboard not accessable', {
                    position: 'bottom-left'
                })
            }
        },
        [link]
    )
    return (
        <TextField
            value={link}
            id='outlined-basic'
            label='Link'
            variant='outlined'
            InputProps={{
                endAdornment: (
                    <Button
                        className={styles.root}
                        onClick={copyToClipboardHandler}
                        variant='contained'
                        color='primary'>
                        <FileCopy />
                    </Button>
                )
            }}
            fullWidth
        />
    )
}
