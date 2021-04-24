import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { WsError } from '../../../types/Error/WsError'
import { EXCEPTION } from '../../../utils/events'
import { useSnackbar, VariantType, SnackbarKey } from 'notistack'
import { useHistory } from 'react-router'

export const useExceptionHandler = (): void => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const history = useHistory()

    useEffect(() => {
        socket.on(EXCEPTION, (error: WsError) => {
            if (error.redirect) {
                history.replace('/')
            }

            const key: SnackbarKey = enqueueSnackbar(error.message, {
                variant: error.status as VariantType,
                onClick: () => {
                    closeSnackbar(key)
                }
            })
        })

        return () => {
            socket.off(EXCEPTION)
        }
    }, [enqueueSnackbar, closeSnackbar, history])
}
