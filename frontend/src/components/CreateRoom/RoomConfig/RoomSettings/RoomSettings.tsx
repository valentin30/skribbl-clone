import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './RoomSettings.module.scss'

interface Props {
    value: SelectState
    onChange: (
        event: React.ChangeEvent<{
            name?: string | undefined
            value: unknown
        }>,
        child: React.ReactNode
    ) => void
}

export interface SelectState {
    rounds: number | string
    secondsPerRound: number | string
}

export const RoomSettings: FunctionComponent<Props> = props => {
    const { onChange, value } = props

    return (
        <>
            <FormControl variant='outlined' fullWidth>
                <InputLabel id='rounds'>Rounds</InputLabel>
                <Select
                    value={value.rounds}
                    onChange={onChange}
                    id='rounds-select'
                    labelId='rounds'
                    label='Rounds'
                    name='rounds'>
                    {new Array(8).fill(0).map((_: number, index: number) => (
                        <MenuItem key={index} value={index + 2}>
                            {index + 2}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={styles.root} variant='outlined' fullWidth>
                <InputLabel id='timer'>Drawing Time</InputLabel>
                <Select
                    value={value.secondsPerRound}
                    onChange={onChange}
                    id='timer-select'
                    labelId='timer'
                    label='Drawing Time'
                    name='secondsPerRound'>
                    {new Array(8).fill(0).map((_: number, index: number) => (
                        <MenuItem key={index} value={index * 30 + 30}>
                            {index * 30 + 30}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
