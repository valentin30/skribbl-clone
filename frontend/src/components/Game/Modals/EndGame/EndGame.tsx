import { Backdrop, Card, CardContent } from '@material-ui/core'
import { SportsEsports } from '@material-ui/icons'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react'
import { useHistory } from 'react-router'
import { socket } from '../../../../Socket/Socket'
import { GAME_END } from '../../../../utils/events'
import { PrimaryButton } from '../../../UI/Button/PrimaryButton'
import { CardHeader } from '../../../UI/CardHeader'
import styles from './EndGame.module.scss'

interface Props {}

export const EndGame: FunctionComponent<Props> = props => {
    const history = useHistory()

    const [endGame, setEndGame] = useState<boolean>(false)

    const returnToHomeHandler = useCallback(() => {
        history.replace('/')
    }, [history])

    useEffect(() => {
        socket.on(GAME_END, () => {
            setEndGame(true)
        })

        return () => {
            socket.off(GAME_END)
        }
    }, [])

    return (
        <Backdrop className={styles.Backdrop} open={endGame}>
            <Card className={styles.root} variant='outlined'>
                <CardContent>
                    <CardHeader>
                        <SportsEsports />
                        End Game
                    </CardHeader>

                    <PrimaryButton
                        className={styles.Button}
                        onClick={returnToHomeHandler}>
                        Return to home
                    </PrimaryButton>
                </CardContent>
            </Card>
        </Backdrop>
    )
}
