import { Button, Card, CardContent, TextField } from '@material-ui/core'
import { QuestionAnswer as ChatIcon, Send } from '@material-ui/icons'
import React, { FunctionComponent, useEffect, useRef } from 'react'
import { useChat } from '../../../hooks/Room/useChat/useChat'
import { useChatDisabled } from '../../../hooks/Room/useDisabled/useChatDisabled'
import { Message } from '../../../types/Chat/Message'
import { CardHeader } from '../../UI/CardHeader'
import styles from './Chat.module.scss'
import { MessageCard } from './MessageCard'
import { v4 } from 'uuid'

interface Props {}

export const Chat: FunctionComponent<Props> = props => {
    const messageRef = useRef<HTMLDivElement | null>(null)

    const { disabled } = useChatDisabled()

    const {
        state: { inputValue, messages },
        methods: { inputValueChangeHandler, submitMessageHandler }
    } = useChat()

    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <CardHeader>
                    <ChatIcon />
                    Chat
                </CardHeader>
                <Card className={styles.Chat} variant='outlined'>
                    <CardContent>
                        {messages.map((message: Message) => (
                            <MessageCard
                                message={message}
                                ref={messageRef}
                                key={v4()}
                            />
                        ))}
                    </CardContent>
                </Card>
                <TextField
                    className={styles.Input}
                    variant='outlined'
                    onChange={inputValueChangeHandler}
                    value={inputValue}
                    disabled={disabled}
                    onKeyDown={submitMessageHandler}
                    InputProps={{
                        endAdornment: (
                            <Button
                                onClick={submitMessageHandler}
                                variant='contained'
                                color='primary'>
                                <Send />
                            </Button>
                        )
                    }}
                    fullWidth
                />
            </CardContent>
        </Card>
    )
}
