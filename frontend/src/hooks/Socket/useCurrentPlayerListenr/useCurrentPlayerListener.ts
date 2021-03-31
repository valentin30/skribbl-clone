import { useContext, useEffect } from 'react'
import { RoomContext } from '../../../context/Room/RoomContext'
import { IRoomContext } from '../../../context/Room/RoomContextInterface'
import { socket } from '../../../Socket/Socket'
import { CurrentPlayerData } from '../../../types/dto/data/CurrentPlayerData'
import { CURRENT_PLAYER } from '../../../utils/events'

export const useCurrentPlayerListener = (): void => {
    const {
        methods: { setCurrentPlayerID }
    } = useContext<IRoomContext>(RoomContext)

    useEffect(() => {
        socket.on(CURRENT_PLAYER, ({ userID }: CurrentPlayerData) => {
            setCurrentPlayerID(userID)
        })

        return () => {
            socket.off(CURRENT_PLAYER)
        }
    }, [setCurrentPlayerID])
}
