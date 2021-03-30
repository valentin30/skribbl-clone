import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { USER_LEFT } from '../../../utils/events'

export const useDisconnectOnLeave = (): void => {
    useEffect(() => {
        return () => {
            socket.emit(USER_LEFT)
        }
    }, [])
}
