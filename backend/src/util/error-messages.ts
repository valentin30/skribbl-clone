export type ErrorStatus = 'error' | 'info' | 'warning' | 'success' | 'default'

export interface WsError {
    status: ErrorStatus
    message: string
}
export const NOT_REGISTERED: WsError = {
    status: 'warning',
    message: 'User not registered!'
}

export const NO_ROOMS: WsError = {
    status: 'error',
    message: "You don't own any rooms!"
}

export const CANT_DRAW: WsError = {
    status: 'error',
    message: "You can't draw when it's not your turn!"
}

export const ALREADY_IN_GAME: WsError = {
    status: 'error',
    message: "You cann't be in more than one room!"
}

export const ROOM_FULL: WsError = {
    status: 'error',
    message: 'Sorry, room is already full!'
}

export const ROOM_NOT_FOUND: WsError = {
    status: 'error',
    message: "This room doesn't exists!"
}

export const BAD_INPUT_DATA: WsError = {
    status: 'info',
    message: 'Please make sure all the information is provided!'
}
