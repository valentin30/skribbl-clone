import React from 'react'
import { User } from '../../types/User/User'
import { IUserContext } from './UserContextInterface'

export const UserContext = React.createContext<IUserContext>({
    user: {} as User,
    setUser: (() => {}) as React.Dispatch<React.SetStateAction<User>>
})
