import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { socket } from '../../Socket/Socket'
import { WsError } from '../../types/Error/WsError'
import { EXCEPTION } from '../../utils/events'

export const useExceptionHandler = (): void => {
    useEffect(() => {
        socket.on(EXCEPTION, (error: WsError) => {
            if (error.status === 'error') {
                toast.error(error.message)
                return
            }
            if (error.status === 'success') {
                toast.success(error.message)
                return
            }
            if (error.status === 'info') {
                toast.info(error.message)
                return
            }
            if (error.status === 'warning') {
                toast.warning(error.message)
                return
            }
            toast.dark(error.message)
        })
    }, [])
}
