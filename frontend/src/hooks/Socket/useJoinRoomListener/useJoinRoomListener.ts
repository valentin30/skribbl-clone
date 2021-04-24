import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { JoinRoomData } from '../../../types/dto/data/JoinRoomData'
import { JOIN_ROOM } from '../../../utils/events'
import { useRoom } from '../../Room/useRoom'

interface LoadingState {
    loading: boolean
}

export const useJoinRoomListener = (): LoadingState => {
    const {
        methods: { setSecondsPerRound, setRounds }
    } = useRoom()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        socket.once(JOIN_ROOM, ({ secondsPerRound, rounds }: JoinRoomData) => {
            setSecondsPerRound(secondsPerRound)
            setRounds(rounds)
            setLoading(false)
        })

        return () => {
            socket.off(JOIN_ROOM)
        }
    }, [setSecondsPerRound, setRounds])

    return { loading }
}
