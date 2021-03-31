import { io, Socket } from 'socket.io-client'

const SOCKET: string | undefined = process.env.REACT_APP_API_URL

export const socket: Socket = io(SOCKET as string)

// socket.onAny(console.log)
