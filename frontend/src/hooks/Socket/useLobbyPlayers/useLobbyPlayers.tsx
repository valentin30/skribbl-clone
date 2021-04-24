import { useEffect, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { NewUserData } from '../../../types/dto/data/NewUserData'
import { PlayersData } from '../../../types/dto/data/PlayersData'
import { UserLeftData } from '../../../types/dto/data/UserLeftData'
import { PlayersPayload } from '../../../types/dto/payload/PlayersPayload'
import { User } from '../../../types/User/User'
import { NEW_USER, PLAYERS, USER_LEFT } from '../../../utils/events'

interface UseLobbyPlayers {
    players: User[]
}

export const useLobbyPlayers = (roomID: string): UseLobbyPlayers => {
    const [players, setPlayers] = useState<User[]>([])

    useEffect(() => {
        socket.emit(PLAYERS, new PlayersPayload(roomID))
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
        socket.once(PLAYERS, ({ players }: PlayersData) => {
            setPlayers((current: User[]) => [...players, ...current])
        })

        return () => {
            socket.off(PLAYERS)
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
