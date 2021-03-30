import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
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
        socket.on(TIMER, setSeconds)

        return () => {
            socket.off(TIMER)
        }
    }, [])

    return { seconds, secondsPerRound }
}
