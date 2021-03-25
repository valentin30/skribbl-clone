import { Button, TextField } from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'
import React, { FunctionComponent, useCallback } from 'react'
import { toast } from 'react-toastify'
import styles from './AddPlayers.module.css'

interface Props {
    link: string
}

export const AddPlayers: FunctionComponent<Props> = props => {
    const { link } = props

    const copyToClipboardHandler = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!navigator.clipboard) {
                toast.error('Clipboard not accessable')
                return
            }

            try {
                await navigator.clipboard.writeText(link)

                toast.success('Copied to clipboard')
            } catch (error) {
                toast.error('Clipboard not accessable')
            }
        },
        [link]
    )
    return (
        <TextField
            id='outlined-basic'
            label='Link'
            variant='outlined'
            value={link}
            InputProps={{
                endAdornment: (
                    <Button
                        variant='contained'
                        color='primary'
                        className={styles.Copy}
                        onClick={copyToClipboardHandler}>
                        <FileCopy />
                    </Button>
                )
            }}
            fullWidth
        />
    )
}
