import { User } from '../User/User'

export interface Message {
    user: User
    date: string
    content: string
    guessed: boolean
}
