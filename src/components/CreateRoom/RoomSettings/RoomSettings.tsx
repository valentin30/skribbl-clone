import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useRef } from 'react'
import styles from './RoomSettings.module.css'

interface Props {
    selectState: SelectState
    setSelectState: React.Dispatch<React.SetStateAction<SelectState>>
}

interface SelectState {
    rounds: number | string
    drawingTime: number | string
}

export const RoomSettings: FunctionComponent<Props> = props => {
    const { selectState, setSelectState } = props

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
                    labelId='rounds'
                    id='rounds-select'
                    label='Rounds'
                    name='rounds'
                    value={selectState.rounds}
                    onChange={changeHandler}>
                    {new Array(8).fill(0).map((_: number, index: number) => (
                        <MenuItem key={index} value={index + 2}>
                            {index + 2}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={styles.Input} variant='outlined' fullWidth>
                <InputLabel id='timer'>Drawing Time</InputLabel>
                <Select
                    labelId='timer'
                    id='timer-select'
                    label='Drawing Time'
                    name='drawingTime'
                    value={selectState.drawingTime}
                    onChange={changeHandler}>
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
