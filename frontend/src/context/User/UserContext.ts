import React from 'react'
import { IUserContext } from './UserContextInterface'

export const UserContext = React.createContext<IUserContext>({
    color: '',
    name: '',
    setName: (name: string) => {}
})
