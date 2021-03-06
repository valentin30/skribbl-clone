import { Button, Divider, TextField, Typography } from '@material-ui/core'
import React, {
    FunctionComponent,
    useCallback,
    useContext,
    useState
} from 'react'
import { useHistory } from 'react-router'
import { Avatar } from '../../components/UI/Avatar'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'
import styles from './Home.module.css'
import { toast } from 'react-toastify'
import { getRoomId } from '../../service/GetRoomId'
import { RoomIdResponseDto } from '../../types/dto/RoomIdResponseDto'

interface Props {}

export const Home: FunctionComponent<Props> = props => {
    const history = useHistory()

    const { name, setName, color } = useContext<IUserContext>(UserContext)

    const [error, setError] = useState<string>('')

    const submitHandler = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            if (!name) {
                setError('Please enter your name.')
                return
            }

            try {
                const { id }: RoomIdResponseDto = await getRoomId()

                history.push(`/room?id=${id}`)
            } catch (error) {
                toast.error(error.message)
            }
        },
        [name, history]
    )

    const createPrivateRoomHandler = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!name) {
                setError('Please enter your name.')
                return
            }

            history.push('/create-room')
        },
        [name, history]
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

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Avatar name={name} color={color} className={styles.Avatar} />
            <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                placeholder='Enter your name'
                className={styles.Input}
                value={name}
                onChange={changeHandler}
                onFocus={focusHandler}
                style={{ marginBottom: error ? '0' : '0.75rem' }}
                error={Boolean(error)}
                helperText={error}
                fullWidth
            />
            <Button
                variant='contained'
                size='large'
                color='primary'
                type='submit'
                fullWidth>
                Join Room
            </Button>
            <Typography
                variant='button'
                color='textSecondary'
                className={styles.Divider}>
                <Divider />
                OR
                <Divider />
            </Typography>
            <Button
                onClick={createPrivateRoomHandler}
                variant='outlined'
                color='primary'
                fullWidth>
                Create private room
            </Button>
        </form>
    )
}
