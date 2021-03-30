import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { USER_LEFT } from '../../../utils/events'

export const useDisconnectOnMount = (): void => {
    useEffect(() => {
        socket.emit(USER_LEFT)
    }, [])
}
