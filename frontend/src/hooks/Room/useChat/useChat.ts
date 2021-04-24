import { useCallback, useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { Message } from '../../../types/Chat/Message'
import { GuessedData } from '../../../types/dto/data/GuessedData'
import { MessageData } from '../../../types/dto/data/MessageData'
import { MessagePayload } from '../../../types/dto/payload/MessagePayload'
import { GUESSED, NEW_MESSAGE } from '../../../utils/events'

interface UseChat {
    state: State
    methods: Methods
}

interface State {
    messages: Message[]
    inputValue: string
}

interface Methods {
    inputValueChangeHandler: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
    submitMessageHandler: (event: any) => void
}

export const useChat = (): UseChat => {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState<string>('')

    const inputValueChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value)
        },
        []
    )

    const submitMessageHandler = useCallback(
        (event: any) => {
            if (event.key && event.key !== 'Enter') {
                return
            }

            if (!inputValue) {
                return
            }

            socket.emit(NEW_MESSAGE, new MessagePayload(inputValue))

            setInputValue('')
        },
        [inputValue]
    )

    useEffect(() => {
        socket.on(NEW_MESSAGE, (data: MessageData) => {
            setMessages((chat: Message[]) => [
                ...chat,
                { ...data, guessed: false }
            ])
        })

        return () => {
            socket.off(NEW_MESSAGE)
        }
    }, [])

    useEffect(() => {
        socket.on(GUESSED, (data: GuessedData) => {
            setMessages((chat: Message[]) => [
                ...chat,
                { ...data, guessed: true, content: 'USER GUESSED' }
            ])
        })

        return () => {
            socket.off(GUESSED)
        }
    }, [])

    return {
        state: {
            inputValue,
            messages
        },
        methods: { inputValueChangeHandler, submitMessageHandler }
    }
}
