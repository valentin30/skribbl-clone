import { User } from '../../types/User/User'

export interface IUserContext {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}
