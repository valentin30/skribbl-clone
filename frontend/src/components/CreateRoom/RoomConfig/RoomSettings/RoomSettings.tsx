import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { FunctionComponent, useCallback } from 'react'
import styles from './RoomSettings.module.scss'

interface Props {
    state: [SelectState, React.Dispatch<React.SetStateAction<SelectState>>]
}

export interface SelectState {
    rounds: number | string
    secondsPerRound: number | string
}

export const defaultSelectState = {
    rounds: '',
    secondsPerRound: ''
}

export const RoomSettings: FunctionComponent<Props> = props => {
    const {
        state: [selectState, setSelectState]
    } = props

    const changeHandler = useCallback(
        (
            event: React.ChangeEvent<{
                name?: string | undefined
                value: unknown
            }>,
            _: React.ReactNode
        ) => {
            if (!event.target.name) {
                return
            }

            setSelectState((values: SelectState) => ({
                ...values,
                [event.target.name as string]: event.target.value as number
            }))
        },
        [setSelectState]
    )

    return (
        <>
            <FormControl variant='outlined' fullWidth>
                <InputLabel id='rounds'>Rounds</InputLabel>
                <Select
                    value={selectState.rounds}
                    onChange={changeHandler}
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
                    value={selectState.secondsPerRound}
                    onChange={changeHandler}
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
