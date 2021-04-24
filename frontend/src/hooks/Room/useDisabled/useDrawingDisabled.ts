import { useMemo } from 'react'
import { useUser } from '../../useUser/useUser'
import { useRoom } from '../useRoom'
import { useTimer } from '../useTimer'

interface UseDrawingDisabled {
    disabled: boolean
}

export const useDrawingDisabled = (): UseDrawingDisabled => {
    const {
        state: { currentPlayerID, currentRound }
    } = useRoom()
    const {
        user: { id }
    } = useUser()
    const { seconds } = useTimer()

    const disabled = useMemo<boolean>(() => {
        if (!currentRound) {
            return true
        }

        if (id !== currentPlayerID) {
            return true
        }

        if (!seconds) {
            return true
        }

        return false
    }, [currentPlayerID, currentRound, id, seconds])

    return { disabled }
}
