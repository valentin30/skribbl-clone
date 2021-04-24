export type ErrorStatus = 'error' | 'info' | 'warning' | 'success' | 'default'

export interface WsError {
    status: ErrorStatus
    message: string
    redirect: boolean
}

export const NOT_REGISTERED: WsError = {
    status: 'warning',
    message: 'User not registered!',
    redirect: true
}

export const NO_ROOMS: WsError = {
    status: 'error',
    message: "You don't own any rooms!",
    redirect: false
}

export const CANT_DRAW: WsError = {
    status: 'error',
    message: "You can't draw when it's not your turn!",
    redirect: false
}

export const OUT_OF_TIME: WsError = {
    status: 'error',
    message: "Time's up! Can't preform actions after the clock.",
    redirect: false
}

export const NOT_IN_ROOM: WsError = {
    status: 'error',
    message: 'You are not in a room.',
    redirect: false
}

export const CANT_MESSAGE: WsError = {
    status: 'error',
    message: "You can't use the chat while drawing",
    redirect: false
}

export const ALREADY_GUESSED: WsError = {
    status: 'error',
    message: "You can't use the chat to the end of the round",
    redirect: false
}

export const ALREADY_IN_GAME: WsError = {
    status: 'error',
    message: "You can't be in more than one room!",
    redirect: true
}

export const ROOM_FULL: WsError = {
    status: 'error',
    message: 'Sorry, room is already full!',
    redirect: true
}

export const ROOM_NOT_FOUND: WsError = {
    status: 'error',
    message: 'Room not found',
    redirect: true
}

export const BAD_INPUT_DATA: WsError = {
    status: 'info',
    message: 'Please make sure all the information is provided!',
    redirect: false
}

export const NOT_ALLOWED: WsError = {
    status: 'error',
    message: 'This action is not allowed',
    redirect: false
}
