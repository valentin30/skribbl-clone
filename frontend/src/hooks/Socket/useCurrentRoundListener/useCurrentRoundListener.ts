import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { useRoom } from '../../Room/useRoom'
import { CURRENT_ROUND } from '../../../utils/events'
import { CurrentRoundData } from '../../../types/dto/data/CurrentRoundData'

export const useCurrentRoundListener = () => {
    const {
        methods: { setCurrentRound }
    } = useRoom()

    useEffect(() => {
        socket.on(CURRENT_ROUND, ({ round }: CurrentRoundData) => {
            setCurrentRound(round)
        })

        return () => {
            socket.off(CURRENT_ROUND)
        }
    }, [setCurrentRound])
}
