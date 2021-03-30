import { useContext } from 'react'
import { RoomContext } from '../../../context/Room/RoomContext'
import { IRoomContext } from '../../../context/Room/RoomContextInterface'

export const useRoom = (): IRoomContext => {
    return useContext<IRoomContext>(RoomContext)
}
