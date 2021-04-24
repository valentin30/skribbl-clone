import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { JoinRoomPayload } from '../../../types/dto/payload/JoinRoomPayload'
import { JOIN_ROOM } from '../../../utils/events'
import { useGetRoomIDFromURL } from '../../Room/useGetRoomID'

export const useJoinRoom = (): void => {
    const { roomID } = useGetRoomIDFromURL()

    useEffect(() => {
        socket.emit(JOIN_ROOM, new JoinRoomPayload(roomID))
    }, [roomID])
}
