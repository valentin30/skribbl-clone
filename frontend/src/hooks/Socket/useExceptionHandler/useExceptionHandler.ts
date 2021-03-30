import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { WsError } from '../../../types/Error/WsError'
import { EXCEPTION } from '../../../utils/events'
import { useSnackbar, VariantType, SnackbarKey } from 'notistack'

export const useExceptionHandler = (): void => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        socket.on(EXCEPTION, (error: WsError) => {
            const key: SnackbarKey = enqueueSnackbar(error.message, {
                variant: error.status as VariantType,
                onClick: () => {
                    closeSnackbar(key)
                }
            })
        })
    }, [enqueueSnackbar, closeSnackbar])
}
