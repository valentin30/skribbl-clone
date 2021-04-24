import { useEffect } from 'react'
import { useHistory } from 'react-router'

export const useToHomeOnLeave = () => {
    const history = useHistory()

    useEffect(() => {
        return () => {
            history.replace('/')
        }
    }, [history])
}
