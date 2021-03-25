import {
    Avatar,
    Button,
    Divider,
    TextField,
    Typography
} from '@material-ui/core'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { getRandomColor } from '../../utils/colors'
import styles from './Home.module.css'

interface Props {}

const color: string = getRandomColor()

export const Home: FunctionComponent<Props> = props => {
    const history = useHistory()

    const [name, setName] = useState<string>('')

    const submitHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            if (!name) {
                return
            }

            //TO DO:
            //get room id from the server and add it to the url as query param

            history.push('/room')
        },
        [name, history]
    )

    const changeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
        },
        []
    )

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Avatar
                alt='avatar'
                className={styles.Avatar}
                style={{ backgroundColor: color }}>
                {name ? name.slice(0, 1).toUpperCase() : null}
            </Avatar>
            <TextField
                id='outlined-basic'
                label='Name'
                variant='outlined'
                placeholder='Enter your name'
                className={styles.Input}
                value={name}
                onChange={changeHandler}
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
                variant='outlined'
                color='primary'
                component={Link}
                to='/create-room'
                fullWidth>
                Create private room
            </Button>
        </form>
    )
}
