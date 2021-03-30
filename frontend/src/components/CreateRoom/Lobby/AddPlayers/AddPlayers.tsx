import { Button, TextField } from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import styles from './AddPlayers.module.scss'
import { useSnackbar, SnackbarKey } from 'notistack'

interface Props {
    roomID: string
}

export const AddPlayers: FunctionComponent<Props> = props => {
    const { roomID } = props

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const link = useMemo<string>(() => {
        return `${window.origin}/room?id=${roomID}`
    }, [roomID])

    const copyToClipboardHandler = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!navigator.clipboard) {
                const key: SnackbarKey = enqueueSnackbar(
                    'Clipboard not accessable',
                    {
                        variant: 'default',
                        onClick: () => {
                            closeSnackbar(key)
                        }
                    }
                )
                return
            }

            try {
                await navigator.clipboard.writeText(link)

                const key: SnackbarKey = enqueueSnackbar(
                    'Copied to clipboard',
                    {
                        variant: 'default',
                        onClick: () => {
                            closeSnackbar(key)
                        }
                    }
                )
            } catch (error) {
                const key: SnackbarKey = enqueueSnackbar(
                    'Clipboard not accessable',
                    {
                        variant: 'default',
                        onClick: () => {
                            closeSnackbar(key)
                        }
                    }
                )
            }
        },
        [link, enqueueSnackbar, closeSnackbar]
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
