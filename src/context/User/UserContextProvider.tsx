import React, { FunctionComponent, useState } from 'react'
import { getRandomColor } from '../../utils/colors'
import { UserContext } from './UserContext'

interface Props {
    children: React.ReactNode
}

const color = getRandomColor()

export const UserContextProvider: FunctionComponent<Props> = props => {
    const [name, setName] = useState<string>('')

    return (
        <UserContext.Provider value={{ name, setName, color }}>
            {props.children}
        </UserContext.Provider>
    )
}
