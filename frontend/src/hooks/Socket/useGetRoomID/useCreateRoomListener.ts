import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { CreateRoomData } from '../../../types/dto/data/CreateRoomData'
import { CREATE_ROOM } from '../../../utils/events'

export const useCreateRoomListener = (): CreateRoomData => {
    const [roomID, setRoomID] = useState<string>('')

    useEffect(() => {
        socket.once(CREATE_ROOM, ({ roomID }: CreateRoomData) => {
            setRoomID(roomID)
        })

        return () => {
            socket.off(CREATE_ROOM)
        }
    }, [])

    return { roomID }
}
