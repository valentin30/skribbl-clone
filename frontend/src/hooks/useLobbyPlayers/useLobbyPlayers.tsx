import { useEffect, useState } from 'react'
import { socket } from '../../Socket/Socket'
import { JoinRoomData } from '../../types/dto/data/JoinRoomData'
import { NewUserData } from '../../types/dto/data/NewUserData'
import { UserLeftData } from '../../types/dto/data/UserLeftData'
import { JoinRoomPayload } from '../../types/dto/payload/JoinRoomPayload'
import { User } from '../../types/User/User'
import { JOIN_ROOM, NEW_USER, USER_LEFT } from '../../utils/events'

interface UseLobbyPlayers {
    players: User[]
}

export const useLobbyPlayers = (roomID: string): UseLobbyPlayers => {
    const [players, setPlayers] = useState<User[]>([])

    useEffect(() => {
        socket.emit(JOIN_ROOM, new JoinRoomPayload(roomID))
    }, [roomID])

    useEffect(() => {
        socket.on(NEW_USER, ({ user }: NewUserData) => {
            setPlayers((players: User[]) => [...players, user])
        })

        return () => {
            socket.off(NEW_USER)
        }
    }, [])

    useEffect(() => {
        socket.once(JOIN_ROOM, ({ players }: JoinRoomData) => {
            setPlayers((current: User[]) => [...players, ...current])
        })

        return () => {
            socket.off(JOIN_ROOM)
        }
    }, [])

    useEffect(() => {
        socket.on(USER_LEFT, ({ userID }: UserLeftData) => {
            setPlayers((players: User[]) =>
                players.filter((player: User) => player.id !== userID)
            )
        })

        return () => {
            socket.off(USER_LEFT)
        }
    }, [])

    return { players }
}
