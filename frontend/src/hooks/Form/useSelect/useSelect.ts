import { useCallback, useState } from 'react'

interface UseSelect<T> {
    selectState: T
    changeHandler: (
        event: React.ChangeEvent<{
            name?: string | undefined
            value: unknown
        }>
    ) => void
}

export const useSelect = <T>(initValues: T): UseSelect<T> => {
    const [selectState, setSelectState] = useState<T>(initValues)

    const changeHandler = useCallback(
        (
            event: React.ChangeEvent<{
                name?: string | undefined
                value: unknown
            }>
        ) => {
            if (!event.target.name) {
                return
            }

            setSelectState((values: T) => ({
                ...values,
                [event.target.name as string]: event.target.value
            }))
        },
        [setSelectState]
    )

    return {
        selectState,
        changeHandler
    }
}
