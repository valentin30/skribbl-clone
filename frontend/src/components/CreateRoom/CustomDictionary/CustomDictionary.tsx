import {
    Chip,
    FormControlLabel,
    IconButton,
    Switch,
    TextField
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { generateRandomColor } from '../../../utils/colors'
import styles from './CustomDictionary.module.css'

interface Props {
    dictionary: Word[]
    setDictionary: React.Dispatch<React.SetStateAction<Word[]>>
    active: boolean
    toggleDictionary: () => void
}

export interface Word {
    color: string
    content: string
}

export const CustomDictionary: FunctionComponent<Props> = props => {
    const { dictionary, setDictionary, active, toggleDictionary } = props

    const [word, setWord] = useState<string>('')

    const wordChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setWord(event.target.value)
        },
        []
    )

    const addWordHandler = useCallback(
        (event: any) => {
            if (event.key && event.key !== 'Enter') {
                return
            }

            setDictionary((dictionary: Word[]) => {
                if (dictionary.some((value: Word) => value.content === word)) {
                    return dictionary
                }

                if (dictionary.length === 15) {
                    return dictionary
                }
                setWord('')
                return [
                    ...dictionary,
                    { color: generateRandomColor(), content: word }
                ]
            })
        },
        [word, setDictionary]
    )

    const removeWordHandler = useCallback(
        (word: string) => {
            setDictionary((dictionary: Word[]) =>
                dictionary.filter((value: Word) => value.content !== word)
            )
        },
        [setDictionary]
    )

    return (
        <>
            <FormControlLabel
                className={styles.Switch}
                control={
                    <Switch
                        checked={active}
                        onChange={toggleDictionary}
                        name='CustomDictionary'
                        color='primary'
                    />
                }
                label='Custom Dictionary'
            />
            {active && (
                <>
                    <TextField
                        id='outlined-basic'
                        label='Word'
                        variant='outlined'
                        placeholder='Enter new word'
                        value={word}
                        onKeyDown={addWordHandler}
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
                        {dictionary.map((word: Word) => (
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
        </>
    )
}
