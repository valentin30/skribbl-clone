import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { CreateRoomData } from '../../../types/dto/data/CreateRoomData'
import { JoinRoomPayload } from '../../../types/dto/payload/JoinRoomPayload'
import { CREATE_ROOM, JOIN_ROOM } from '../../../utils/events'

export const useCreateRoomListener = (): CreateRoomData => {
    const [roomID, setRoomID] = useState<string>('')

    useEffect(() => {
        socket.once(CREATE_ROOM, ({ roomID }: CreateRoomData) => {
            setRoomID(roomID)
            socket.emit(JOIN_ROOM, new JoinRoomPayload(roomID))
        })

        return () => {
            socket.off(CREATE_ROOM)
        }
    }, [])

    return { roomID }
}
