import { useCallback, useContext } from 'react'
import { UserContext } from '../../context/User/UserContext'
import { IUserContext } from '../../context/User/UserContextInterface'
import { User } from '../../types/User/User'

interface UseUser {
    user: User
    setUserID: (id: string) => void
    setName: (name: string) => void
}

export const useUser = (): UseUser => {
    const { setUser, user } = useContext<IUserContext>(UserContext)

    const setUserID = useCallback(
        (id: string) => {
            setUser((user: User) => ({ ...user, id }))
        },
        [setUser]
    )

    const setName = useCallback(
        (name: string) => {
            setUser((user: User) => ({ ...user, name }))
        },
        [setUser]
    )

    return {
        user,
        setUserID,
        setName
    }
}
