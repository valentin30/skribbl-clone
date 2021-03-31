import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { JoinRoomData } from '../../../types/dto/data/JoinRoomData'
import { JOIN_ROOM } from '../../../utils/events'
import { useRoom } from '../../Room/useRoom'

export const useJoinRoomListener = (): void => {
    const {
        methods: { setSecondsPerRound, setRounds, setCurrentRound, setWord }
    } = useRoom()

    useEffect(() => {
        socket.once(JOIN_ROOM, ({ secondsPerRound, rounds }: JoinRoomData) => {
            setSecondsPerRound(secondsPerRound)
            setRounds(rounds)
        })

        return () => {
            socket.off(JOIN_ROOM)
        }
    }, [setSecondsPerRound, setRounds, setCurrentRound, setWord])
}
