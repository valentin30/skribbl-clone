import {
    Button,
    Chip,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    Switch,
    TextField
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { generateRandomColor } from '../../utils/colors'
import styles from './CreateRoom.module.css'

interface Props {}

interface SelectState {
    rounds: number | string
    drawingTime: number | string
}

interface CustomDictionary {
    active: boolean
    dictionary: Word[]
}

interface Word {
    color: string
    content: string
}

const labels: string[] = ['Room Settings', 'Add Players']

export const CreateRoom: FunctionComponent<Props> = props => {
    // Rounds and Drawing Time
    const [selectState, setSelectState] = useState<SelectState>({
        rounds: '',
        drawingTime: ''
    })

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
        []
    )

    // Stepper
    const [activeStep, setActiveStep] = useState<number>(0)

    const toggleSteps = useCallback(() => {
        setActiveStep((step: number) => {
            if (step === 1) {
                return 0
            }

            if (selectState.drawingTime === '' || selectState.rounds === '') {
                return 0
            }

            return 1
        })
    }, [selectState])

    //Custom Dictionary

    const [word, setWord] = useState<string>('')

    const [customDictionary, setCustomDictionary] = useState<CustomDictionary>({
        active: false,
        dictionary: []
    })

    const toggleCustomDictionary = useCallback(() => {
        setCustomDictionary(({ active, ...rest }: CustomDictionary) => {
            return {
                ...rest,
                active: !active
            }
        })
    }, [])

    const wordChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setWord(event.target.value)
        },
        []
    )

    const addWordHandler = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setCustomDictionary(({ dictionary, ...rest }: CustomDictionary) => {
                if (
                    dictionary.some((value: Word) =>
                        value.content.includes(word)
                    )
                ) {
                    return {
                        dictionary,
                        ...rest
                    }
                }

                if (dictionary.length === 15) {
                    return {
                        dictionary,
                        ...rest
                    }
                }
                setWord('')
                return {
                    ...rest,
                    dictionary: [
                        ...dictionary,
                        { color: generateRandomColor(), content: word }
                    ]
                }
            })
        },
        [word]
    )

    const removeWordHandler = useCallback((word: string) => {
        setCustomDictionary(({ dictionary, ...rest }: CustomDictionary) => {
            return {
                ...rest,
                dictionary: dictionary.filter(
                    (value: Word) => value.content !== word
                )
            }
        })
    }, [])

    return (
        <form
            className={styles.root}
            onSubmit={() => {
                console.log('submit')
            }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {labels.map((label: string) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
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
            <FormControlLabel
                className={styles.Switch}
                control={
                    <Switch
                        checked={customDictionary.active}
                        onChange={toggleCustomDictionary}
                        name='CustomDictionary'
                        color='primary'
                    />
                }
                label='Custom Dictionary'
            />
            {customDictionary.active && (
                <>
                    <TextField
                        id='outlined-basic'
                        label='Word'
                        variant='outlined'
                        placeholder='Enter new word'
                        value={word}
                        onChange={wordChangeHandler}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    className={styles.Add}
                                    onClick={addWordHandler}
                                    disabled={!word.trim()}>
                                    <Add />
                                </IconButton>
                            )
                        }}
                        fullWidth
                    />
                    <div className={styles.Chips}>
                        {customDictionary.dictionary.map((word: Word) => (
                            <Chip
                                className={styles.Chip}
                                style={{
                                    backgroundColor: word.color
                                }}
                                key={word.content + Date.now() * Math.random()}
                                label={word.content}
                                onDelete={() => {
                                    removeWordHandler(word.content)
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
            <Button
                onClick={toggleSteps}
                color='primary'
                variant='contained'
                size='large'
                fullWidth>
                Next
            </Button>
        </form>
    )
}
