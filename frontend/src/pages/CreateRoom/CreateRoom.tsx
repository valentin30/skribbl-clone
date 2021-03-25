import { Button, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { Color } from '@material-ui/lab'
import React, {
    FunctionComponent,
    useCallback,
    useContext,
    useState
} from 'react'
import { AddPlayers } from '../../components/CreateRoom/AddPlayers'
import {
    CustomDictionary,
    Word
} from '../../components/CreateRoom/CustomDictionary/CustomDictionary'
import { RoomSettings } from '../../components/CreateRoom/RoomSettings'
import styles from './CreateRoom.module.css'
import { toast } from 'react-toastify'
import { Avatar } from '../../components/UI/Avatar'
import { getRandomColor } from '../../utils/colors'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'
import { useHistory } from 'react-router'

interface Props {}

interface SelectState {
    rounds: number | string
    drawingTime: number | string
}

interface User {
    name: string
    color: string
}

const labels: string[] = ['Room Settings', 'Add Players']

const players: User[] = [
    { color: getRandomColor(), name: 'Gosho' },
    { color: getRandomColor(), name: 'Pesho' },
    { color: getRandomColor(), name: 'Victor' },
    { color: getRandomColor(), name: 'Bobo' },
    { color: getRandomColor(), name: 'Gosho' },
    { color: getRandomColor(), name: 'Victor' },
    { color: getRandomColor(), name: 'Bobo' },
    { color: getRandomColor(), name: 'Gosho' }
]

export const CreateRoom: FunctionComponent<Props> = props => {
    // Rounds and Drawing Time
    const [selectState, setSelectState] = useState<SelectState>({
        rounds: '',
        drawingTime: ''
    })

    //Custom Dictionary

    const [dictionary, setDictionary] = useState<Word[]>([])

    const [active, setActive] = useState<boolean>(false)

    const toggleDictionary = useCallback(() => {
        setActive((active: boolean) => !active)
    }, [])

    // Room Link
    const link: string = 'https://skribbl.io/?UFPVYJobi5iW'

    // Players

    const { color, name } = useContext<IUserContext>(UserContext)

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

            if (active && dictionary.length < 3) {
                return 0
            }

            return 1
        })
    }, [selectState, dictionary, active])

    //Form Submit

    const history = useHistory()

    const submitHandler = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault()

            if (!players.length) {
                toast.error('Not enough players')
                return
            }

            history.push('/room')
        },
        [history]
    )

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {labels.map((label: string) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep ? (
                <>
                    <div className={styles.Avatars}>
                        <div className={styles.Avatar}>
                            <Avatar name={name} color={color} />
                            <Typography variant='body1'>{name}</Typography>
                        </div>
                        {players.map((player: User, index: number) => (
                            <div key={index} className={styles.Avatar}>
                                <Avatar
                                    name={player.name}
                                    color={player.color}
                                />
                                <Typography variant='body1'>
                                    {player.name}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <AddPlayers link={link} />
                    <div className={styles.Buttons}>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                            fullWidth>
                            Start Game
                        </Button>
                        <Button
                            onClick={toggleSteps}
                            color='primary'
                            size='large'
                            variant='outlined'
                            fullWidth>
                            Back
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <RoomSettings
                        selectState={selectState}
                        setSelectState={setSelectState}
                    />
                    <CustomDictionary
                        active={active}
                        toggleDictionary={toggleDictionary}
                        dictionary={dictionary}
                        setDictionary={setDictionary}
                    />
                    <Button
                        onClick={toggleSteps}
                        color='primary'
                        variant='contained'
                        size='large'
                        fullWidth>
                        Next
                    </Button>
                </>
            )}
        </form>
    )
}
