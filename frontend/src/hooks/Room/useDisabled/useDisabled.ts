import { useMemo } from 'react'
import { useUser } from '../../useUser/useUser'
import { useRoom } from '../useRoom'

interface UseDisabled {
    disabled: boolean
}

export const useDisabled = (): UseDisabled => {
    const {
        state: { currentPlayerID, currentRound }
    } = useRoom()
    const {
        user: { id }
    } = useUser()

    const disabled = useMemo<boolean>(() => {
        if (!currentRound) {
            return true
        }

        if (id !== currentPlayerID) {
            return true
        }

        return false
    }, [currentPlayerID, currentRound, id])

    return { disabled }
}
