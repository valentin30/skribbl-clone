import { TextField } from '@material-ui/core'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react'
import { useHistory, useLocation } from 'react-router'
import { Avatar } from '../../components/UI/Avatar'
import { PrimaryButton } from '../../components/UI/Button/PrimaryButton'
import { SecondaryButton } from '../../components/UI/Button/SecondaryButton'
import { Divider } from '../../components/UI/Divider'
import { useUser } from '../../hooks/useUser/useUser'
import { socket } from '../../Socket/Socket'
import { GetRoomData } from '../../types/dto/data/GetRoomData'
import { RegisterData } from '../../types/dto/data/RegisterData'
import { GetRoomPayload } from '../../types/dto/payload/GetRoomPayload'
import { RegisterPayload } from '../../types/dto/payload/RegisterPayload'
import { GET_ROOM, REGISTER, USER_LEFT } from '../../utils/events'
import styles from './Home.module.scss'

interface Props {}

export const Home: FunctionComponent<Props> = props => {
    const history = useHistory()

    const { search } = useLocation()

    const {
        user: { name, color },
        setUserID,
        setName
    } = useUser()

    const [error, setError] = useState<string>('')

    const submitHandler = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            if (!name) {
                setError('Please enter your name.')
                return
            }

            socket.once(REGISTER, ({ userID }: RegisterData) => {
                setUserID(userID)

                if (search) {
                    history.push(`/room${search}`)
                    return
                }

                socket.once(GET_ROOM, ({ roomID }: GetRoomData) => {
                    history.push(`/room?id=${roomID}`)
                })

                socket.emit(GET_ROOM, new GetRoomPayload(userID))
            })

            socket.emit(REGISTER, new RegisterPayload({ name, color }))
        },
        [name, history, setUserID, color, search]
    )

    const createPrivateRoomHandler = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!name) {
                setError('Please enter your name.')
                return
            }

            socket.once(REGISTER, ({ userID }: RegisterData) => {
                setUserID(userID)

                history.push('/create-room')
            })

            socket.emit(REGISTER, new RegisterPayload({ name, color }))
        },
        [name, history, setUserID, color]
    )

    const changeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
        },
        [setName]
    )

    const focusHandler = useCallback(() => {
        setError('')
    }, [])

    useEffect(() => {
        socket.emit(USER_LEFT)
    }, [])

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Avatar name={name} color={color} />
            <TextField
                value={name}
                onFocus={focusHandler}
                onChange={changeHandler}
                style={{ marginBottom: error ? '0' : '0.75rem' }}
                label='Name'
                variant='outlined'
                placeholder='Enter your name'
                error={Boolean(error)}
                helperText={error}
                fullWidth
            />
            <PrimaryButton type='submit'>Join Room</PrimaryButton>
            <Divider />
            <SecondaryButton onClick={createPrivateRoomHandler}>
                Create private room
            </SecondaryButton>
        </form>
    )
}
