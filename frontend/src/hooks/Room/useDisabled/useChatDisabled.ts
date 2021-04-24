import { useEffect, useMemo, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import { GuessedData } from '../../../types/dto/data/GuessedData'
import { GUESSED } from '../../../utils/events'
import { useUser } from '../../useUser/useUser'
import { useRoom } from '../useRoom'
import { useTimer } from '../useTimer'

interface UseChatDisabled {
    disabled: boolean
}

export const useChatDisabled = (): UseChatDisabled => {
    const {
        state: { currentPlayerID, currentRound }
    } = useRoom()
    const {
        user: { id }
    } = useUser()
    const { seconds } = useTimer()

    const [guessed, setGuessed] = useState<boolean>(false)

    const disabled = useMemo<boolean>(() => {
        if (!currentRound) {
            return true
        }

        if (guessed) {
            return true
        }

        if (id === currentPlayerID) {
            return true
        }

        if (!seconds) {
            return true
        }

        return false
    }, [currentPlayerID, currentRound, id, guessed, seconds])

    useEffect(() => {
        socket.on(GUESSED, ({ user }: GuessedData) => {
            if (user.id !== id) {
                return
            }
            setGuessed(true)
        })

        return () => {
            socket.off(GUESSED)
        }
    }, [id])

    useEffect(() => {
        setGuessed(false)
    }, [currentRound])

    return { disabled }
}
