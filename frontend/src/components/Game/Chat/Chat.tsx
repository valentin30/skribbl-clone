import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@material-ui/core'
import { QuestionAnswer as ChatIcon, Send } from '@material-ui/icons'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import { useInput } from '../../../hooks/Form/useInput'
import { useUser } from '../../../hooks/useUser/useUser'
import { User } from '../../../types/User/User'
import { Avatar } from '../../UI/Avatar'
import { CardHeader } from '../../UI/CardHeader'
import styles from './Chat.module.scss'

interface Props {}

interface Message {
    user: User
    date: string
    content: string
}

export const Chat: FunctionComponent<Props> = props => {
    const [chat, setChat] = useState<Message[]>([])

    const { user } = useUser()
    const [content, setContent] = useState<string>('')

    const messageRef = useRef<HTMLDivElement | null>(null)

    const messageChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value)
        },
        []
    )

    const submitMessageHandler = useCallback(
        (event: any) => {
            if (event.key && event.key !== 'Enter') {
                return
            }

            if (!content) {
                return
            }

            const message: Message = {
                content,
                date: new Date(Date.now())
                    .toTimeString()
                    .split('')
                    .splice(0, 5)
                    .join(''),
                user
            }

            setChat((chat: Message[]) => [...chat, message])
            // window.scrollTo({})
            setContent('')
        },
        [user, content]
    )

    useEffect(() => {
        messageRef.current?.scrollIntoView()
    }, [chat])

    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <CardHeader>
                    <ChatIcon />
                    Chat
                </CardHeader>
                <Card className={styles.Chat} variant='outlined'>
                    <CardContent>
                        {chat.map(({ content, date, user }: Message) => (
                            <div ref={messageRef} className={styles.Message}>
                                <Avatar
                                    color={user.color}
                                    name={user.name}
                                    small
                                />
                                <div>
                                    <div>
                                        <Typography variant='body1'>
                                            {user.name}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            color='textSecondary'>
                                            {date}
                                        </Typography>
                                    </div>
                                    <Typography variant='body2'>
                                        {content}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <TextField
                    className={styles.Input}
                    variant='outlined'
                    onChange={messageChangeHandler}
                    value={content}
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
