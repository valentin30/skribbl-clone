import { Backdrop, Button, Card, CardContent } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useRoom } from '../../../../hooks/Room/useRoom'
import { socket } from '../../../../Socket/Socket'
import { PickWordData } from '../../../../types/dto/data/PickWordData'
import { SelectWordPayload } from '../../../../types/dto/payload/SelectWordPayload'
import { CURRENT_WORD, WORD_PICK, WORD_SELECT } from '../../../../utils/events'
import { CardHeader } from '../../../UI/CardHeader'
import styles from './WordPick.module.scss'

interface Props {}

export const WordPick: FunctionComponent<Props> = props => {
    const [words, setWords] = useState<string[] | null>(null)
    const {
        state: { word }
    } = useRoom()

    useEffect(() => {
        socket.on(WORD_PICK, ({ words }: PickWordData) => {
            console.log(words)
            setWords(words)
        })

        return () => {
            socket.off(WORD_PICK)
            setWords(null)
        }
    }, [])

    useEffect(() => {
        socket.on(CURRENT_WORD, () => {
            setWords(null)
        })

        return () => {
            socket.off(CURRENT_WORD)
        }
    }, [])

    return (
        <Backdrop className={styles.Backdrop} open={Boolean(words && !word)}>
            <Card className={styles.root}>
                <CardContent>
                    <CardHeader>Choose one of the three words.</CardHeader>
                    <div className={styles.Words}>
                        {words?.map((word: string) => (
                            <Button
                                size='large'
                                color='secondary'
                                onClick={() => {
                                    socket.emit(
                                        WORD_SELECT,
                                        new SelectWordPayload(word)
                                    )
                                }}>
                                {word}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Backdrop>
    )
}
