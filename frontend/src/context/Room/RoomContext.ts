import React from 'react'
import { IRoomContext, RoomMethods, RoomState } from './RoomContextInterface'

export const RoomContext = React.createContext<IRoomContext>({
    state: {} as RoomState,
    methods: {} as RoomMethods
})
