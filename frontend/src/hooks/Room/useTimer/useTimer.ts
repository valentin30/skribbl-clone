import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { TimerData } from '../../../types/dto/data/TimerData'
import { TIMER } from '../../../utils/events'
import { useRoom } from '../useRoom'

interface RoomTimer {
    seconds: number
    secondsPerRound: number
}

export const useTimer = (): RoomTimer => {
    const {
        state: { secondsPerRound }
    } = useRoom()
    const [seconds, setSeconds] = useState<number>(secondsPerRound)

    useEffect(() => {
        socket.on(TIMER, ({ seconds }: TimerData) => {
            setSeconds(seconds)
        })

        return () => {
            socket.off(TIMER)
        }
    }, [])

    return { seconds, secondsPerRound }
}
