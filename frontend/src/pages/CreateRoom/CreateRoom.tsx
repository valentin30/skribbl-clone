import { Step, StepLabel, Stepper } from '@material-ui/core'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react'
import { useHistory } from 'react-router'
import { Lobby } from '../../components/CreateRoom/Lobby'
import { RoomConfig } from '../../components/CreateRoom/RoomConfig'
import { socket } from '../../Socket/Socket'
import { CreateRoomData } from '../../types/dto/data/CreateRoomData'
import { CREATE_ROOM, START_GAME, USER_LEFT } from '../../utils/events'
import styles from './CreateRoom.module.scss'

const labels: string[] = ['Room Settings', 'Add Players']

export const CreateRoom: FunctionComponent = () => {
    const history = useHistory()

    const [activeStep, setActiveStep] = useState<number>(0)
    const [roomID, setRoomID] = useState<string>('')

    const submitHandler = useCallback((event: React.FormEvent) => {
        event.preventDefault()

        socket.emit(START_GAME)
    }, [])

    useEffect(() => {
        socket.once(CREATE_ROOM, ({ roomID }: CreateRoomData) => {
            setRoomID(roomID)
        })

        return () => {
            socket.off(CREATE_ROOM)
        }
    }, [])

    useEffect(() => {
        socket.once(START_GAME, data => {
            console.log(data)

            history.push(`/room?id=${roomID}`)
        })

        return () => {
            socket.off(START_GAME)
        }
    }, [history, roomID])

    return (
        <form className={styles.root} onSubmit={submitHandler}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {labels.map((label: string) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {!activeStep && <RoomConfig onStepChange={setActiveStep} />}
            {activeStep === 1 && roomID && <Lobby roomID={roomID} />}
        </form>
    )
}
