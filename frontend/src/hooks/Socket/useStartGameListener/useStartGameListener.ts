import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { socket } from '../../../Socket/Socket'
import { StartGameData } from '../../../types/dto/data/StartGameData'
import { START_GAME } from '../../../utils/events'

export const useStartGameListener = (): void => {
    const history = useHistory()

    useEffect(() => {
        socket.on(START_GAME, ({ roomID }: StartGameData) => {
            history.replace(`/room?id=${roomID}`)
        })

        return () => {
            socket.off(START_GAME)
        }
    }, [history])
}
