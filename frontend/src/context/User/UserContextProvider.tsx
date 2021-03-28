import React, { FunctionComponent, useState } from 'react'
import { ChildrenProps } from '../../types/props/ChildrenProps'
import { User } from '../../types/User/User'
import { getRandomColor } from '../../utils/colors'
import { UserContext } from './UserContext'

const color = getRandomColor()

export const UserContextProvider: FunctionComponent<ChildrenProps> = props => {
    const [user, setUser] = useState<User>({
        id: null,
        name: '',
        color
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
